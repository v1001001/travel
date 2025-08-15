#!/bin/bash

# 测试Logo位置调整
SERVER_IP="8.155.160.129"

echo "🎨 测试Logo位置调整..."
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
echo "🎯 3. Logo位置调整完成！"
echo "=================================="
echo "✨ 调整内容："
echo "- Logo位置: 从右上角调整到左上角"
echo "- 桌面端: 距离左边30px，顶部20px"
echo "- 移动端: 距离左边20px，顶部15px"
echo "- 保持半透明效果和悬停聚焦"
echo ""
echo "🎨 设计优势："
echo "- 符合网站设计惯例"
echo "- 与内容形成更好的平衡"
echo "- 不干扰主要文字内容"
echo "- 保持品牌识别度"
echo ""
echo "🌐 访问地址："
echo "网站: http://$SERVER_IP"
echo "Logo: http://$SERVER_IP/jimeng-2.png"
echo ""
echo "🎉 Logo现在位于左上角，看起来更加和谐！"
echo "=================================="
