#!/bin/bash

# 简化部署脚本
SERVER_IP="47.245.63.50"
SERVER_USER="root"
SERVER_PASSWORD="TEST-MJuNUz7cg2023"
REMOTE_DIR="/var/www/travel"

echo "🚀 开始部署旅行攻略项目..."

# 检查sshpass是否安装
if ! command -v sshpass &> /dev/null; then
    echo "❌ sshpass未安装，请先运行: brew install sshpass (macOS) 或 sudo apt install sshpass (Ubuntu)"
    exit 1
fi

# 创建远程目录
echo "📁 创建远程目录..."
sshpass -p "$SERVER_PASSWORD" ssh -o StrictHostKeyChecking=no $SERVER_USER@$SERVER_IP "mkdir -p $REMOTE_DIR"

# 上传文件（排除部署脚本）
echo "📤 上传项目文件..."
sshpass -p "$SERVER_PASSWORD" rsync -avz --exclude='*.sh' --exclude='.git' ./ $SERVER_USER@$SERVER_IP:$REMOTE_DIR/

# 设置权限
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

    location ~* \.(css|js|png|jpg|jpeg|gif|ico|svg|mp4)$ {
        expires 1y;
        add_header Cache-Control \"public, immutable\";
    }
}
EOF"

# 启用站点
echo "✅ 启用Nginx站点..."
sshpass -p "$SERVER_PASSWORD" ssh -o StrictHostKeyChecking=no $SERVER_USER@$SERVER_IP "ln -sf /etc/nginx/sites-available/travel /etc/nginx/sites-enabled/ && rm -f /etc/nginx/sites-enabled/default"

# 重启Nginx
echo "🔄 重启Nginx..."
sshpass -p "$SERVER_PASSWORD" ssh -o StrictHostKeyChecking=no $SERVER_USER@$SERVER_IP "systemctl restart nginx"

echo "🎉 部署完成！"
echo "🌐 网站地址: http://47.245.63.50"
echo "📱 主页面: http://47.245.63.50/index.html"

