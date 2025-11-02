const articleService = require('../services/articleService');
const PoetryResult = require('../utils/result');

class ArticleController {
  async saveArticle(req, res) {
    try {
      const result = await articleService.saveArticle(req.body, req);
      res.json(result);
    } catch (error) {
      res.status(500).json(PoetryResult.fail('保存失败：' + error.message));
    }
  }

  async deleteArticle(req, res) {
    try {
      const { id } = req.query;
      const result = await articleService.deleteArticle(parseInt(id), req);
      res.json(result);
    } catch (error) {
      res.status(500).json(PoetryResult.fail('删除失败：' + error.message));
    }
  }

  async updateArticle(req, res) {
    try {
      const result = await articleService.updateArticle(req.body, req);
      res.json(result);
    } catch (error) {
      res.status(500).json(PoetryResult.fail('更新失败：' + error.message));
    }
  }

  async listArticle(req, res) {
    try {
      const result = await articleService.listArticle(req.body);
      res.json(result);
    } catch (error) {
      res.status(500).json(PoetryResult.fail('查询失败：' + error.message));
    }
  }

  async listSortArticle(req, res) {
    try {
      const result = await articleService.listSortArticle();
      res.json(result);
    } catch (error) {
      res.status(500).json(PoetryResult.fail('查询失败：' + error.message));
    }
  }

  async getArticleById(req, res) {
    try {
      const { id, password } = req.query;
      const result = await articleService.getArticleById(parseInt(id), password);
      res.json(result);
    } catch (error) {
      res.status(500).json(PoetryResult.fail('查询失败：' + error.message));
    }
  }
}

module.exports = new ArticleController();
