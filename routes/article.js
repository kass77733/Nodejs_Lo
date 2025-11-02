const express = require('express');
const router = express.Router();
const articleController = require('../controllers/articleController');
const loginCheck = require('../middleware/loginCheck');

// 保存文章
router.post('/saveArticle', loginCheck(1), articleController.saveArticle.bind(articleController));

// 删除文章
router.get('/deleteArticle', loginCheck(1), articleController.deleteArticle.bind(articleController));

// 更新文章
router.post('/updateArticle', loginCheck(1), articleController.updateArticle.bind(articleController));

// 查询文章列表
router.post('/listArticle', articleController.listArticle.bind(articleController));

// 查询分类文章列表
router.get('/listSortArticle', articleController.listSortArticle.bind(articleController));

// 查询文章
router.get('/getArticleById', articleController.getArticleById.bind(articleController));

module.exports = router;
