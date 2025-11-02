const PoetryResult = require('../utils/result');

const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);
  
  if (err.status) {
    return res.status(err.status).json(PoetryResult.fail(err.message, err.status));
  }
  
  return res.status(500).json(PoetryResult.fail('服务器内部错误：' + err.message));
};

module.exports = errorHandler;
