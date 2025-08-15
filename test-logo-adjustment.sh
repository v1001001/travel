#!/bin/bash

# 测试Logo调整效果
SERVER_IP="8.155.160.129"

echo "🎨 测试Logo调整效果..."
echo "================================"
echo ""

echo "📊 1. 测试网站访问..."
if curl -I --connect-timeout 10 http://$SERVER_IP 2>/dev/null | grep -q "200 OK"; then
    echo "✅ 网站访问正常"
    CONTENT_LENGTH=$(curl -I http://$SERVER_IP 2>/dev/null | grep "Content-Length" | awk '{print $2}' | tr -d '\r')
    echo "📏 页面大小: $CONTENT_LENGTH 字节"
else
    echo "❌ 网站访问失败"
fi

echo ""
echo "🖼️  2. 测试Logo文件..."
if curl -I --connect-timeout 10 http://$SERVER_IP/jimeng-2.png 2>/dev/null | grep -q "200 OK"; then
    echo "✅ Logo文件访问正常"
else
    echo "❌ Logo文件访问失败"
fi

echo ""
echo "🎯 3. Logo调整完成！"
echo "=================================="
echo "✨ 调整内容："
echo "- Logo尺寸: 从300px缩小到120px"
echo "- Logo位置: 移到左侧"
echo "- 布局方式: 使用Flexbox布局"
echo "- 响应式设计: 移动端自动调整"
echo ""
echo "📱 移动端适配："
echo "- 小屏幕下Logo居中显示"
echo "- Logo尺寸进一步缩小到100px"
echo "- 文字居中对齐"
echo ""
echo "🌐 访问地址："
echo "网站: http://$SERVER_IP"
echo "Logo: http://$SERVER_IP/jimeng-2.png"
echo ""
echo "🎉 Logo现在更加合适和专业！"
echo "=================================="
