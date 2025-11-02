const commentService = require('../services/commentService');
const PoetryResult = require('../utils/result');

class CommentController {
  async saveComment(req, res) {
    try {
      const result = await commentService.saveComment(req.body, req);
      res.json(result);
    } catch (error) {
      res.status(500).json(PoetryResult.fail('保存失败：' + error.message));
    }
  }

  async deleteComment(req, res) {
    try {
      const { id } = req.query;
      const result = await commentService.deleteComment(parseInt(id), req);
      res.json(result);
    } catch (error) {
      res.status(500).json(PoetryResult.fail('删除失败：' + error.message));
    }
  }

  async listComment(req, res) {
    try {
      // 调试：打印收到的参数
      console.log('listComment received body:', JSON.stringify(req.body));
      console.log('listComment received query:', JSON.stringify(req.query));
      
      const result = await commentService.listComment(req.body);
      res.json(result);
    } catch (error) {
      res.status(500).json(PoetryResult.fail('查询失败：' + error.message));
    }
  }

  async getCommentCount(req, res) {
    try {
      const { source, type } = req.query;
      const count = await commentService.getCommentCount(parseInt(source), type);
      res.json(PoetryResult.success(count));
    } catch (error) {
      res.status(500).json(PoetryResult.fail('查询失败：' + error.message));
    }
  }
}

module.exports = new CommentController();
