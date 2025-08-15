#!/bin/bash

# CentOS/RHEL服务器环境配置脚本
SERVER_IP="47.245.63.50"
SERVER_USER="root"
SERVER_PASSWORD="TEST-MJuNUz7cg2023"

echo "🔧 配置CentOS/RHEL服务器环境..."

# 更新系统
echo "📦 更新系统包..."
sshpass -p "$SERVER_PASSWORD" ssh -o StrictHostKeyChecking=no $SERVER_USER@$SERVER_IP "yum update -y"

# 安装EPEL仓库
echo "📚 安装EPEL仓库..."
sshpass -p "$SERVER_PASSWORD" ssh -o StrictHostKeyChecking=no $SERVER_USER@$SERVER_IP "yum install -y epel-release"

# 安装Nginx
echo "🌐 安装Nginx..."
sshpass -p "$SERVER_PASSWORD" ssh -o StrictHostKeyChecking=no $SERVER_USER@$SERVER_IP "yum install -y nginx"

# 安装rsync
echo "🔄 安装rsync..."
sshpass -p "$SERVER_PASSWORD" ssh -o StrictHostKeyChecking=no $SERVER_USER@$SERVER_IP "yum install -y rsync"

# 启动并启用Nginx
echo "🚀 启动Nginx服务..."
sshpass -p "$SERVER_PASSWORD" ssh -o StrictHostKeyChecking=no $SERVER_USER@$SERVER_IP "systemctl start nginx && systemctl enable nginx"

# 配置防火墙
echo "🔥 配置防火墙..."
sshpass -p "$SERVER_PASSWORD" ssh -o StrictHostKeyChecking=no $SERVER_USER@$SERVER_IP "firewall-cmd --permanent --add-service=http && firewall-cmd --permanent --add-service=https && firewall-cmd --reload"

echo "✅ CentOS/RHEL服务器环境配置完成！"

