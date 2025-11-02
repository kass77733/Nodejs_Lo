# API 兼容性检查清单

本文档列出了需要与原版 Java 完全一致的接口要求。

## 已修复的接口

### 1. `article/getArticleById`
- ✅ 使用 `buildArticleVO` 构建完整 VO
- ✅ 包含 `username`, `commentCount`, `sort`, `label` 字段
- ✅ 日期格式：`yyyy-MM-dd HH:mm:ss`
- ✅ 不返回 `deleted` 字段
- ✅ 字段顺序与原版一致

### 2. `webInfo/listSortAndLabel`
- ✅ Sort 对象包含 `countOfSort: null` 和 `labels: null`

### 3. `webInfo/getWebInfo`
- ✅ 设置敏感字段为 null
- ✅ 包含 `historyAllCount` 和 `historyDayCount`

## 需要检查的所有接口

### Article 相关
- [ ] `article/listArticle` - 文章列表
- [ ] `article/listSortArticle` - 分类文章列表
- [ ] `article/getArticleById` - 文章详情（已修复）
- [ ] `admin/article/user/list` - 用户文章列表
- [ ] `admin/article/boss/list` - Boss文章列表
- [ ] `admin/article/getArticleById` - 管理员获取文章

### Comment 相关
- [ ] `comment/listComment` - 评论列表
- [ ] `comment/getCommentCount` - 评论数量
- [ ] `comment/saveComment` - 保存评论
- [ ] `comment/deleteComment` - 删除评论

### WebInfo 相关
- [ ] `webInfo/getWebInfo` - 网站信息（已修复）
- [ ] `webInfo/getSortInfo` - 分类信息
- [ ] `webInfo/getAdmire` - 赞赏用户
- [ ] `webInfo/listTreeHole` - 树洞列表
- [ ] `webInfo/listSortAndLabel` - 分类标签列表（已修复）
- [ ] `webInfo/getHistoryInfo` - 历史统计

### User 相关
- [ ] `user/login` - 登录
- [ ] `user/regist` - 注册
- [ ] `user/token` - Token验证
- [ ] `user/getUserByUsername` - 查询用户

## 检查要点

1. **字段完整性**：确保所有字段都存在，即使值为 null
2. **字段顺序**：保持与原版一致的字段顺序
3. **日期格式**：统一使用 `yyyy-MM-dd HH:mm:ss` 格式
4. **嵌套对象**：确保嵌套对象结构完整（如 sort, label）
5. **不返回敏感字段**：如 deleted, password（某些接口）
6. **null 值处理**：原版返回 null 的字段，也要返回 null
