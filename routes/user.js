const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const loginCheck = require('../middleware/loginCheck');

// 注册
router.post('/regist', userController.regist.bind(userController));

// 登录
router.post('/login', userController.login.bind(userController));

// Token登录
router.post('/token', userController.token.bind(userController));

// 退出
router.get('/logout', loginCheck(), userController.logout.bind(userController));

// 更新用户信息
router.post('/updateUserInfo', loginCheck(), userController.updateUserInfo.bind(userController));

// 获取验证码
router.get('/getCode', loginCheck(), userController.getCode.bind(userController));

// 绑定手机号或邮箱的验证码
router.get('/getCodeForBind', loginCheck(), userController.getCodeForBind.bind(userController));

// 更新敏感信息
router.post('/updateSecretInfo', loginCheck(), userController.updateSecretInfo.bind(userController));

// 忘记密码 - 获取验证码
router.get('/getCodeForForgetPassword', userController.getCodeForForgetPassword.bind(userController));

// 忘记密码 - 更新密码
router.post('/updateForForgetPassword', userController.updateForForgetPassword.bind(userController));

// 根据用户名查找用户
router.get('/getUserByUsername', loginCheck(), userController.getUserByUsername.bind(userController));

// 订阅/取消订阅
router.get('/subscribe', loginCheck(), userController.subscribe.bind(userController));

module.exports = router;
