const express = require('express');
const router = express.Router();
const webInfoController = require('../controllers/webInfoController');
const loginCheck = require('../middleware/loginCheck');
const saveCheck = require('../middleware/saveCheck');

// 获取网站信息
router.get('/getWebInfo', webInfoController.getWebInfo.bind(webInfoController));

// 更新网站信息
router.post('/updateWebInfo', loginCheck(0), webInfoController.updateWebInfo.bind(webInfoController));

// 获取分类标签信息
router.get('/getSortInfo', webInfoController.getSortInfo.bind(webInfoController));

// 获取赞赏用户列表
router.get('/getAdmire', webInfoController.getAdmire.bind(webInfoController));

// 查询树洞列表
router.get('/listTreeHole', webInfoController.listTreeHole.bind(webInfoController));

// 保存树洞（需要频率限制）
router.post('/saveTreeHole', saveCheck, webInfoController.saveTreeHole.bind(webInfoController));

// 删除树洞（需要管理员权限）
router.get('/deleteTreeHole', loginCheck(0), webInfoController.deleteTreeHole.bind(webInfoController));

// 获取历史信息统计（需要管理员权限）
router.get('/getHistoryInfo', loginCheck(0), webInfoController.getHistoryInfo.bind(webInfoController));

// 查询分类和标签列表
router.get('/listSortAndLabel', webInfoController.listSortAndLabel.bind(webInfoController));

// 分类管理接口
router.post('/saveSort', loginCheck(0), webInfoController.saveSort.bind(webInfoController));
router.get('/deleteSort', loginCheck(0), webInfoController.deleteSort.bind(webInfoController));
router.post('/updateSort', loginCheck(0), webInfoController.updateSort.bind(webInfoController));
router.get('/listSort', webInfoController.listSort.bind(webInfoController));

// 标签管理接口
router.post('/saveLabel', loginCheck(0), webInfoController.saveLabel.bind(webInfoController));
router.get('/deleteLabel', loginCheck(0), webInfoController.deleteLabel.bind(webInfoController));
router.post('/updateLabel', loginCheck(0), webInfoController.updateLabel.bind(webInfoController));
router.get('/listLabel', webInfoController.listLabel.bind(webInfoController));

module.exports = router;
