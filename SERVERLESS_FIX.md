# Serverless 环境 401 错误修复说明

## 问题原因

在 Vercel serverless 环境中，每次请求可能会启动不同的函数实例，而原来的 `node-cache` 是基于内存的缓存，不同实例之间无法共享缓存数据。

**具体表现：**
- 用户登录后 token 存在实例 A 的内存缓存中
- 下次请求路由到实例 B，实例 B 的缓存中没有这个 token
- 导致返回 401 "登录已过期" 错误
- 多次请求后可能又路由回实例 A，此时又能正常访问

## 解决方案

将 token 相关的缓存从内存迁移到数据库持久化存储。

## 修改内容

### 1. 新增文件

- `models/TokenCache.js` - Token 缓存数据模型
- `migrations/create-token-cache.sql` - 数据库表创建脚本

### 2. 修改文件

- `utils/cache.js` - 缓存工具类，token 相关缓存使用数据库

## 部署步骤

### 1. 执行数据库迁移

连接到你的 MySQL 数据库，执行以下 SQL：

```sql
CREATE TABLE IF NOT EXISTS `token_cache` (
  `id` int NOT NULL AUTO_INCREMENT,
  `cache_key` varchar(255) NOT NULL,
  `cache_value` text NOT NULL,
  `expire_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `cache_key` (`cache_key`),
  KEY `expire_at` (`expire_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

### 2. 重新部署到 Vercel

```bash
vercel --prod
```

或者通过 Git 推送触发自动部署。

## 验证

1. 登录后台管理系统
2. 多次刷新或访问 `/admin/article/boss/list` 接口
3. 应该不再出现间歇性 401 错误

## 性能说明

- Token 缓存使用数据库存储，会有轻微的性能开销
- 但相比 401 错误导致的用户体验问题，这个开销是可以接受的
- 其他非 token 的缓存仍然使用内存缓存，保持高性能

## 清理过期数据（可选）

可以设置定时任务清理过期的 token 记录：

```sql
-- 手动清理
DELETE FROM token_cache WHERE expire_at < NOW();

-- 或创建定时事件（需要开启 event_scheduler）
SET GLOBAL event_scheduler = ON;
CREATE EVENT IF NOT EXISTS clean_expired_tokens
ON SCHEDULE EVERY 1 HOUR
DO DELETE FROM token_cache WHERE expire_at < NOW();
```
