const adminService = require('../services/adminService');
const PoetryResult = require('../utils/result');

class AdminController {
  // 查询用户列表
  async listUser(req, res) {
    try {
      const result = await adminService.listUser(req.body);
      res.json(result);
    } catch (error) {
      res.status(500).json(PoetryResult.fail('查询失败：' + error.message));
    }
  }

  // 修改用户状态
  async changeUserStatus(req, res) {
    try {
      const { userId, flag } = req.query;
      const result = await adminService.changeUserStatus(parseInt(userId), flag === 'true', req);
      res.json(result);
    } catch (error) {
      res.status(500).json(PoetryResult.fail('操作失败：' + error.message));
    }
  }

  // 修改用户赞赏
  async changeUserAdmire(req, res) {
    try {
      const { userId, admire } = req.query;
      const result = await adminService.changeUserAdmire(parseInt(userId), admire);
      res.json(result);
    } catch (error) {
      res.status(500).json(PoetryResult.fail('操作失败：' + error.message));
    }
  }

  // 修改用户类型
  async changeUserType(req, res) {
    try {
      const { userId, userType } = req.query;
      const result = await adminService.changeUserType(parseInt(userId), parseInt(userType), req);
      res.json(result);
    } catch (error) {
      res.status(500).json(PoetryResult.fail('操作失败：' + error.message));
    }
  }

  // 获取管理员网站信息
  async getAdminWebInfo(req, res) {
    try {
      const result = await adminService.getAdminWebInfo();
      res.json(result);
    } catch (error) {
      res.status(500).json(PoetryResult.fail('查询失败：' + error.message));
    }
  }

  // 用户查询文章
  async listUserArticle(req, res) {
    try {
      // 禁用缓存
      res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, private');
      res.setHeader('Pragma', 'no-cache');
      res.setHeader('Expires', '0');
      
      const result = await adminService.listUserArticle(req.body, req);
      res.json(result);
    } catch (error) {
      res.status(500).json(PoetryResult.fail('查询失败：' + error.message));
    }
  }

  // Boss查询文章
  async listBossArticle(req, res) {
    try {
      // 禁用缓存
      res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, private');
      res.setHeader('Pragma', 'no-cache');
      res.setHeader('Expires', '0');
      
      const result = await adminService.listBossArticle(req.body);
      res.json(result);
    } catch (error) {
      res.status(500).json(PoetryResult.fail('查询失败：' + error.message));
    }
  }

  // 修改文章状态
  async changeArticleStatus(req, res) {
    try {
      const { articleId, viewStatus, commentStatus, recommendStatus } = req.query;
      const result = await adminService.changeArticleStatus(
        parseInt(articleId),
        viewStatus === 'true' ? true : viewStatus === 'false' ? false : undefined,
        commentStatus === 'true' ? true : commentStatus === 'false' ? false : undefined,
        recommendStatus === 'true' ? true : recommendStatus === 'false' ? false : undefined,
        req
      );
      res.json(result);
    } catch (error) {
      res.status(500).json(PoetryResult.fail('操作失败：' + error.message));
    }
  }

  // 查询文章
  async getArticleById(req, res) {
    try {
      const { id } = req.query;
      const result = await adminService.getArticleById(parseInt(id), req);
      res.json(result);
    } catch (error) {
      res.status(500).json(PoetryResult.fail('查询失败：' + error.message));
    }
  }

  // 用户删除评论
  async userDeleteComment(req, res) {
    try {
      const { id } = req.query;
      const result = await adminService.userDeleteComment(parseInt(id), req);
      res.json(result);
    } catch (error) {
      res.status(500).json(PoetryResult.fail('删除失败：' + error.message));
    }
  }

  // Boss删除评论
  async bossDeleteComment(req, res) {
    try {
      const { id } = req.query;
      const result = await adminService.bossDeleteComment(parseInt(id));
      res.json(result);
    } catch (error) {
      res.status(500).json(PoetryResult.fail('删除失败：' + error.message));
    }
  }

  // 用户查询评论
  async listUserComment(req, res) {
    try {
      const result = await adminService.listUserComment(req.body, req);
      res.json(result);
    } catch (error) {
      res.status(500).json(PoetryResult.fail('查询失败：' + error.message));
    }
  }

  // Boss查询评论
  async listBossComment(req, res) {
    try {
      const result = await adminService.listBossComment(req.body);
      res.json(result);
    } catch (error) {
      res.status(500).json(PoetryResult.fail('查询失败：' + error.message));
    }
  }

  // Boss查询树洞
  async listBossTreeHole(req, res) {
    try {
      const result = await adminService.listBossTreeHole(req.body);
      res.json(result);
    } catch (error) {
      res.status(500).json(PoetryResult.fail('查询失败：' + error.message));
    }
  }
}

module.exports = new AdminController();
