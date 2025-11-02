const webInfoService = require('../services/webInfoService');
const PoetryResult = require('../utils/result');

class WebInfoController {
  async getWebInfo(req, res) {
    try {
      const result = await webInfoService.getWebInfo();
      res.json(result);
    } catch (error) {
      res.status(500).json(PoetryResult.fail('查询失败：' + error.message));
    }
  }

  async updateWebInfo(req, res) {
    try {
      const result = await webInfoService.updateWebInfo(req.body, req);
      res.json(result);
    } catch (error) {
      res.status(500).json(PoetryResult.fail('更新失败：' + error.message));
    }
  }

  async getSortInfo(req, res) {
    try {
      const result = await webInfoService.getSortInfo();
      res.json(result);
    } catch (error) {
      res.status(500).json(PoetryResult.fail('查询失败：' + error.message));
    }
  }

  async getAdmire(req, res) {
    try {
      const result = await webInfoService.getAdmire();
      res.json(result);
    } catch (error) {
      res.status(500).json(PoetryResult.fail('查询失败：' + error.message));
    }
  }

  async listTreeHole(req, res) {
    try {
      const result = await webInfoService.listTreeHole();
      res.json(result);
    } catch (error) {
      res.status(500).json(PoetryResult.fail('查询失败：' + error.message));
    }
  }

  async getHistoryInfo(req, res) {
    try {
      const result = await webInfoService.getHistoryInfo();
      res.json(result);
    } catch (error) {
      res.status(500).json(PoetryResult.fail('查询失败：' + error.message));
    }
  }

  async listSortAndLabel(req, res) {
    try {
      const result = await webInfoService.listSortAndLabel();
      res.json(result);
    } catch (error) {
      res.status(500).json(PoetryResult.fail('查询失败：' + error.message));
    }
  }

  async saveSort(req, res) {
    try {
      const result = await webInfoService.saveSort(req.body);
      res.json(result);
    } catch (error) {
      res.status(500).json(PoetryResult.fail('保存失败：' + error.message));
    }
  }

  async deleteSort(req, res) {
    try {
      const { id } = req.query;
      const result = await webInfoService.deleteSort(parseInt(id));
      res.json(result);
    } catch (error) {
      res.status(500).json(PoetryResult.fail('删除失败：' + error.message));
    }
  }

  async updateSort(req, res) {
    try {
      const result = await webInfoService.updateSort(req.body);
      res.json(result);
    } catch (error) {
      res.status(500).json(PoetryResult.fail('更新失败：' + error.message));
    }
  }

  async listSort(req, res) {
    try {
      const result = await webInfoService.listSort();
      res.json(result);
    } catch (error) {
      res.status(500).json(PoetryResult.fail('查询失败：' + error.message));
    }
  }

  async saveLabel(req, res) {
    try {
      const result = await webInfoService.saveLabel(req.body);
      res.json(result);
    } catch (error) {
      res.status(500).json(PoetryResult.fail('保存失败：' + error.message));
    }
  }

  async deleteLabel(req, res) {
    try {
      const { id } = req.query;
      const result = await webInfoService.deleteLabel(parseInt(id));
      res.json(result);
    } catch (error) {
      res.status(500).json(PoetryResult.fail('删除失败：' + error.message));
    }
  }

  async updateLabel(req, res) {
    try {
      const result = await webInfoService.updateLabel(req.body);
      res.json(result);
    } catch (error) {
      res.status(500).json(PoetryResult.fail('更新失败：' + error.message));
    }
  }

  async listLabel(req, res) {
    try {
      const result = await webInfoService.listLabel();
      res.json(result);
    } catch (error) {
      res.status(500).json(PoetryResult.fail('查询失败：' + error.message));
    }
  }

  async saveTreeHole(req, res) {
    try {
      const result = await webInfoService.saveTreeHole(req.body);
      res.json(result);
    } catch (error) {
      res.status(500).json(PoetryResult.fail('保存失败：' + error.message));
    }
  }

  async deleteTreeHole(req, res) {
    try {
      const { id } = req.query;
      const result = await webInfoService.deleteTreeHole(parseInt(id));
      res.json(result);
    } catch (error) {
      res.status(500).json(PoetryResult.fail('删除失败：' + error.message));
    }
  }
}

module.exports = new WebInfoController();
