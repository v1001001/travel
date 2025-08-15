#!/bin/bash

# 测试DNS解析脚本
DOMAIN="timelesstrips.cn"
EXPECTED_IP="8.155.160.129"

echo "🔍 测试域名DNS解析..."
echo "域名: $DOMAIN"
echo "期望IP: $EXPECTED_IP"
echo ""

echo "📊 测试主域名解析..."
MAIN_IP=$(nslookup $DOMAIN | grep "Address:" | tail -1 | awk '{print $2}')
echo "解析结果: $MAIN_IP"

if [ "$MAIN_IP" = "$EXPECTED_IP" ]; then
    echo "✅ 主域名解析正确！"
else
    echo "❌ 主域名解析错误，期望: $EXPECTED_IP，实际: $MAIN_IP"
fi

echo ""
echo "📊 测试www子域名解析..."
WWW_IP=$(nslookup www.$DOMAIN | grep "Address:" | tail -1 | awk '{print $2}')
echo "解析结果: $WWW_IP"

if [ "$WWW_IP" = "$EXPECTED_IP" ]; then
    echo "✅ www子域名解析正确！"
else
    echo "❌ www子域名解析错误，期望: $EXPECTED_IP，实际: $WWW_IP"
fi

echo ""
echo "🌐 测试网站访问..."
echo "主域名: http://$DOMAIN"
echo "www子域名: http://www.$DOMAIN"
echo ""
echo "📝 如果解析正确，您应该能够访问："
echo "https://$DOMAIN (需要SSL证书)"
echo "https://www.$DOMAIN (需要SSL证书)"
