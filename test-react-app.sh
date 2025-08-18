#!/bin/bash

echo "🧪 测试React应用..."

# 检查开发服务器是否运行
if curl -s http://127.0.0.1:5173 > /dev/null; then
    echo "✅ 开发服务器运行正常"
else
    echo "❌ 开发服务器未运行"
    exit 1
fi

# 检查页面内容
echo "📄 检查页面内容..."
if curl -s http://127.0.0.1:5173 | grep -q "金秋弧线"; then
    echo "✅ 页面标题正确"
else
    echo "❌ 页面标题不正确"
fi

# 检查React组件
if curl -s http://127.0.0.1:5173 | grep -q "react-refresh"; then
    echo "✅ React组件加载正常"
else
    echo "❌ React组件加载异常"
fi

echo "🎉 测试完成！"
echo "🌐 访问地址: http://127.0.0.1:5173"


