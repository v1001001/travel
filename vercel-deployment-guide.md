# Vercel 部署指南

## 🚀 部署步骤

### 1. 访问 Vercel
- 打开 https://vercel.com
- 使用 GitHub 账户登录

### 2. 导入项目
- 点击 "New Project"
- 选择 "Import Git Repository"
- 找到并选择 `v1001001/travel` 仓库
- 点击 "Import"

### 3. 配置项目
- **Project Name**: `timeless-trips` (或您喜欢的名称)
- **Framework Preset**: 选择 "Other" 或 "Static"
- **Root Directory**: 保持默认 (./)
- **Build Command**: 留空 (静态网站无需构建)
- **Output Directory**: 留空 (使用根目录)

### 4. 部署
- 点击 "Deploy"
- 等待部署完成 (通常1-2分钟)

### 5. 获取访问地址
部署完成后，您将获得：
- **默认域名**: `https://timeless-trips-xxx.vercel.app`
- **自定义域名**: 可以绑定您的域名

## 🌐 自定义域名配置

### 绑定您的域名
1. 在 Vercel 项目页面点击 "Settings"
2. 选择 "Domains"
3. 添加您的域名: `timelesstrips.life`
4. 按照提示配置 DNS 记录

### DNS 配置
在您的域名管理后台添加以下记录：
```
Type: CNAME
Name: @
Value: cname.vercel-dns.com
```

## ✅ 部署优势

### 相比阿里云服务器的优势：
- ✅ **无需备案**: 完全绕过ICP备案问题
- ✅ **全球CDN**: 自动全球加速
- ✅ **自动HTTPS**: 免费SSL证书
- ✅ **完全免费**: 个人项目免费额度充足
- ✅ **部署简单**: 连接GitHub自动部署
- ✅ **性能优秀**: 边缘计算网络

### 移动端优化：
- ✅ 微信浏览器兼容
- ✅ 响应式设计
- ✅ 快速加载
- ✅ 全球访问

## 📱 测试建议

部署完成后测试：
1. **移动端**: 手机浏览器访问
2. **微信浏览器**: 微信内置浏览器测试
3. **PC端**: Chrome/Safari测试
4. **响应式**: 不同窗口大小测试

## 🔧 更新网站

后续更新网站：
1. 修改本地文件
2. `git add . && git commit -m "update" && git push`
3. Vercel 自动重新部署

## 🎉 完成

部署完成后，您的网站将：
- 全球快速访问
- 无需备案
- 自动HTTPS
- 移动端完美支持
