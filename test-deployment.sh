#!/bin/bash

# 测试部署脚本
SERVER_IP="8.155.160.129"
SERVER_USER="root"
SERVER_PASSWORD="alywll123##"

echo "🧪 测试旅行攻略项目部署状态..."

echo "📊 检查Nginx服务状态..."
sshpass -p "$SERVER_PASSWORD" ssh -o StrictHostKeyChecking=no $SERVER_USER@$SERVER_IP "systemctl status nginx --no-pager"

echo "🌐 检查网站内容..."
sshpass -p "$SERVER_PASSWORD" ssh -o StrictHostKeyChecking=no $SERVER_USER@$SERVER_IP "curl -s http://localhost | grep -o '<title>.*</title>'"

echo "📁 检查文件部署..."
sshpass -p "$SERVER_PASSWORD" ssh -o StrictHostKeyChecking=no $SERVER_USER@$SERVER_IP "ls -la /var/www/travel/ | head -10"

echo "🔧 检查Nginx配置..."
sshpass -p "$SERVER_PASSWORD" ssh -o StrictHostKeyChecking=no $SERVER_USER@$SERVER_IP "nginx -t"

echo "🌍 检查网络连接..."
sshpass -p "$SERVER_PASSWORD" ssh -o StrictHostKeyChecking=no $SERVER_USER@$SERVER_IP "netstat -tlnp | grep :8080"

echo "✅ 部署测试完成！"
echo ""
echo "📝 重要提示："
echo "如果外部无法访问 http://8.155.160.129:8080，请检查阿里云安全组配置："
echo "1. 登录阿里云控制台"
echo "2. 进入ECS实例管理"
echo "3. 点击安全组配置"
echo "4. 添加入方向规则："
echo "   - 端口范围：8080/8080"
echo "   - 授权对象：0.0.0.0/0"
echo "   - 优先级：1"
echo ""
echo "🌐 网站地址："
echo "主页面: http://8.155.160.129:8080"
echo "东北呼伦贝尔: http://8.155.160.129:8080/northeast-hulunbeier-travel.html"
echo "黑龙江深度游: http://8.155.160.129:8080/heilongjiang-travel-enhanced.html"
echo "东三省7天: http://8.155.160.129:8080/kmTravel.html"
