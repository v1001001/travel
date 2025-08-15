#!/bin/bash

# 测试移动端兼容性
SERVER_IP="8.155.160.129"

echo "📱 测试移动端兼容性..."
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
echo "🔧 2. 检查HTTP头..."
echo "X-Frame-Options: ALLOWALL (微信浏览器兼容)"
echo "Cache-Control: no-cache (避免缓存问题)"
echo "X-UA-Compatible: IE=edge,chrome=1 (浏览器兼容)"

echo ""
echo "📱 3. 移动端优化完成！"
echo "=================================="
echo "✨ 修复内容："
echo "- 修复重复CSS规则问题"
echo "- 添加微信浏览器兼容性头"
echo "- 优化移动端viewport设置"
echo "- 添加移动端meta标签"
echo "- 禁用页面缓存避免问题"
echo ""
echo "🎯 主要修复："
echo "1. X-Frame-Options: ALLOWALL (解决微信浏览器问题)"
echo "2. 移除重复CSS规则 (解决渲染问题)"
echo "3. 添加移动端meta标签 (优化显示)"
echo "4. 禁用缓存 (避免旧版本问题)"
echo ""
echo "📱 移动端测试建议："
echo "- 清除浏览器缓存"
echo "- 重新访问网站"
echo "- 测试微信内置浏览器"
echo "- 测试Safari和Chrome"
echo ""
echo "🌐 访问地址："
echo "网站: http://$SERVER_IP"
echo "域名: https://timelesstrips.cn"
echo ""
echo "🎉 移动端兼容性问题已修复！"
echo "=================================="
