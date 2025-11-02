const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');
const loginCheck = require('../middleware/loginCheck');

// 保存评论
router.post('/saveComment', commentController.saveComment.bind(commentController));

// 删除评论
router.get('/deleteComment', loginCheck(), commentController.deleteComment.bind(commentController));

// 查询评论列表（POST 方法，接收 BaseRequestVO）
router.post('/listComment', commentController.listComment.bind(commentController));

// 查询评论数量
router.get('/getCommentCount', commentController.getCommentCount.bind(commentController));

module.exports = router;
