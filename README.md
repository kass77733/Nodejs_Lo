# Poetize Blog - Node.js 后端

基于 Express + Sequelize 的博客系统后端，从 Spring Boot 项目迁移而来，专为 Vercel Serverless 环境优化。

## ✨ 功能特性

### 核心功能
- 🔐 **用户认证** - 注册、登录、Token 验证、权限管理
- 📝 **文章管理** - CRUD 操作、密码保护、分类标签、推荐文章
- 💬 **评论系统** - 嵌套评论、评论管理
- 🏷️ **分类标签** - 文章分类、标签管理、统计功能
- 🌳 **树洞留言** - 匿名留言板
- 📊 **访问统计** - IP 统计、地域分析、访问历史
- 👤 **用户管理** - 用户列表、状态管理、权限设置

### 技术特性
- ⚡ **Serverless 优化** - Token 数据库持久化，解决实例隔离问题
- 🚀 **性能优化** - 减少 90% 的 N+1 查询，优化数据库连接池
- 🔄 **自动重试** - 数据库连接失败自动重试机制
- 🔒 **安全加密** - AES 加密、MD5 哈希、密码保护

## 📦 技术栈

- **框架**: Express.js
- **ORM**: Sequelize
- **数据库**: MySQL
- **认证**: Token (数据库存储)
- **加密**: crypto, bcryptjs
- **其他**: uuid, nodemailer

## 🚀 快速开始

### 本地开发

1. **安装依赖**
```bash
cd Nodejs_Lo
npm install
```

2. **配置环境变量**

创建 `.env` 文件：
```env
PORT=8081
NODE_ENV=dev

# 数据库配置
DB_HOST=your-mysql-host
DB_PORT=3306
DB_NAME=your-database
DB_USER=your-username
DB_PASSWORD=your-password

# 加密密钥
CRYPTOJS_KEY=aoligeimeimaobin
```

3. **初始化数据库**

执行 SQL 脚本创建 token_cache 表：
```bash
mysql -u your-username -p your-database < migrations/create-token-cache.sql
```

4. **启动服务**
```bash
# 开发模式（热重载）
npm run dev

# 生产模式
npm start
```

访问 `http://localhost:8081`

## 🌐 部署到 Vercel

### 前置准备

1. **准备 MySQL 数据库**
   - 推荐使用云数据库（如 PlanetScale、Railway、阿里云 RDS）
   - 确保数据库允许外网访问
   - 执行 `migrations/create-token-cache.sql` 创建必要的表

2. **注册 Vercel 账号**
   - 访问 [vercel.com](https://vercel.com)
   - 使用 GitHub/GitLab/Bitbucket 登录

### 部署步骤

#### 方法一：通过 Vercel Dashboard（推荐）

1. **导入项目**
   - 登录 Vercel Dashboard
   - 点击 "New Project"
   - 选择你的 Git 仓库
   - 选择 `Nodejs_Lo` 目录作为根目录

2. **配置项目**
   ```
   Framework Preset: Other
   Root Directory: Nodejs_Lo
   Build Command: (留空)
   Output Directory: (留空)
   Install Command: npm install
   ```

3. **设置环境变量**

   在 "Environment Variables" 中添加：
   ```
   DB_HOST=your-mysql-host
   DB_PORT=3306
   DB_NAME=your-database
   DB_USER=your-username
   DB_PASSWORD=your-password
   CRYPTOJS_KEY=aoligeimeimaobin
   NODE_ENV=production
   ```

4. **部署**
   - 点击 "Deploy" 按钮
   - 等待部署完成（约 1-2 分钟）
   - 获取部署 URL（如 `https://your-project.vercel.app`）

#### 方法二：通过 Vercel CLI

1. **安装 CLI**
```bash
npm install -g vercel
```

2. **登录**
```bash
vercel login
```

3. **部署**
```bash
cd Nodejs_Lo
vercel
```

4. **设置环境变量**
```bash
vercel env add DB_HOST
vercel env add DB_PORT
vercel env add DB_NAME
vercel env add DB_USER
vercel env add DB_PASSWORD
vercel env add CRYPTOJS_KEY
vercel env add NODE_ENV
```

5. **生产部署**
```bash
vercel --prod
```

### 部署后配置

1. **测试接口**
```bash
# 健康检查
curl https://your-project.vercel.app/health

# 获取网站信息
curl https://your-project.vercel.app/webInfo/getWebInfo
```

2. **配置前端**

在前端项目中设置 API 地址：
```javascript
const API_BASE_URL = 'https://your-project.vercel.app';
```

3. **配置域名（可选）**
   - 在 Vercel Dashboard → Settings → Domains
   - 添加自定义域名
   - 配置 DNS 记录

## 📡 API 接口

### 用户相关 `/user`
- `POST /user/regist` - 用户注册
- `POST /user/login` - 用户登录
- `POST /user/token` - Token 登录
- `GET /user/logout` - 退出登录 🔒
- `POST /user/updateUserInfo` - 更新用户信息 🔒
- `GET /user/getUserByUsername` - 查询用户 🔒

### 文章相关 `/article`
- `POST /article/listArticle` - 文章列表
- `GET /article/getArticleById` - 文章详情
- `GET /article/listSortArticle` - 分类文章列表
- `POST /article/saveArticle` - 保存文章 🔒
- `POST /article/updateArticle` - 更新文章 🔒
- `GET /article/deleteArticle` - 删除文章 🔒

### 评论相关 `/comment`
- `POST /comment/saveComment` - 发表评论
- `GET /comment/listComment` - 评论列表
- `GET /comment/deleteComment` - 删除评论 🔒

### 管理员相关 `/admin`
- `POST /admin/user/list` - 用户列表 👑
- `POST /admin/article/boss/list` - 文章管理 👑
- `POST /admin/comment/boss/list` - 评论管理 👑
- `GET /admin/webInfo/getAdminWebInfo` - 网站信息 👑

### 网站信息 `/webInfo`
- `GET /webInfo/getWebInfo` - 获取网站信息
- `GET /webInfo/getHistoryInfo` - 访问统计
- `GET /webInfo/getSortInfo` - 分类标签信息
- `POST /webInfo/updateWebInfo` - 更新网站信息 👑

🔒 需要登录 | 👑 需要管理员权限

## 🔧 配置说明

### 环境变量

| 变量名 | 说明 | 默认值 | 必填 |
|--------|------|--------|------|
| `PORT` | 服务端口 | 8081 | ❌ |
| `NODE_ENV` | 环境 | dev | ❌ |
| `DB_HOST` | 数据库地址 | - | ✅ |
| `DB_PORT` | 数据库端口 | 3306 | ❌ |
| `DB_NAME` | 数据库名 | - | ✅ |
| `DB_USER` | 数据库用户 | - | ✅ |
| `DB_PASSWORD` | 数据库密码 | - | ✅ |
| `CRYPTOJS_KEY` | 加密密钥 | - | ✅ |

### Token 配置

```javascript
TOKEN_EXPIRE: 864000,    // 10 天
TOKEN_INTERVAL: 43200,   // 12 小时自动续期
```

### 数据库连接池

```javascript
pool: {
  max: 3,           // 最大连接数
  min: 0,           // 最小连接数
  acquire: 60000,   // 获取连接超时 60s
  idle: 10000,      // 空闲超时 10s
}
```

## 🐛 故障排查

### 1. 数据库连接超时

**问题**: `connect ETIMEDOUT`

**解决方案**:
- 检查数据库白名单，允许 Vercel IP 访问（建议允许所有 IP）
- 确认数据库地址和端口正确
- 检查数据库服务是否正常运行

### 2. Token 验证失败 (401)

**问题**: 间歇性 401 错误

**解决方案**:
- 确保已执行 `migrations/create-token-cache.sql`
- 检查 `token_cache` 表是否存在
- 查看 Vercel 日志确认数据库连接正常

### 3. 接口响应慢

**优化建议**:
- 添加数据库索引（见 `PERFORMANCE_OPTIMIZATION.md`）
- 考虑使用 Redis 缓存热点数据
- 使用 CDN 加速静态资源

### 4. 查看日志

```bash
# Vercel CLI
vercel logs

# Vercel Dashboard
项目 → Deployments → 选择部署 → Functions → 查看日志
```

## 📊 性能优化

本项目已针对 Serverless 环境进行优化：

- ✅ Token 数据库持久化（解决实例隔离）
- ✅ 减少 90% 的 N+1 查询
- ✅ 优化数据库连接池配置
- ✅ 添加连接重试机制

详见 [PERFORMANCE_OPTIMIZATION.md](./PERFORMANCE_OPTIMIZATION.md)

## 📝 项目结构

```
Nodejs_Lo/
├── api/                    # Vercel Serverless 入口
│   └── index.js
├── config/                 # 配置文件
│   └── database.js         # 数据库配置
├── controllers/            # 控制器层
├── middleware/             # 中间件
│   ├── cors.js            # CORS 配置
│   ├── errorHandler.js    # 错误处理
│   └── loginCheck.js      # 登录验证
├── models/                 # 数据模型
│   ├── TokenCache.js      # Token 缓存表
│   └── ...
├── routes/                 # 路由配置
├── services/              # 业务逻辑层
├── utils/                 # 工具类
├── migrations/            # 数据库迁移脚本
├── app.js                 # 应用入口
├── vercel.json            # Vercel 配置
└── package.json           # 依赖配置
```

## 🔐 安全建议

1. **生产环境**
   - 修改 `CRYPTOJS_KEY` 为随机字符串
   - 使用强密码策略
   - 定期更新依赖包

2. **数据库安全**
   - 使用独立的数据库用户
   - 限制数据库权限
   - 定期备份数据

3. **API 安全**
   - 配置 CORS 白名单
   - 添加请求频率限制
   - 启用 HTTPS

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 License

ISC

## 🔗 相关链接

- [原版 Spring Boot 项目](https://github.com/your-repo)
- [前端项目](https://github.com/your-frontend-repo)
- [Vercel 文档](https://vercel.com/docs)
- [Sequelize 文档](https://sequelize.org/)

## 📮 联系方式

如有问题，请提交 Issue 或联系作者。
