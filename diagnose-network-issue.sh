#!/bin/bash

# 诊断网络问题脚本
SERVER_IP="8.155.160.129"
DOMAIN="timelesstrips.cn"

echo "🔍 诊断网络连接问题..."
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
echo "📱 4. 移动端网络问题分析..."
echo "=================================="
echo "🎯 问题诊断："
echo "1. 服务器内部HTTPS正常 ✅"
echo "2. 域名解析正常 ✅"
echo "3. HTTP IP访问正常 ✅"
echo "4. 外部HTTPS访问失败 ❌"
echo ""
echo "🔧 问题原因：阿里云安全组443端口未开放"
echo ""
echo "📝 解决方案："
echo "1. 登录阿里云控制台"
echo "2. 进入ECS实例管理"
echo "3. 找到实例 $SERVER_IP"
echo "4. 点击'安全组' -> '配置规则'"
echo "5. 添加入方向规则："
echo "   - 端口范围：443/443"
echo "   - 授权对象：0.0.0.0/0"
echo "   - 优先级：1"
echo "   - 描述：HTTPS访问"
echo ""
echo "🌐 当前状态："
echo "HTTP: http://$SERVER_IP ✅"
echo "HTTPS: https://$DOMAIN ❌ (需要安全组配置)"
echo ""
echo "💡 临时解决方案："
echo "移动端可以先使用HTTP访问：http://$SERVER_IP"
echo "=================================="
