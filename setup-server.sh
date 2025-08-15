#!/bin/bash

# 服务器环境配置脚本
SERVER_IP="47.245.63.50"
SERVER_USER="root"
SERVER_PASSWORD="TEST-MJuNUz7cg2023"

echo "🔧 配置服务器环境..."

# 更新系统
echo "📦 更新系统包..."
sshpass -p "$SERVER_PASSWORD" ssh -o StrictHostKeyChecking=no $SERVER_USER@$SERVER_IP "apt update && apt upgrade -y"

# 安装Nginx
echo "🌐 安装Nginx..."
sshpass -p "$SERVER_PASSWORD" ssh -o StrictHostKeyChecking=no $SERVER_USER@$SERVER_IP "apt install -y nginx"

# 安装sshpass（如果需要）
echo "🔑 安装sshpass..."
sshpass -p "$SERVER_PASSWORD" ssh -o StrictHostKeyChecking=no $SERVER_USER@$SERVER_IP "apt install -y sshpass"

# 启动并启用Nginx
echo "🚀 启动Nginx服务..."
sshpass -p "$SERVER_PASSWORD" ssh -o StrictHostKeyChecking=no $SERVER_USER@$SERVER_IP "systemctl start nginx && systemctl enable nginx"

# 配置防火墙
echo "🔥 配置防火墙..."
sshpass -p "$SERVER_PASSWORD" ssh -o StrictHostKeyChecking=no $SERVER_USER@$SERVER_IP "ufw allow 'Nginx Full' && ufw allow ssh && ufw --force enable"

echo "✅ 服务器环境配置完成！"

