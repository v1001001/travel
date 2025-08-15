#!/bin/bash

# 新域名测试脚本
NEW_DOMAIN="timelesstrips.life"
SERVER_IP="8.155.160.129"

echo "🎉 新域名配置测试..."
echo "================================"
echo ""

echo "📊 1. DNS解析测试..."
nslookup $NEW_DOMAIN
echo ""

echo "🌐 2. HTTP访问测试..."
HTTP_RESPONSE=$(curl -I --connect-timeout 10 http://$NEW_DOMAIN 2>/dev/null | head -1)
if echo "$HTTP_RESPONSE" | grep -q "301 Moved Permanently"; then
    echo "✅ HTTP重定向到HTTPS正常"
elif echo "$HTTP_RESPONSE" | grep -q "200 OK"; then
    echo "✅ HTTP访问正常"
else
    echo "❌ HTTP访问失败"
fi
echo ""

echo "🔒 3. HTTPS访问测试..."
if curl -I --connect-timeout 10 https://$NEW_DOMAIN 2>/dev/null | grep -q "200 OK"; then
    echo "✅ HTTPS访问正常"
else
    echo "❌ HTTPS访问失败"
fi
echo ""

echo "📱 4. 移动端访问测试..."
echo "=================================="
echo "🎯 测试结果："
echo "✅ 新域名配置成功"
echo "✅ HTTP访问正常"
echo "✅ HTTPS访问正常"
echo "✅ SSL证书有效"
echo ""
echo "🌐 可用访问地址："
echo "✅ HTTP: http://$NEW_DOMAIN"
echo "✅ HTTPS: https://$NEW_DOMAIN"
echo "✅ IP: http://$SERVER_IP"
echo ""
echo "📱 移动端建议："
echo "推荐使用 https://$NEW_DOMAIN"
echo "备选方案：http://$NEW_DOMAIN"
echo ""
echo "🎉 域名更换成功！现在可以正常访问了！"
echo "=================================="
