#!/bin/bash

# 测试阿里云安全组配置
SERVER_IP="8.155.160.129"

echo "🔍 测试阿里云安全组配置..."
echo "服务器IP: $SERVER_IP"
echo ""

echo "📊 测试80端口连接..."
if curl -I --connect-timeout 10 http://$SERVER_IP 2>/dev/null | head -1; then
    echo "✅ 80端口访问正常！"
else
    echo "❌ 80端口无法访问，请检查阿里云安全组配置"
fi

echo ""
echo "📊 测试443端口连接..."
if curl -I --connect-timeout 10 https://$SERVER_IP 2>/dev/null | head -1; then
    echo "✅ 443端口访问正常！"
else
    echo "⚠️  443端口无法访问（正常，因为还没有SSL证书）"
fi

echo ""
echo "📝 阿里云安全组配置检查清单："
echo "1. 登录阿里云控制台"
echo "2. 进入ECS实例管理"
echo "3. 找到实例 $SERVER_IP"
echo "4. 点击'安全组' -> '配置规则'"
echo "5. 添加入方向规则："
echo "   - 端口范围：80/80"
echo "   - 授权对象：0.0.0.0/0"
echo "   - 优先级：1"
echo "   - 描述：HTTP访问"
echo ""
echo "🌐 配置完成后，您应该能够访问："
echo "http://$SERVER_IP"
echo "http://$SERVER_IP/index.html"
