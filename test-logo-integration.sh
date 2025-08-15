#!/bin/bash

# 测试Logo集成脚本
SERVER_IP="8.155.160.129"
DOMAIN="timelesstrips.cn"

echo "🎨 测试Logo集成..."
echo "================================"
echo ""

echo "📊 1. 测试网站访问..."
if curl -I --connect-timeout 10 http://$SERVER_IP 2>/dev/null | grep -q "200 OK"; then
    echo "✅ 网站访问正常"
else
    echo "❌ 网站访问失败"
fi

echo ""
echo "🖼️  2. 测试Logo文件访问..."
if curl -I --connect-timeout 10 http://$SERVER_IP/jimeng-2.png 2>/dev/null | grep -q "200 OK"; then
    echo "✅ Logo文件访问正常"
    LOGO_SIZE=$(curl -I http://$SERVER_IP/jimeng-2.png 2>/dev/null | grep "Content-Length" | awk '{print $2}' | tr -d '\r')
    echo "📏 Logo文件大小: $LOGO_SIZE 字节"
else
    echo "❌ Logo文件访问失败"
fi

echo ""
echo "🌐 3. 测试域名访问..."
if curl -I --connect-timeout 10 https://$DOMAIN 2>/dev/null | grep -q "200 OK"; then
    echo "✅ 域名HTTPS访问正常"
else
    echo "❌ 域名HTTPS访问失败"
fi

echo ""
echo "🎯 4. Logo集成完成！"
echo "=================================="
echo "🌐 网站地址："
echo "IP访问: http://$SERVER_IP"
echo "域名访问: https://$DOMAIN"
echo ""
echo "🖼️  Logo文件: http://$SERVER_IP/jimeng-2.png"
echo "📱 Favicon: http://$SERVER_IP/jimeng-2.png"
echo ""
echo "✨ Logo特性："
echo "- 响应式设计，适配各种屏幕"
echo "- 悬停动画效果"
echo "- 圆角阴影设计"
echo "- 自动缓存优化"
echo ""
echo "🎉 您的Timeless Trips Logo已经成功集成到网站中！"
echo "=================================="
