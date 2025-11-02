const userService = require('../services/userService');
const PoetryResult = require('../utils/result');

class UserController {
  async regist(req, res) {
    try {
      const result = await userService.regist(req.body);
      res.json(result);
    } catch (error) {
      res.status(500).json(PoetryResult.fail('注册失败：' + error.message));
    }
  }

  async login(req, res) {
    try {
      const { account, password, isAdmin = false } = req.body;
      const result = await userService.login(account, password, isAdmin);
      res.json(result);
    } catch (error) {
      res.status(500).json(PoetryResult.fail('登录失败：' + error.message));
    }
  }

  async token(req, res) {
    try {
      const { userToken } = req.body;
      const result = await userService.token(userToken);
      res.json(result);
    } catch (error) {
      res.status(500).json(PoetryResult.fail('Token验证失败：' + error.message));
    }
  }

  async logout(req, res) {
    try {
      const result = await userService.exit(req);
      res.json(result);
    } catch (error) {
      res.status(500).json(PoetryResult.fail('退出失败：' + error.message));
    }
  }

  async updateUserInfo(req, res) {
    try {
      const result = await userService.updateUserInfo(req.body, req);
      res.json(result);
    } catch (error) {
      res.status(500).json(PoetryResult.fail('更新失败：' + error.message));
    }
  }

  async getCode(req, res) {
    try {
      const { flag } = req.query;
      const result = await userService.getCode(parseInt(flag));
      res.json(result);
    } catch (error) {
      res.status(500).json(PoetryResult.fail('获取验证码失败：' + error.message));
    }
  }

  async getCodeForBind(req, res) {
    try {
      const { place, flag } = req.query;
      const result = await userService.getCodeForBind(place, parseInt(flag));
      res.json(result);
    } catch (error) {
      res.status(500).json(PoetryResult.fail('获取验证码失败：' + error.message));
    }
  }

  async updateSecretInfo(req, res) {
    try {
      const { place, flag, code, password } = req.body;
      const result = await userService.updateSecretInfo(place, parseInt(flag), code, password, req);
      res.json(result);
    } catch (error) {
      res.status(500).json(PoetryResult.fail('更新失败：' + error.message));
    }
  }

  async getCodeForForgetPassword(req, res) {
    try {
      const { place, flag } = req.query;
      const result = await userService.getCodeForForgetPassword(place, parseInt(flag));
      res.json(result);
    } catch (error) {
      res.status(500).json(PoetryResult.fail('获取验证码失败：' + error.message));
    }
  }

  async updateForForgetPassword(req, res) {
    try {
      const { place, flag, code, password } = req.body;
      const result = await userService.updateForForgetPassword(place, parseInt(flag), code, password);
      res.json(result);
    } catch (error) {
      res.status(500).json(PoetryResult.fail('更新失败：' + error.message));
    }
  }

  async getUserByUsername(req, res) {
    try {
      const { username } = req.query;
      const result = await userService.getUserByUsername(username);
      res.json(result);
    } catch (error) {
      res.status(500).json(PoetryResult.fail('查询失败：' + error.message));
    }
  }

  async subscribe(req, res) {
    try {
      const { labelId, flag } = req.query;
      const result = await userService.subscribe(parseInt(labelId), flag === 'true', req);
      res.json(result);
    } catch (error) {
      res.status(500).json(PoetryResult.fail('操作失败：' + error.message));
    }
  }
}

module.exports = new UserController();
