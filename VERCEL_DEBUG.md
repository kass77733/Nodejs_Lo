# Vercel 部署调试指南

## 常见错误排查

### 1. FUNCTION_INVOCATION_FAILED (500 错误)

如果遇到 "This Serverless Function has crashed" 错误，请按以下步骤排查：

#### 检查环境变量

确保在 Vercel 项目设置中配置了以下环境变量：

```
DB_HOST=你的数据库主机
DB_PORT=3306
DB_NAME=你的数据库名
DB_USER=你的数据库用户名
DB_PASSWORD=你的数据库密码
CRYPTOJS_KEY=aoligeimeimaobin
NODE_ENV=production
```

#### 查看错误日志

1. 在 Vercel Dashboard 中进入你的项目
2. 点击 "Functions" 标签
3. 点击失败的函数，查看详细错误日志
4. 或者使用 CLI：`vercel logs <deployment-url>`

#### 常见原因

1. **环境变量缺失**：数据库连接信息未正确配置
2. **数据库连接失败**：
   - 检查数据库白名单是否允许 Vercel 的 IP
   - Vercel 使用动态 IP，建议允许所有 IP 访问数据库
   - 检查数据库连接字符串是否正确
3. **模块加载错误**：某些依赖包可能有问题
4. **超时**：数据库查询超时（Hobby 计划限制 10 秒）

### 2. 本地测试 Vercel 环境

使用 Vercel CLI 在本地模拟 Vercel 环境：

```bash
cd Nodejs_Lo
vercel dev
```

这会启动一个本地服务器，模拟 Vercel 的 serverless 环境。

### 3. 检查部署配置

确保 `vercel.json` 配置正确：

```json
{
  "version": 2,
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/api/index.js"
    }
  ]
}
```

### 4. 验证文件结构

确保项目结构正确：

```
Nodejs_Lo/
├── api/
│   └── index.js      # Serverless 函数入口
├── app.js            # Express 应用
├── vercel.json       # Vercel 配置
└── ...
```

### 5. 数据库连接问题

如果数据库连接失败，可以：

1. **检查数据库白名单**：
   - 确保数据库允许外部连接
   - Vercel 使用动态 IP，建议允许 `%`（所有 IP）或使用代理

2. **测试数据库连接**：
   ```bash
   # 使用数据库客户端工具测试连接
   mysql -h YOUR_DB_HOST -u YOUR_DB_USER -p
   ```

3. **查看数据库日志**：
   - 检查数据库服务器日志，查看连接尝试

### 6. 依赖问题

如果依赖安装或加载有问题：

1. **清理并重新安装**：
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

2. **检查 package.json**：
   - 确保所有依赖版本兼容
   - 检查是否有冲突的依赖

### 7. 调试技巧

#### 添加详细日志

在 `api/index.js` 中添加日志：

```javascript
console.log('Environment:', process.env.NODE_ENV);
console.log('DB_HOST:', process.env.DB_HOST ? 'Set' : 'Not set');
console.log('Request:', req.method, req.url);
```

#### 测试健康检查端点

访问 `/health` 端点测试基本功能：

```
https://your-project.vercel.app/health
```

如果健康检查也失败，说明是应用初始化问题。

### 8. 联系支持

如果问题仍然存在：

1. 查看 Vercel 的 [文档](https://vercel.com/docs)
2. 在 Vercel Dashboard 中查看详细的错误日志
3. 检查 [Vercel 社区论坛](https://github.com/vercel/vercel/discussions)
