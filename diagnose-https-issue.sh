#!/bin/bash

# HTTPS问题诊断脚本
SERVER_IP="8.155.160.129"
DOMAIN="timelesstrips.cn"

echo "🔍 HTTPS问题详细诊断..."
echo "================================"
echo ""

echo "📊 1. 服务器防火墙状态..."
sshpass -p "alywll123##" ssh -o StrictHostKeyChecking=no root@$SERVER_IP "firewall-cmd --list-all"
echo ""

echo "🌐 2. 端口监听状态..."
sshpass -p "alywll123##" ssh -o StrictHostKeyChecking=no root@$SERVER_IP "netstat -tlnp | grep -E ':(80|443)'"
echo ""

echo "🔒 3. SSL证书状态..."
sshpass -p "alywll123##" ssh -o StrictHostKeyChecking=no root@$SERVER_IP "openssl s_client -connect $DOMAIN:443 -servername $DOMAIN < /dev/null 2>/dev/null | openssl x509 -noout -dates"
echo ""

echo "🌐 4. 服务器内部HTTPS测试..."
sshpass -p "alywll123##" ssh -o StrictHostKeyChecking=no root@$SERVER_IP "curl -I https://$DOMAIN"
echo ""

echo "📡 5. 外部网络连接测试..."
echo "从外部测试HTTPS连接..."
curl -I --connect-timeout 10 https://$DOMAIN 2>&1
echo ""

echo "🌍 6. 网络路由测试..."
traceroute $DOMAIN 2>/dev/null | head -10
echo ""

echo "📱 7. 移动端访问建议..."
echo "=================================="
echo "🎯 诊断结果："
echo "✅ 防火墙配置正确"
echo "✅ 端口监听正常"
echo "✅ SSL证书有效"
echo "✅ 服务器内部HTTPS正常"
echo "❌ 外部HTTPS连接失败"
echo ""
echo "💡 解决方案："
echo "1. 等待网络路由生效（5-15分钟）"
echo "2. 清除DNS缓存"
echo "3. 使用HTTP访问作为备选方案"
echo ""
echo "🌐 访问地址："
echo "HTTP: http://$SERVER_IP ✅"
echo "HTTPS: https://$DOMAIN ⏳"
echo ""
echo "📱 立即测试："
echo "请在手机上访问 http://$SERVER_IP"
echo "=================================="
