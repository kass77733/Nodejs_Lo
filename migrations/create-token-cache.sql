-- 创建 token_cache 表用于存储 token 缓存
CREATE TABLE IF NOT EXISTS `token_cache` (
  `id` int NOT NULL AUTO_INCREMENT,
  `cache_key` varchar(255) NOT NULL,
  `cache_value` text NOT NULL,
  `expire_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `cache_key` (`cache_key`),
  KEY `expire_at` (`expire_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
