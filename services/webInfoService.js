const WebInfo = require('../models/WebInfo');
const User = require('../models/User');
const Sort = require('../models/Sort');
const Label = require('../models/Label');
const Article = require('../models/Article');
const TreeHole = require('../models/TreeHole');
const PoetryResult = require('../utils/result');
const PoetryCache = require('../utils/cache');
const constants = require('../utils/constants');
const { Op } = require('sequelize');
const { Sequelize } = require('sequelize');

class WebInfoService {
  // 获取网站信息
  async getWebInfo() {
    try {
      let webInfo = await PoetryCache.get(constants.WEB_INFO);
      
      if (webInfo) {
        // 创建新的对象副本，避免修改缓存中的数据
        const result = JSON.parse(JSON.stringify(webInfo));
        // 按照原版逻辑，将这些字段设置为 null
        result.randomAvatar = null;
        result.randomCover = null;
        result.randomName = null;
        result.waifuJson = null;
        
        // 添加历史统计信息
        const history = await PoetryCache.get(constants.IP_HISTORY_STATISTICS) || {};
        result.historyAllCount = (history[constants.IP_HISTORY_COUNT] || 0).toString();
        
        const ipHistoryHour = history[constants.IP_HISTORY_HOUR] || [];
        result.historyDayCount = ipHistoryHour.length.toString();
        
        return PoetryResult.success(result);
      }
      
      // 如果缓存中没有，返回空结果
      return PoetryResult.success(null);
    } catch (error) {
      return PoetryResult.fail('查询失败：' + error.message);
    }
  }

  // 更新网站信息
  async updateWebInfo(webInfoVO, req) {
    try {
      const webInfo = await WebInfo.findOne({ where: { status: true } });
      
      if (!webInfo) {
        return PoetryResult.fail('网站信息不存在！');
      }

      const updateData = {};
      if (webInfoVO.webName !== undefined) updateData.webName = webInfoVO.webName;
      if (webInfoVO.webTitle !== undefined) updateData.webTitle = webInfoVO.webTitle;
      if (webInfoVO.notices !== undefined) updateData.notices = webInfoVO.notices;
      if (webInfoVO.footer !== undefined) updateData.footer = webInfoVO.footer;
      if (webInfoVO.backgroundImage !== undefined) updateData.backgroundImage = webInfoVO.backgroundImage;
      if (webInfoVO.avatar !== undefined) updateData.avatar = webInfoVO.avatar;
      if (webInfoVO.randomAvatar !== undefined) updateData.randomAvatar = webInfoVO.randomAvatar;
      if (webInfoVO.randomName !== undefined) updateData.randomName = webInfoVO.randomName;
      if (webInfoVO.randomCover !== undefined) updateData.randomCover = webInfoVO.randomCover;
      if (webInfoVO.waifuJson !== undefined) updateData.waifuJson = webInfoVO.waifuJson;

      await webInfo.update(updateData);
      PoetryCache.remove(constants.WEB_INFO);

      return PoetryResult.success(webInfo.toJSON());
    } catch (error) {
      return PoetryResult.fail('更新失败：' + error.message);
    }
  }

  // 获取分类标签信息
  async getSortInfo() {
    try {
      let sortInfo = await PoetryCache.get(constants.SORT_INFO);
      
      if (sortInfo) {
        return PoetryResult.success(sortInfo);
      }
      
      // 如果缓存中没有，从数据库查询
      const sorts = await Sort.findAll({
        order: [['priority', 'ASC'], ['id', 'ASC']]
      });
      
      if (sorts && sorts.length > 0) {
        const result = [];
        
        for (const sort of sorts) {
          const sortData = sort.toJSON();
          
          // 统计该分类下的文章数量
          const articleCount = await Article.count({
            where: {
              sortId: sort.id,
              deleted: false
            }
          });
          sortData.countOfSort = articleCount;
          
          // 查询该分类下的所有标签
          const labels = await Label.findAll({
            where: {
              sortId: sort.id
            }
          });
          
          if (labels && labels.length > 0) {
            const labelsWithCount = [];
            for (const label of labels) {
              const labelData = label.toJSON();
              
              // 统计该标签下的文章数量
              const labelArticleCount = await Article.count({
                where: {
                  labelId: label.id,
                  deleted: false
                }
              });
              labelData.countOfLabel = labelArticleCount;
              
              labelsWithCount.push(labelData);
            }
            sortData.labels = labelsWithCount;
          }
          
          result.push(sortData);
        }
        
        // 缓存结果
        PoetryCache.put(constants.SORT_INFO, result, constants.EXPIRE);
        
        return PoetryResult.success(result);
      }
      
      // 如果没有数据，返回空数组
      return PoetryResult.success([]);
    } catch (error) {
      console.error('Get sort info error:', error);
      return PoetryResult.fail('查询失败：' + error.message);
    }
  }

  // 获取赞赏用户列表
  async getAdmire() {
    try {
      let admire = await PoetryCache.get(constants.ADMIRE);
      
      if (admire) {
        return PoetryResult.success(admire);
      }
      
      // 查询所有有赞赏信息的用户
      const users = await User.findAll({
        where: {
          admire: {
            [Op.ne]: null
          },
          deleted: false
        },
        attributes: ['id', 'username', 'admire', 'avatar'],
        order: [['create_time', 'DESC']]
      });
      
      const result = users.map(user => user.toJSON());
      
      // 缓存结果
      PoetryCache.put(constants.ADMIRE, result, constants.EXPIRE);
      
      return PoetryResult.success(result);
    } catch (error) {
      return PoetryResult.fail('查询失败：' + error.message);
    }
  }

  // 保存树洞
  async saveTreeHole(treeHoleVO) {
    try {
      if (!treeHoleVO.message || !treeHoleVO.message.trim()) {
        return PoetryResult.fail('留言不能为空！');
      }

      // 如果没有头像，使用随机头像（暂时留空，需要实现 getRandomAvatar）
      if (!treeHoleVO.avatar || !treeHoleVO.avatar.trim()) {
        // const PoetryUtil = require('../utils/util');
        // treeHoleVO.avatar = PoetryUtil.getRandomAvatar(null);
        treeHoleVO.avatar = null; // 暂时设为null
      }

      const treeHole = await TreeHole.create(treeHoleVO);
      const result = treeHole.toJSON ? treeHole.toJSON() : treeHole;

      return PoetryResult.success(result);
    } catch (error) {
      console.error('Save tree hole error:', error);
      return PoetryResult.fail('保存失败：' + error.message);
    }
  }

  // 删除树洞
  async deleteTreeHole(id) {
    try {
      await TreeHole.destroy({ where: { id: id } });
      return PoetryResult.success();
    } catch (error) {
      return PoetryResult.fail('删除失败：' + error.message);
    }
  }

  // 查询树洞列表
  async listTreeHole() {
    try {
      const count = await TreeHole.count();
      
      let treeHoles;
      if (count > constants.TREE_HOLE_COUNT) {
        // 随机选择起始位置
        const offset = Math.floor(Math.random() * (count + 1 - constants.TREE_HOLE_COUNT));
        treeHoles = await TreeHole.findAll({
          limit: constants.TREE_HOLE_COUNT,
          offset: offset,
          order: [['create_time', 'ASC']]
        });
      } else {
        treeHoles = await TreeHole.findAll({
          order: [['create_time', 'ASC']]
        });
      }

      // 处理树洞数据
      const result = treeHoles.map(treeHole => {
        const data = treeHole.toJSON();
        // 如果没有头像，设置默认头像（这里简化处理，原版使用随机头像）
        if (!data.avatar) {
          data.avatar = 'https://i.ibb.co/5RDrH3S/image.png';
        }
        // 格式化日期
        if (data.createTime || data.create_time) {
          data.createTime = this.formatDateTime(data.createTime || data.create_time);
        }
        return data;
      });

      return PoetryResult.success(result);
    } catch (error) {
      return PoetryResult.fail('查询失败：' + error.message);
    }
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

  // 获取历史信息统计
  async getHistoryInfo() {
    try {
      const HistoryInfo = require('../models/HistoryInfo');
      const User = require('../models/User');
      
      const history = await PoetryCache.get(constants.IP_HISTORY_STATISTICS) || {};
      
      // 查询今天的历史记录（使用东八区时间）
      const now = new Date();
      const utcTime = now.getTime() + (now.getTimezoneOffset() * 60 * 1000);
      const beijingTime = new Date(utcTime + (8 * 60 * 60 * 1000));
      const today = new Date(beijingTime.getFullYear(), beijingTime.getMonth(), beijingTime.getDate());
      // 转换回 UTC 时间用于数据库查询（因为数据库存储的是 UTC）
      const todayUTC = new Date(today.getTime() - (8 * 60 * 60 * 1000));
      
      // 查询今天的历史记录（使用原生 SQL 查询避免字段映射问题）
      const sequelize = require('../config/database');
      
      // 格式化日期为 MySQL 格式（使用 UTC 时间）
      const todayStr = todayUTC.toISOString().slice(0, 19).replace('T', ' ');
      
      // 使用原生 SQL 查询
      const [results] = await sequelize.query(
        `SELECT id, ip, user_id as userId, nation, province, city 
         FROM history_info 
         WHERE create_time >= :todayStr`,
        {
          replacements: { todayStr: todayStr },
          type: sequelize.QueryTypes.SELECT
        }
      );
      
      const infoList = results || [];

      // 构建结果对象，使用常量作为键（原版使用常量）
      const result = {};
      
      // 设置缓存中的统计数据
      result[constants.IP_HISTORY_PROVINCE] = history[constants.IP_HISTORY_PROVINCE] || [];
      result[constants.IP_HISTORY_IP] = history[constants.IP_HISTORY_IP] || [];
      result[constants.IP_HISTORY_COUNT] = history[constants.IP_HISTORY_COUNT] || 0;

      // 昨天的IP统计（从缓存中获取）
      const ipHistoryCount = history[constants.IP_HISTORY_HOUR] || [];
      
      // 计算昨天的IP数量（去重）
      let ipCountYest = 0;
      if (Array.isArray(ipHistoryCount) && ipHistoryCount.length > 0) {
        const ipSet = new Set();
        for (const item of ipHistoryCount) {
          // 处理 snake_case 和 camelCase
          const ip = item.ip || item.IP;
          if (ip) {
            ipSet.add(ip);
          }
        }
        ipCountYest = ipSet.size;
      }
      result.ip_count_yest = ipCountYest;

      // 昨天的用户
      const usernameYest = [];
      const userMap = new Map();
      if (Array.isArray(ipHistoryCount) && ipHistoryCount.length > 0) {
        for (const item of ipHistoryCount) {
          // 处理 snake_case 和 camelCase
          const userId = item.user_id || item.userId || item.user_Id;
          if (userId && !userMap.has(userId)) {
            try {
              const user = await User.findByPk(userId);
              if (user) {
                const userData = user.toJSON ? user.toJSON() : user;
                userMap.set(userId, userData);
                usernameYest.push({
                  avatar: userData.avatar || null,
                  username: userData.username || null
                });
              }
            } catch (err) {
              console.error('Error fetching user:', err);
            }
          }
        }
      }
      result.username_yest = usernameYest;

      // 今天的IP数量
      const ipCountToday = new Set();
      if (Array.isArray(infoList)) {
        for (const item of infoList) {
          const itemData = item.toJSON ? item.toJSON() : item;
          if (itemData.ip) {
            ipCountToday.add(itemData.ip);
          }
        }
      }
      result.ip_count_today = ipCountToday.size;

      // 今天的用户
      const usernameToday = [];
      const todayUserMap = new Map();
      if (Array.isArray(infoList)) {
        for (const item of infoList) {
          const itemData = item.toJSON ? item.toJSON() : item;
          if (itemData.userId && !todayUserMap.has(itemData.userId)) {
            try {
              const user = await User.findByPk(itemData.userId);
              if (user) {
                const userData = user.toJSON ? user.toJSON() : user;
                todayUserMap.set(itemData.userId, userData);
                usernameToday.push({
                  avatar: userData.avatar || null,
                  username: userData.username || null
                });
              }
            } catch (err) {
              console.error('Error fetching user:', err);
            }
          }
        }
      }
      result.username_today = usernameToday;

      // 今天的省份统计
      const provinceMap = new Map();
      if (Array.isArray(infoList)) {
        for (const item of infoList) {
          const itemData = item.toJSON ? item.toJSON() : item;
          if (itemData.province) {
            provinceMap.set(itemData.province, (provinceMap.get(itemData.province) || 0) + 1);
          }
        }
      }

      const provinceToday = Array.from(provinceMap.entries())
        .map(([province, num]) => ({ province, num }))
        .sort((a, b) => b.num - a.num);

      result.province_today = provinceToday;

      return PoetryResult.success(result);
    } catch (error) {
      console.error('Get history info error:', error);
      console.error('Error stack:', error.stack);
      return PoetryResult.fail('查询失败：' + error.message);
    }
  }

  // 查询分类和标签列表
  async listSortAndLabel() {
    try {
      const sorts = await Sort.findAll({
        order: [['priority', 'ASC'], ['id', 'ASC']]
      });

      const labels = await Label.findAll({
        order: [['id', 'ASC']]
      });

      // 确保返回的数据结构与原版完全一致，包含 countOfSort 和 labels 字段（即使为 null）
      const result = {
        sorts: sorts.map(s => {
          const sortData = s.toJSON ? s.toJSON() : s;
          // 添加原版实体类中的字段，保持结构一致
          if (sortData.countOfSort === undefined) {
            sortData.countOfSort = null;
          }
          if (sortData.labels === undefined) {
            sortData.labels = null;
          }
          return sortData;
        }),
        labels: labels.map(l => {
          const labelData = l.toJSON ? l.toJSON() : l;
          // Label 实体类中有 countOfLabel 字段（exist = false），但在这个接口中可能不需要
          return labelData;
        })
      };

      return PoetryResult.success(result);
    } catch (error) {
      return PoetryResult.fail('查询失败：' + error.message);
    }
  }

  // 保存分类
  async saveSort(sortVO) {
    try {
      if (!sortVO.sortName || !sortVO.sortName.trim()) {
        return PoetryResult.fail('分类名称和分类描述不能为空！');
      }
      if (!sortVO.sortDescription || !sortVO.sortDescription.trim()) {
        return PoetryResult.fail('分类名称和分类描述不能为空！');
      }

      // SORT_TYPE_BAR = 0, SORT_TYPE_NORMAL = 1
      if (sortVO.sortType === 0 && (sortVO.priority === null || sortVO.priority === undefined)) {
        return PoetryResult.fail('导航栏分类必须配置优先级！');
      }

      await Sort.create(sortVO);

      // 重新获取分类信息并更新缓存
      const sortInfo = await this.getSortInfoData();
      if (sortInfo && sortInfo.length > 0) {
        PoetryCache.put(constants.SORT_INFO, sortInfo, constants.EXPIRE);
      }

      return PoetryResult.success();
    } catch (error) {
      console.error('Save sort error:', error);
      return PoetryResult.fail('保存失败：' + error.message);
    }
  }

  // 删除分类
  async deleteSort(id) {
    try {
      await Sort.destroy({ where: { id: id } });

      // 重新获取分类信息并更新缓存
      const sortInfo = await this.getSortInfoData();
      if (sortInfo && sortInfo.length > 0) {
        PoetryCache.put(constants.SORT_INFO, sortInfo, constants.EXPIRE);
      }

      return PoetryResult.success();
    } catch (error) {
      return PoetryResult.fail('删除失败：' + error.message);
    }
  }

  // 更新分类
  async updateSort(sortVO) {
    try {
      await Sort.update(sortVO, { where: { id: sortVO.id } });

      // 重新获取分类信息并更新缓存
      const sortInfo = await this.getSortInfoData();
      if (sortInfo && sortInfo.length > 0) {
        PoetryCache.put(constants.SORT_INFO, sortInfo, constants.EXPIRE);
      }

      return PoetryResult.success();
    } catch (error) {
      return PoetryResult.fail('更新失败：' + error.message);
    }
  }

  // 查询分类列表
  async listSort() {
    try {
      const sorts = await Sort.findAll({
        order: [['priority', 'ASC'], ['id', 'ASC']]
      });

      return PoetryResult.success(sorts.map(s => s.toJSON ? s.toJSON() : s));
    } catch (error) {
      return PoetryResult.fail('查询失败：' + error.message);
    }
  }

  // 保存标签
  async saveLabel(labelVO) {
    try {
      if (!labelVO.labelName || !labelVO.labelName.trim()) {
        return PoetryResult.fail('标签名称和标签描述和分类Id不能为空！');
      }
      if (!labelVO.labelDescription || !labelVO.labelDescription.trim()) {
        return PoetryResult.fail('标签名称和标签描述和分类Id不能为空！');
      }
      if (labelVO.sortId === null || labelVO.sortId === undefined) {
        return PoetryResult.fail('标签名称和标签描述和分类Id不能为空！');
      }

      await Label.create(labelVO);

      // 重新获取分类信息并更新缓存
      const sortInfo = await this.getSortInfoData();
      if (sortInfo && sortInfo.length > 0) {
        PoetryCache.put(constants.SORT_INFO, sortInfo, constants.EXPIRE);
      }

      return PoetryResult.success();
    } catch (error) {
      console.error('Save label error:', error);
      return PoetryResult.fail('保存失败：' + error.message);
    }
  }

  // 删除标签
  async deleteLabel(id) {
    try {
      await Label.destroy({ where: { id: id } });

      // 重新获取分类信息并更新缓存
      const sortInfo = await this.getSortInfoData();
      if (sortInfo && sortInfo.length > 0) {
        PoetryCache.put(constants.SORT_INFO, sortInfo, constants.EXPIRE);
      }

      return PoetryResult.success();
    } catch (error) {
      return PoetryResult.fail('删除失败：' + error.message);
    }
  }

  // 更新标签
  async updateLabel(labelVO) {
    try {
      await Label.update(labelVO, { where: { id: labelVO.id } });

      // 重新获取分类信息并更新缓存
      const sortInfo = await this.getSortInfoData();
      if (sortInfo && sortInfo.length > 0) {
        PoetryCache.put(constants.SORT_INFO, sortInfo, constants.EXPIRE);
      }

      return PoetryResult.success();
    } catch (error) {
      return PoetryResult.fail('更新失败：' + error.message);
    }
  }

  // 查询标签列表
  async listLabel() {
    try {
      const labels = await Label.findAll({
        order: [['id', 'ASC']]
      });

      return PoetryResult.success(labels.map(l => l.toJSON ? l.toJSON() : l));
    } catch (error) {
      return PoetryResult.fail('查询失败：' + error.message);
    }
  }

  // 获取分类信息数据（内部方法，用于缓存更新）
  async getSortInfoData() {
    try {
      const sorts = await Sort.findAll({
        order: [['priority', 'ASC'], ['id', 'ASC']]
      });

      if (sorts && sorts.length > 0) {
        const result = [];

        for (const sort of sorts) {
          const sortData = sort.toJSON ? sort.toJSON() : sort;

          // 统计该分类下的文章数量
          const articleCount = await Article.count({
            where: {
              sortId: sort.id,
              deleted: false
            }
          });
          sortData.countOfSort = articleCount;

          // 查询该分类下的所有标签
          const labels = await Label.findAll({
            where: {
              sortId: sort.id
            }
          });

          if (labels && labels.length > 0) {
            const labelsWithCount = [];
            for (const label of labels) {
              const labelData = label.toJSON ? label.toJSON() : label;

              // 统计该标签下的文章数量
              const labelArticleCount = await Article.count({
                where: {
                  labelId: label.id,
                  deleted: false
                }
              });
              labelData.countOfLabel = labelArticleCount;

              labelsWithCount.push(labelData);
            }
            sortData.labels = labelsWithCount;
          } else {
            sortData.labels = [];
          }

          result.push(sortData);
        }

        return result;
      }

      return [];
    } catch (error) {
      console.error('Get sort info data error:', error);
      return [];
    }
  }
}

module.exports = new WebInfoService();
