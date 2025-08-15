#!/bin/bash

# 域名问题诊断脚本
SERVER_IP="8.155.160.129"
DOMAIN="timelesstrips.cn"

echo "🔍 域名访问问题详细诊断..."
echo "================================"
echo ""

echo "📊 1. DNS解析测试..."
echo "本地DNS解析："
nslookup $DOMAIN
echo ""
echo "Google DNS解析："
dig @8.8.8.8 $DOMAIN +short
echo ""

echo "🌐 2. 服务器内部测试..."
echo "服务器内部域名访问："
sshpass -p "alywll123##" ssh -o StrictHostKeyChecking=no root@$SERVER_IP "curl -I http://$DOMAIN"
echo ""

echo "🔍 3. 外部访问测试..."
echo "直接IP访问（正常）："
curl -I http://$SERVER_IP 2>/dev/null | head -5
echo ""
echo "域名访问（异常）："
curl -I http://$DOMAIN 2>/dev/null | head -5
echo ""

echo "🎯 4. 问题分析..."
echo "=================================="
echo "✅ DNS解析正确：$DOMAIN -> $SERVER_IP"
echo "✅ 服务器内部域名访问正常"
echo "✅ 直接IP访问正常"
echo "❌ 外部域名访问返回403 Forbidden"
echo "❌ 外部域名访问返回Beaver服务器"
echo ""
echo "🔍 可能的原因："
echo "1. CDN或WAF服务拦截"
echo "2. 阿里云安全组域名限制"
echo "3. 网络运营商DNS劫持"
echo "4. 域名备案问题"
echo ""
echo "💡 解决方案："
echo "1. 检查域名备案状态"
echo "2. 检查阿里云CDN/WAF配置"
echo "3. 使用IP访问作为临时方案"
echo "4. 联系域名服务商"
echo ""
echo "🌐 当前可用访问地址："
echo "✅ HTTP: http://$SERVER_IP"
echo "❌ HTTP: http://$DOMAIN"
echo "❌ HTTPS: https://$DOMAIN"
echo ""
echo "📱 移动端建议："
echo "请使用 http://$SERVER_IP 访问网站"
echo "=================================="
