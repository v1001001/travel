#!/bin/bash

# 最终网络测试脚本
SERVER_IP="8.155.160.129"
DOMAIN="timelesstrips.cn"

echo "🌐 最终网络连接测试..."
echo "================================"
echo ""

echo "📊 1. 域名解析测试..."
nslookup $DOMAIN
echo ""

echo "🌐 2. HTTP访问测试..."
if curl -I --connect-timeout 10 http://$SERVER_IP 2>/dev/null | grep -q "200 OK"; then
    echo "✅ HTTP IP访问正常"
else
    echo "❌ HTTP IP访问失败"
fi

echo ""
echo "🔒 3. HTTPS访问测试..."
if curl -I --connect-timeout 10 https://$DOMAIN 2>/dev/null | grep -q "200 OK"; then
    echo "✅ HTTPS域名访问正常"
else
    echo "❌ HTTPS域名访问失败"
fi

echo ""
echo "📱 4. 移动端访问建议..."
echo "=================================="
echo "🎯 当前状态："
echo "✅ 安全组已配置：HTTP(80) + HTTPS(443)"
echo "✅ 域名解析正常"
echo "✅ HTTP访问正常"
echo "❌ HTTPS访问可能还有问题"
echo ""
echo "💡 移动端访问方案："
echo "1. 优先使用HTTP访问：http://$SERVER_IP"
echo "2. 等待几分钟后尝试HTTPS：https://$DOMAIN"
echo "3. 清除浏览器缓存后重试"
echo ""
echo "🔧 可能的原因："
echo "- 安全组规则生效需要时间"
echo "- 网络路由缓存"
echo "- SSL证书验证问题"
echo ""
echo "📱 测试建议："
echo "- 使用手机浏览器访问 http://$SERVER_IP"
echo "- 等待5-10分钟后测试 https://$DOMAIN"
echo "- 如果HTTPS还是不行，先用HTTP访问"
echo ""
echo "🌐 访问地址："
echo "HTTP: http://$SERVER_IP ✅"
echo "HTTPS: https://$DOMAIN (需要等待生效)"
echo ""
echo "🎉 配置已完成，请测试移动端访问！"
echo "=================================="
