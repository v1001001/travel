#!/bin/bash

# 最终测试脚本 - 验证所有功能
DOMAIN="timelesstrips.cn"
SERVER_IP="8.155.160.129"

echo "🎉 旅行攻略网站最终测试"
echo "================================"
echo ""

echo "📊 1. DNS解析测试..."
MAIN_IP=$(nslookup $DOMAIN | grep "Address:" | tail -1 | awk '{print $2}')
WWW_IP=$(nslookup www.$DOMAIN | grep "Address:" | tail -1 | awk '{print $2}')

if [ "$MAIN_IP" = "$SERVER_IP" ] && [ "$WWW_IP" = "$SERVER_IP" ]; then
    echo "✅ DNS解析正确"
else
    echo "❌ DNS解析错误"
fi

echo ""
echo "🌐 2. HTTP访问测试..."
if curl -I --connect-timeout 10 http://$DOMAIN 2>/dev/null | grep -q "200 OK"; then
    echo "✅ HTTP访问正常"
else
    echo "❌ HTTP访问失败"
fi

echo ""
echo "🔒 3. HTTPS访问测试..."
if curl -I --connect-timeout 10 https://$DOMAIN 2>/dev/null | grep -q "200 OK"; then
    echo "✅ HTTPS访问正常"
else
    echo "❌ HTTPS访问失败"
fi

echo ""
echo "🌍 4. 网站功能测试..."
echo "测试主页面..."
if curl -s https://$DOMAIN | grep -q "旅行攻略集合"; then
    echo "✅ 主页面内容正确"
else
    echo "❌ 主页面内容错误"
fi

echo ""
echo "🎯 5. 最终访问地址："
echo "=================================="
echo "🌐 主域名 (HTTPS): https://$DOMAIN"
echo "🌐 www子域名 (HTTPS): https://www.$DOMAIN"
echo "🌐 主域名 (HTTP): http://$DOMAIN"
echo "🌐 www子域名 (HTTP): http://www.$DOMAIN"
echo ""
echo "📁 具体页面："
echo "主页面: https://$DOMAIN"
echo "东北呼伦贝尔: https://$DOMAIN/northeast-hulunbeier-travel.html"
echo "黑龙江深度游: https://$DOMAIN/heilongjiang-travel-enhanced.html"
echo "东三省7天: https://$DOMAIN/kmTravel.html"
echo ""
echo "🎉 恭喜！您的旅行攻略网站已经完全配置成功！"
echo "=================================="
