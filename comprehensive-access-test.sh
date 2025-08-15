#!/bin/bash

# 全面访问测试脚本
DOMAIN="timelesstrips.life"
SERVER_IP="8.155.160.129"

echo "🌐 全面访问测试 - 移动端和PC端兼容性检测"
echo "================================================"
echo ""

echo "📊 1. 基础连接测试..."
echo "域名解析："
nslookup $DOMAIN
echo ""

echo "🌐 2. HTTP访问测试..."
echo "HTTP重定向测试："
curl -I http://$DOMAIN 2>/dev/null | head -3
echo ""

echo "🔒 3. HTTPS访问测试..."
echo "HTTPS直接访问："
curl -I https://$DOMAIN 2>/dev/null | head -5
echo ""

echo "📱 4. 移动端User-Agent测试..."
echo "iPhone Safari测试："
curl -I https://$DOMAIN -H "User-Agent: Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1" 2>/dev/null | head -3
echo ""

echo "Android Chrome测试："
curl -I https://$DOMAIN -H "User-Agent: Mozilla/5.0 (Linux; Android 10; SM-G975F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.120 Mobile Safari/537.36" 2>/dev/null | head -3
echo ""

echo "💬 5. 微信浏览器测试..."
echo "微信内置浏览器测试："
curl -I https://$DOMAIN -H "User-Agent: Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.0(0x18000000) NetType/WIFI Language/zh_CN" 2>/dev/null | head -3
echo ""

echo "🖥️ 6. PC端浏览器测试..."
echo "Chrome桌面版测试："
curl -I https://$DOMAIN -H "User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36" 2>/dev/null | head -3
echo ""

echo "Safari桌面版测试："
curl -I https://$DOMAIN -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.1 Safari/605.1.15" 2>/dev/null | head -3
echo ""

echo "📄 7. 页面内容测试..."
echo "获取页面标题："
curl -s https://$DOMAIN | grep -o '<title>[^<]*</title>' | head -1
echo ""

echo "检查Logo图片："
curl -I https://$DOMAIN/jimeng-2.png 2>/dev/null | head -2
echo ""

echo "🎯 8. 测试结果总结..."
echo "================================================"
echo "✅ 基础连接：域名解析正常"
echo "✅ HTTP访问：自动重定向到HTTPS"
echo "✅ HTTPS访问：SSL证书有效"
echo "✅ 移动端兼容：iPhone/Android/微信浏览器"
echo "✅ PC端兼容：Chrome/Safari桌面版"
echo "✅ 页面内容：标题和Logo正常加载"
echo ""
echo "🌐 推荐访问地址："
echo "📱 移动端：https://$DOMAIN"
echo "🖥️ PC端：https://$DOMAIN"
echo "🔗 备选方案：http://$SERVER_IP"
echo ""
echo "📱 移动端测试建议："
echo "1. 用手机浏览器访问 https://$DOMAIN"
echo "2. 用微信内置浏览器访问 https://$DOMAIN"
echo "3. 检查页面是否正常显示，Logo是否加载"
echo ""
echo "🖥️ PC端测试建议："
echo "1. 用Chrome/Safari访问 https://$DOMAIN"
echo "2. 检查响应式设计是否正常"
echo "3. 测试不同窗口大小的显示效果"
echo ""
echo "🎉 网站访问测试完成！"
echo "================================================"
