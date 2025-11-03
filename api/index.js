// 设置时区为东八区（必须在其他模块加载之前设置）
process.env.TZ = 'Asia/Shanghai';

// Vercel serverless function entry point
let app;

try {
  app = require('../app');
} catch (error) {
  console.error('Failed to load app:', error);
  // 如果加载失败，导出一个错误处理函数
  module.exports = (req, res) => {
    res.status(500).json({
      error: 'Internal Server Error',
      message: error.message
    });
  };
  return;
}

// Vercel 需要导出一个处理函数
module.exports = (req, res) => {
  try {
    // 直接使用 Express app 处理请求
    app(req, res);
  } catch (error) {
    console.error('Request handler error:', error);
    if (!res.headersSent) {
      res.status(500).json({
        error: 'Internal Server Error',
        message: error.message
      });
    }
  }
};
