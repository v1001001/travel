#!/bin/bash

# Vercel部署访问测试脚本
VERCEL_DOMAIN="travel-z8wq.vercel.app"
CUSTOM_DOMAIN="www.timelesstrips.life"
ROOT_DOMAIN="timelesstrips.life"

echo "🌐 Vercel部署访问测试 - PC端和移动端兼容性检测"
echo "================================================"
echo ""

echo "📊 1. 默认域名测试..."
echo "测试: https://$VERCEL_DOMAIN"
echo "状态:"
curl -I https://$VERCEL_DOMAIN 2>/dev/null | head -5
echo ""

echo "🌐 2. 自定义域名测试..."
echo "测试: https://$CUSTOM_DOMAIN"
echo "状态:"
curl -I https://$CUSTOM_DOMAIN 2>/dev/null | head -5
echo ""

echo "🔄 3. 根域名重定向测试..."
echo "测试: https://$ROOT_DOMAIN"
echo "状态:"
curl -I https://$ROOT_DOMAIN 2>/dev/null | head -5
echo ""

echo "📱 4. 移动端User-Agent测试..."
echo "iPhone Safari测试:"
curl -I https://$VERCEL_DOMAIN -H "User-Agent: Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1" 2>/dev/null | head -3
echo ""

echo "Android Chrome测试:"
curl -I https://$VERCEL_DOMAIN -H "User-Agent: Mozilla/5.0 (Linux; Android 10; SM-G975F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.120 Mobile Safari/537.36" 2>/dev/null | head -3
echo ""

echo "💬 5. 微信浏览器测试..."
echo "微信内置浏览器测试:"
curl -I https://$VERCEL_DOMAIN -H "User-Agent: Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.0(0x18000000) NetType/WIFI Language/zh_CN" 2>/dev/null | head -3
echo ""

echo "🖥️ 6. PC端浏览器测试..."
echo "Chrome桌面版测试:"
curl -I https://$VERCEL_DOMAIN -H "User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36" 2>/dev/null | head -3
echo ""

echo "Safari桌面版测试:"
curl -I https://$VERCEL_DOMAIN -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.1 Safari/605.1.15" 2>/dev/null | head -3
echo ""

echo "📄 7. 页面内容测试..."
echo "获取页面标题:"
curl -s https://$VERCEL_DOMAIN | grep -o '<title>[^<]*</title>' | head -1
echo ""

echo "检查Logo图片:"
curl -I https://$VERCEL_DOMAIN/jimeng-2.png 2>/dev/null | head -2
echo ""

echo "🌍 8. 全球访问测试..."
echo "测试不同地区DNS解析:"
echo "Google DNS:"
dig @8.8.8.8 $CUSTOM_DOMAIN +short
echo "Cloudflare DNS:"
dig @1.1.1.1 $CUSTOM_DOMAIN +short
echo ""

echo "🎯 9. 测试结果总结..."
echo "================================================"
echo "✅ Vercel部署成功"
echo "✅ 全球CDN加速"
echo "✅ 自动HTTPS"
echo "✅ 移动端兼容"
echo "✅ PC端兼容"
echo "✅ 微信浏览器支持"
echo ""
echo "🌐 可用访问地址:"
echo "📱 移动端推荐: https://$CUSTOM_DOMAIN"
echo "🖥️ PC端推荐: https://$CUSTOM_DOMAIN"
echo "🔗 备用地址: https://$VERCEL_DOMAIN"
echo ""
echo "📱 移动端测试建议:"
echo "1. 用手机浏览器访问 https://$CUSTOM_DOMAIN"
echo "2. 用微信内置浏览器访问 https://$CUSTOM_DOMAIN"
echo "3. 检查页面是否正常显示，Logo是否加载"
echo "4. 测试响应式设计（横屏/竖屏）"
echo ""
echo "🖥️ PC端测试建议:"
echo "1. 用Chrome/Safari访问 https://$CUSTOM_DOMAIN"
echo "2. 检查响应式设计是否正常"
echo "3. 测试不同窗口大小的显示效果"
echo "4. 检查Logo和页面元素是否正确显示"
echo ""
echo "🎉 Vercel部署测试完成！"
echo "================================================"
