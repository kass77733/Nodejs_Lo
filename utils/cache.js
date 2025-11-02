const NodeCache = require('node-cache');

const cache = new NodeCache({ stdTTL: 1800, checkperiod: 120 });

class PoetryCache {
  static put(key, value, ttl = null) {
    if (ttl) {
      return cache.set(key, value, ttl);
    }
    return cache.set(key, value);
  }

  static get(key) {
    return cache.get(key);
  }

  static remove(key) {
    return cache.del(key);
  }

  static clear() {
    return cache.flushAll();
  }

  static has(key) {
    return cache.has(key);
  }

  static keys() {
    return cache.keys();
  }
}

module.exports = PoetryCache;
