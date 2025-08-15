#!/bin/bash

# 旅行攻略项目部署脚本
# 服务器信息
SERVER_IP="47.245.63.50"
SERVER_USER="root"
SERVER_PASSWORD="TEST-MJuNUz7cg2023"
REMOTE_DIR="/var/www/travel"

echo "🚀 开始部署旅行攻略项目到服务器..."

# 创建远程目录
echo "📁 创建远程目录..."
sshpass -p "$SERVER_PASSWORD" ssh -o StrictHostKeyChecking=no $SERVER_USER@$SERVER_IP "mkdir -p $REMOTE_DIR"

# 上传项目文件
echo "📤 上传项目文件..."
sshpass -p "$SERVER_PASSWORD" scp -o StrictHostKeyChecking=no -r ./* $SERVER_USER@$SERVER_IP:$REMOTE_DIR/

# 设置文件权限
echo "🔐 设置文件权限..."
sshpass -p "$SERVER_PASSWORD" ssh -o StrictHostKeyChecking=no $SERVER_USER@$SERVER_IP "chmod -R 755 $REMOTE_DIR"

# 配置Nginx
echo "🌐 配置Nginx..."
sshpass -p "$SERVER_PASSWORD" ssh -o StrictHostKeyChecking=no $SERVER_USER@$SERVER_IP "cat > /etc/nginx/sites-available/travel << 'EOF'
server {
    listen 80;
    server_name 47.245.63.50;
    root $REMOTE_DIR;
    index index.html;

    location / {
        try_files \$uri \$uri/ =404;
    }

    # 静态文件缓存
    location ~* \.(css|js|png|jpg|jpeg|gif|ico|svg|mp4)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # 安全头
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
}
EOF"

# 启用站点
echo "✅ 启用Nginx站点..."
sshpass -p "$SERVER_PASSWORD" ssh -o StrictHostKeyChecking=no $SERVER_USER@$SERVER_IP "ln -sf /etc/nginx/sites-available/travel /etc/nginx/sites-enabled/ && rm -f /etc/nginx/sites-enabled/default"

# 测试Nginx配置
echo "🔍 测试Nginx配置..."
sshpass -p "$SERVER_PASSWORD" ssh -o StrictHostKeyChecking=no $SERVER_USER@$SERVER_IP "nginx -t"

# 重启Nginx
echo "🔄 重启Nginx服务..."
sshpass -p "$SERVER_PASSWORD" ssh -o StrictHostKeyChecking=no $SERVER_USER@$SERVER_IP "systemctl restart nginx"

# 检查服务状态
echo "📊 检查服务状态..."
sshpass -p "$SERVER_PASSWORD" ssh -o StrictHostKeyChecking=no $SERVER_USER@$SERVER_IP "systemctl status nginx --no-pager"

echo "🎉 部署完成！"
echo "🌐 网站地址: http://47.245.63.50"
echo "📱 主页面: http://47.245.63.50/index.html"
echo "🗺️ 东北呼伦贝尔: http://47.245.63.50/northeast-hulunbeier-travel.html"
echo "🌊 黑龙江深度游: http://47.245.63.50/heilongjiang-travel-enhanced.html"
echo "⚡ 东三省7天: http://47.245.63.50/kmTravel.html"

