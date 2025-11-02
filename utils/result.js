class PoetryResult {
  constructor(code = 200, message = null, data = null) {
    this.code = code;
    this.message = message;
    this.data = data;
    this.currentTimeMillis = Date.now();
  }

  static success(data = null) {
    if (data === null) {
      return new PoetryResult(200, null);
    }
    return new PoetryResult(200, null, data);
  }

  static fail(message, code = 500) {
    return new PoetryResult(code, message);
  }

  static failWithCode(code, message) {
    return new PoetryResult(code, message);
  }
}

module.exports = PoetryResult;
