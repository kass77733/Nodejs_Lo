const Comment = require('../models/Comment');
const User = require('../models/User');
const PoetryResult = require('../utils/result');
const PoetryCache = require('../utils/cache');
const PoetryUtil = require('../utils/util');
const constants = require('../utils/constants');
const { Op } = require('sequelize');

class CommentService {
  // 保存评论
  async saveComment(commentVO, req) {
    try {
      const userId = await PoetryUtil.getUserId(req) || -1;
      
      const commentData = {
        source: commentVO.source || 0,
        type: commentVO.type || 'article',
        parentCommentId: commentVO.parentCommentId || 0,
        userId: userId,
        commentContent: commentVO.commentContent,
        likeCount: 0
      };

      if (commentVO.parentCommentId && commentVO.parentCommentId > 0) {
        const parentComment = await Comment.findByPk(commentVO.parentCommentId);
        if (parentComment) {
          commentData.parentUserId = parentComment.userId;
          commentData.floorCommentId = parentComment.floorCommentId || parentComment.id;
        }
      }

      const comment = await Comment.create(commentData);

      // 清除缓存
      PoetryCache.remove(constants.COMMENT_COUNT_CACHE + commentVO.source.toString() + '_' + commentVO.type);

      return PoetryResult.success();
    } catch (error) {
      console.error('Save comment error:', error);
      return PoetryResult.fail('保存失败：' + error.message);
    }
  }

  // 删除评论
  async deleteComment(id, req) {
    try {
      const userId = await PoetryUtil.getUserId(req);
      await Comment.destroy({
        where: {
          id: id,
          userId: userId
        }
      });

      return PoetryResult.success();
    } catch (error) {
      return PoetryResult.fail('删除失败：' + error.message);
    }
  }

  // 查询评论数量
  async getCommentCount(source, type) {
    try {
      const cacheKey = constants.COMMENT_COUNT_CACHE + source.toString() + '_' + type;
      let count = await PoetryCache.get(cacheKey);
      
      if (count !== null && count !== undefined) {
        return count;
      }
      
      count = await Comment.count({
        where: {
          source: source,
          type: type
        }
      });
      
      // 缓存结果
      PoetryCache.put(cacheKey, count, constants.EXPIRE);
      
      return count;
    } catch (error) {
      console.error('Get comment count error:', error);
      return 0;
    }
  }

  // 构建 CommentVO
  async buildCommentVO(comment) {
    // 确保 comment 是纯对象
    const commentVO = comment.toJSON ? comment.toJSON() : comment;
    
    // 获取用户信息
    const user = await User.findByPk(commentVO.userId);
    if (user) {
      commentVO.avatar = user.avatar;
      commentVO.username = user.username;
    }
    
    // 如果没有用户名，使用默认值（原版使用随机名称，这里简化）
    if (!commentVO.username) {
      commentVO.username = '匿名用户';
    }
    
    // 如果有父评论用户ID，获取父评论用户名
    if (commentVO.parentUserId) {
      const parentUser = await User.findByPk(commentVO.parentUserId);
      if (parentUser && parentUser.username) {
        commentVO.parentUsername = parentUser.username;
      } else {
        commentVO.parentUsername = '匿名用户';
      }
    }
    
    // 格式化日期
    if (commentVO.createTime || commentVO.create_time) {
      commentVO.createTime = this.formatDateTime(commentVO.createTime || commentVO.create_time);
    }
    
    return commentVO;
  }

  // 格式化日期为 yyyy-MM-dd HH:mm:ss (东八区)
  formatDateTime(date) {
    if (!date) return null;
    const d = new Date(date);
    // 转换为东八区时间（UTC+8，即加8小时）
    const utcTime = d.getTime() + (d.getTimezoneOffset() * 60 * 1000);
    const beijingTime = new Date(utcTime + (8 * 60 * 60 * 1000));
    
    const year = beijingTime.getFullYear();
    const month = String(beijingTime.getMonth() + 1).padStart(2, '0');
    const day = String(beijingTime.getDate()).padStart(2, '0');
    const hours = String(beijingTime.getHours()).padStart(2, '0');
    const minutes = String(beijingTime.getMinutes()).padStart(2, '0');
    const seconds = String(beijingTime.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }

  // 查询评论列表
  async listComment(baseRequestVO) {
    try {
      // 调试：打印参数
      console.log('listComment service - baseRequestVO:', JSON.stringify(baseRequestVO));
      
      // 检查参数，source 和 commentType 是必需的
      // source 可能为 0（树洞留言），所以不能直接用 !source 判断
      if (baseRequestVO.source === null || baseRequestVO.source === undefined) {
        console.log('参数验证失败：source 为空');
        return PoetryResult.fail('参数错误！source 不能为空');
      }
      
      // commentType 必须是非空字符串
      if (!baseRequestVO.commentType || typeof baseRequestVO.commentType !== 'string' || baseRequestVO.commentType.trim() === '') {
        console.log('参数验证失败：commentType 为空，值:', baseRequestVO.commentType);
        return PoetryResult.fail('参数错误！commentType 不能为空');
      }

      const where = {
        source: baseRequestVO.source,
        type: baseRequestVO.commentType
      };

      const page = baseRequestVO.page || 1;
      const pageSize = baseRequestVO.pageSize || 10;
      const offset = (page - 1) * pageSize;

      let comments;
      if (!baseRequestVO.floorCommentId) {
        // 查询顶层评论
        where.parentCommentId = constants.FIRST_COMMENT;
        
        const { count, rows } = await Comment.findAndCountAll({
          where,
          limit: pageSize,
          offset: offset,
          order: [['create_time', 'ASC']]
        });

        comments = rows;
        
        // 为每个顶层评论查询子评论
        const commentVOList = [];
        for (const comment of comments) {
          const commentVO = await this.buildCommentVO(comment);
          
          // 查询该评论的子评论（最多5条）
          const childComments = await Comment.findAll({
            where: {
              source: baseRequestVO.source,
              type: baseRequestVO.commentType,
              floorCommentId: comment.id
            },
            limit: 5,
            order: [['create_time', 'ASC']]
          });
          
          const childCommentVOList = [];
          for (const childComment of childComments) {
            const childVO = await this.buildCommentVO(childComment);
            childCommentVOList.push(childVO);
          }
          
          // 构建分页对象（原版使用 Page 对象）
          commentVO.childComments = {
            records: childCommentVOList,
            total: childCommentVOList.length,
            size: 5,
            current: 1,
            pages: Math.ceil(childCommentVOList.length / 5)
          };
          
          commentVOList.push(commentVO);
        }
        
        const result = {
          records: commentVOList,
          total: count,
          size: pageSize,
          current: page,
          pages: Math.ceil(count / pageSize)
        };
        
        return PoetryResult.success(result);
      } else {
        // 查询指定楼层评论的子评论
        where.floorCommentId = baseRequestVO.floorCommentId;
        
        const { count, rows } = await Comment.findAndCountAll({
          where,
          limit: pageSize,
          offset: offset,
          order: [['create_time', 'ASC']]
        });
        
        const commentVOList = [];
        for (const comment of rows) {
          const commentVO = await this.buildCommentVO(comment);
          commentVOList.push(commentVO);
        }
        
        const result = {
          records: commentVOList,
          total: count,
          size: pageSize,
          current: page,
          pages: Math.ceil(count / pageSize)
        };
        
        return PoetryResult.success(result);
      }
    } catch (error) {
      console.error('List comment error:', error);
      return PoetryResult.fail('查询失败：' + error.message);
    }
  }
  // 管理员查询评论列表
  async listAdminComment(baseRequestVO, isBoss, req = null) {
    try {
      const page = baseRequestVO.page || 1;
      const pageSize = baseRequestVO.pageSize || 10;
      const offset = (page - 1) * pageSize;

      const where = {};

      if (isBoss) {
        // Boss可以查询所有评论
        if (baseRequestVO.source !== null && baseRequestVO.source !== undefined) {
          where.source = baseRequestVO.source;
        }
        if (baseRequestVO.commentType) {
          where.type = baseRequestVO.commentType;
        }
      } else {
        // 用户只能查询自己文章的评论
        if (!req) {
          return PoetryResult.fail('需要用户信息！');
        }

        const userId = await PoetryUtil.getUserId(req);
        const Article = require('../models/Article');
        
        // 获取用户的所有文章ID
        const userArticles = await Article.findAll({
          where: { userId: userId },
          attributes: ['id']
        });

        const userArticleIds = userArticles.map(a => a.id);

        if (userArticleIds.length === 0) {
          const result = {
            records: [],
            total: 0,
            size: pageSize,
            current: page,
            pages: 0
          };
          return PoetryResult.success(result);
        }

        where.type = 'article';
        if (baseRequestVO.source !== null && baseRequestVO.source !== undefined) {
          where.source = baseRequestVO.source;
          // 验证该文章是否属于该用户
          if (!userArticleIds.includes(baseRequestVO.source)) {
            const result = {
              records: [],
              total: 0,
              size: pageSize,
              current: page,
              pages: 0
            };
            return PoetryResult.success(result);
          }
        } else {
          where.source = { [Op.in]: userArticleIds };
        }
      }

      const { count, rows } = await Comment.findAndCountAll({
        where,
        limit: pageSize,
        offset: offset,
        order: [['create_time', 'DESC']]
      });

      // 构建评论VO列表（注意：buildCommentVO 是异步方法，需要使用 Promise.all）
      const records = await Promise.all(rows.map(async (comment) => {
        return await this.buildCommentVO(comment);
      }));

      const result = {
        records: records,
        total: count,
        size: pageSize,
        current: page,
        pages: Math.ceil(count / pageSize)
      };

      return PoetryResult.success(result);
    } catch (error) {
      console.error('List admin comment error:', error);
      return PoetryResult.fail('查询失败：' + error.message);
    }
  }
}

module.exports = new CommentService();
