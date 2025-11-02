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

复制 `env.template` 为 `.env` 并配置数据库连接信息：

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

## 部署到 Vercel

### 准备工作

1. **安装 Vercel CLI**（可选，也可以直接通过网页部署）

```bash
npm install -g vercel
```

2. **登录 Vercel**

```bash
vercel login
```

### 部署步骤

#### 方法一：通过 Vercel CLI 部署

1. **在项目根目录运行**

```bash
cd Nodejs_Lo
vercel
```

2. **按照提示操作**
   - 选择项目范围
   - 链接到现有项目或创建新项目
   - 确认配置

3. **设置环境变量**

在 Vercel 项目设置中或使用 CLI 设置环境变量：

```bash
vercel env add DB_HOST
vercel env add DB_PORT
vercel env add DB_NAME
vercel env add DB_USER
vercel env add DB_PASSWORD
vercel env add CRYPTOJS_KEY
vercel env add NODE_ENV production
```

#### 方法二：通过 Vercel 网页部署

1. **访问 [Vercel](https://vercel.com/) 并登录**
2. **导入项目**
   - 点击 "New Project"
   - 连接你的 Git 仓库（GitHub/GitLab/Bitbucket）
   - 选择 `Nodejs_Lo` 文件夹

3. **配置项目**
   - Framework Preset: Other
   - Root Directory: `Nodejs_Lo`
   - Build Command: 留空（Vercel 会自动检测）
   - Output Directory: 留空
   - Install Command: `npm install`

4. **设置环境变量**
   - 在项目设置中添加以下环境变量：
     ```
     DB_HOST=你的数据库主机
     DB_PORT=3306
     DB_NAME=你的数据库名
     DB_USER=你的数据库用户名
     DB_PASSWORD=你的数据库密码
     CRYPTOJS_KEY=aoligeimeimaobin
     NODE_ENV=production
     VERCEL=1
     ```

5. **部署**
   - 点击 "Deploy" 按钮
   - 等待部署完成

### 注意事项

1. **数据库连接**
   - 确保数据库允许 Vercel 的 IP 地址连接
   - 如果使用云数据库，检查白名单设置
   - Vercel 使用动态 IP，可能需要允许所有 IP 或使用代理

2. **连接池优化**
   - 代码已针对 serverless 环境优化
   - 连接池大小自动调整为 2（Vercel 环境）
   - 连接会在空闲时快速释放

3. **冷启动**
   - Serverless 函数可能遇到冷启动延迟
   - 可以考虑使用 Vercel 的 Edge Functions 或保持函数预热

4. **文件大小限制**
   - Vercel 的 serverless 函数有大小限制（50MB）
   - 确保 `node_modules` 不会过大
   - 可以考虑使用 `.vercelignore` 排除不必要的文件

5. **超时限制**
   - Vercel Hobby 计划：10 秒超时
   - Pro 计划：60 秒超时
   - 确保数据库查询和业务逻辑在限制时间内完成

### 环境变量说明

在 Vercel 项目设置中配置以下环境变量：

| 变量名 | 说明 | 示例 |
|--------|------|------|
| `DB_HOST` | 数据库主机地址 | `mysql.example.com` |
| `DB_PORT` | 数据库端口 | `3306` |
| `DB_NAME` | 数据库名称 | `loblog00` |
| `DB_USER` | 数据库用户名 | `user` |
| `DB_PASSWORD` | 数据库密码 | `password123` |
| `CRYPTOJS_KEY` | 加密密钥 | `aoligeimeimaobin` |
| `NODE_ENV` | 环境变量 | `production` |
| `VERCEL` | Vercel 标识（自动设置） | `1` |

### 本地测试 Vercel 环境

可以使用 Vercel CLI 在本地模拟 Vercel 环境：

```bash
vercel dev
```

这会在本地启动一个模拟 Vercel 环境的服务器。

### 更新部署

每次推送到 Git 仓库的主分支，Vercel 会自动重新部署。也可以手动触发：

```bash
vercel --prod
```

### 故障排查

如果部署后遇到 `FUNCTION_INVOCATION_FAILED` 错误：

1. **检查环境变量**：确保所有必需的环境变量都在 Vercel 项目设置中配置
2. **查看日志**：在 Vercel Dashboard → Functions → 查看详细错误日志
3. **测试连接**：访问 `/health` 端点测试基本功能
4. **数据库白名单**：确保数据库允许 Vercel 的 IP 访问（建议允许所有 IP）

更多故障排查信息，请查看 `VERCEL_DEBUG.md` 文件。

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
