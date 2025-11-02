# Poetize Blog - Node.js Version

这是 Spring Boot + MyBatis 项目的 Node.js 版本。

## 技术栈

- **框架**: Express.js
- **ORM**: Sequelize
- **数据库**: MySQL
- **缓存**: node-cache (内存缓存)
- **其他**: bcryptjs, crypto, uuid, nodemailer

## 项目结构

```
Nodejs_Lo/
├── config/          # 配置文件
│   └── database.js  # 数据库配置
├── controllers/     # 控制器层
├── middleware/      # 中间件
│   ├── cors.js      # CORS配置
│   ├── errorHandler.js # 错误处理
│   └── loginCheck.js # 登录验证
├── models/          # 数据模型（Sequelize）
├── routes/          # 路由配置
├── services/       # 业务逻辑层
├── utils/          # 工具类
│   ├── cache.js    # 缓存工具
│   ├── constants.js # 常量
│   ├── crypto.js   # 加密工具
│   ├── result.js   # 响应结果封装
│   └── util.js     # 通用工具
├── app.js          # 应用入口
├── package.json    # 依赖配置
└── README.md       # 说明文档
```

## 安装和运行

### 1. 安装依赖

```bash
cd Nodejs_Lo
npm install
```

### 2. 配置环境变量

复制 `.env.example` 为 `.env` 并配置数据库连接信息：

```env
PORT=8081
NODE_ENV=dev

DB_HOST=mysql.sqlpub.com
DB_PORT=3306
DB_NAME=loblog00
DB_USER=XXXXX
DB_PASSWORD=XXXXX

CRYPTOJS_KEY=aoligeimeimaobin
```

### 3. 运行项目

开发模式（使用 nodemon）：

```bash
npm run dev
```

生产模式：

```bash
npm start
```

## API 接口

### 用户相关 (`/user`)

- `POST /user/regist` - 注册
- `POST /user/login` - 登录
- `POST /user/token` - Token登录
- `GET /user/logout` - 退出（需要登录）
- `POST /user/updateUserInfo` - 更新用户信息（需要登录）
- `GET /user/getCode` - 获取验证码（需要登录）
- `POST /user/updateSecretInfo` - 更新敏感信息（需要登录）
- `GET /user/getUserByUsername` - 根据用户名查找（需要登录）
- `GET /user/subscribe` - 订阅/取消订阅（需要登录）

### 文章相关 (`/article`)

- `POST /article/saveArticle` - 保存文章（需要登录）
- `GET /article/deleteArticle` - 删除文章（需要登录）
- `POST /article/updateArticle` - 更新文章（需要登录）
- `POST /article/listArticle` - 查询文章列表
- `GET /article/listSortArticle` - 查询分类文章列表
- `GET /article/getArticleById` - 查询文章详情

### 评论相关 (`/comment`)

- `POST /comment/saveComment` - 保存评论
- `GET /comment/deleteComment` - 删除评论（需要登录）
- `GET /comment/listComment` - 查询评论列表

### 网站信息 (`/webInfo`)

- `GET /webInfo/getWebInfo` - 获取网站信息
- `POST /webInfo/updateWebInfo` - 更新网站信息（需要管理员权限）

## 认证说明

项目使用 Token 认证机制，类似于原 Spring Boot 项目：

- Token 通过 `Authorization` 请求头传递
- 用户 Token 前缀：`user_access_token_`
- 管理员 Token 前缀：`admin_access_token_`
- Token 存储在内存缓存中，过期时间：10天
- 支持 Token 自动续期（1小时间隔）

## 主要特性

1. **用户认证**: 完整的登录、注册、Token验证机制
2. **文章管理**: CRUD操作，支持密码保护、分类、标签
3. **评论系统**: 支持嵌套评论
4. **缓存机制**: 使用内存缓存提升性能
5. **数据模型**: 完整的 Sequelize 模型定义，包含关联关系

## 注意事项

1. 本项目是从 Spring Boot + MyBatis 项目转换而来，保留了原有的业务逻辑和接口规范
2. 数据库结构保持一致，可以直接使用原项目的数据库
3. 部分功能（如邮件发送、文件上传）需要根据实际需求完善
4. 生产环境建议使用 Redis 替代内存缓存
5. 建议使用数据库迁移工具（如 Sequelize Migrations）管理数据库结构变更

## 开发说明

### 数据库模型关联

模型之间的关联关系已定义在 `models/index.js` 中：

- User ↔ Article (一对多)
- User ↔ Comment (一对多)
- Sort ↔ Article (一对多)
- Label ↔ Article (一对多)
- Sort ↔ Label (一对多)

### 缓存键名

缓存键名定义在 `utils/constants.js` 中，与原项目保持一致。

### 响应格式

所有接口返回统一的响应格式：

```json
{
  "code": 200,
  "message": "success",
  "data": {},
  "currentTimeMillis": 1234567890
}
```

## 待完善功能

- [ ] 邮件发送功能（验证码、订阅通知等）
- [ ] 文件上传功能（资源管理）
- [ ] IP地址解析功能
- [ ] 定时任务
- [ ] 日志记录
- [ ] 数据库迁移脚本
- [ ] 单元测试

## License

ISC
"# Nodejs_Lo" 
