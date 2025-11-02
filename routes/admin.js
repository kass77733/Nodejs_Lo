const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const loginCheck = require('../middleware/loginCheck');

// 用户管理
router.post('/user/list', loginCheck(0), adminController.listUser.bind(adminController));
router.get('/user/changeUserStatus', loginCheck(0), adminController.changeUserStatus.bind(adminController));
router.get('/user/changeUserAdmire', loginCheck(0), adminController.changeUserAdmire.bind(adminController));
router.get('/user/changeUserType', loginCheck(0), adminController.changeUserType.bind(adminController));

// 网站信息管理
router.get('/webInfo/getAdminWebInfo', loginCheck(0), adminController.getAdminWebInfo.bind(adminController));

// 文章管理
router.post('/article/user/list', loginCheck(1), adminController.listUserArticle.bind(adminController));
router.post('/article/boss/list', loginCheck(0), adminController.listBossArticle.bind(adminController));
router.get('/article/changeArticleStatus', loginCheck(1), adminController.changeArticleStatus.bind(adminController));
router.get('/article/getArticleById', loginCheck(1), adminController.getArticleById.bind(adminController));

// 评论管理
router.get('/comment/user/deleteComment', loginCheck(1), adminController.userDeleteComment.bind(adminController));
router.get('/comment/boss/deleteComment', loginCheck(0), adminController.bossDeleteComment.bind(adminController));
router.post('/comment/user/list', loginCheck(1), adminController.listUserComment.bind(adminController));
router.post('/comment/boss/list', loginCheck(0), adminController.listBossComment.bind(adminController));

// 树洞管理
router.post('/treeHole/boss/list', loginCheck(0), adminController.listBossTreeHole.bind(adminController));

module.exports = router;
