#!/bin/bash

echo "🌐 网站功能全面测试"
echo "=================="
echo ""

# 测试域名
DOMAINS=("https://www.timelesstrips.cn" "https://www.timelesstrips.life")

for domain in "${DOMAINS[@]}"; do
    echo "🔍 测试域名: $domain"
    echo "----------------------------------------"
    
    # 测试主页访问
    echo "📄 测试主页访问..."
    if curl -s -o /dev/null -w "%{http_code}" "$domain" | grep -q "200"; then
        echo "✅ 主页访问正常 (HTTP 200)"
    else
        echo "❌ 主页访问失败"
    fi
    
    # 测试HTTPS
    echo "🔒 测试HTTPS连接..."
    if curl -s -I "$domain" | grep -q "https"; then
        echo "✅ HTTPS连接正常"
    else
        echo "❌ HTTPS连接异常"
    fi
    
    # 测试页面内容
    echo "📝 测试页面内容..."
    if curl -s "$domain" | grep -q "Timeless Trips"; then
        echo "✅ 页面标题正常"
    else
        echo "❌ 页面标题异常"
    fi
    
    # 测试Logo加载
    echo "🖼️ 测试Logo加载..."
    if curl -s -o /dev/null -w "%{http_code}" "$domain/images/jimeng-2.png" | grep -q "200"; then
        echo "✅ Logo加载正常"
    else
        echo "❌ Logo加载失败"
    fi
    
    # 测试行程页面链接
    echo "🗺️ 测试行程页面链接..."
    
    # 测试第一个行程页面
    if curl -s -o /dev/null -w "%{http_code}" "$domain/northeast-hulunbeier-travel.html" | grep -q "200"; then
        echo "✅ 东北+呼伦贝尔精华环线页面正常"
    else
        echo "❌ 东北+呼伦贝尔精华环线页面异常"
    fi
    
    # 测试第二个行程页面
    if curl -s -o /dev/null -w "%{http_code}" "$domain/dongbei-hulunbeier-loop.html" | grep -q "200"; then
        echo "✅ 东三省环线+呼伦贝尔环线页面正常"
    else
        echo "❌ 东三省环线+呼伦贝尔环线页面异常"
    fi
    
    # 测试移动端兼容性
    echo "📱 测试移动端兼容性..."
    USER_AGENT="Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15"
    if curl -s -H "User-Agent: $USER_AGENT" "$domain" | grep -q "viewport"; then
        echo "✅ 移动端viewport设置正常"
    else
        echo "❌ 移动端viewport设置异常"
    fi
    
    # 测试响应头
    echo "📋 测试响应头..."
    HEADERS=$(curl -s -I "$domain")
    if echo "$HEADERS" | grep -q "x-frame-options: ALLOWALL"; then
        echo "✅ X-Frame-Options设置正常"
    else
        echo "❌ X-Frame-Options设置异常"
    fi
    
    if echo "$HEADERS" | grep -q "cache-control: no-cache"; then
        echo "✅ Cache-Control设置正常"
    else
        echo "❌ Cache-Control设置异常"
    fi
    
    echo ""
done

# 测试本地文件完整性
echo "🔧 测试本地文件完整性"
echo "----------------------------------------"

# 检查核心文件是否存在
FILES=("index.html" "dongbei-hulunbeier-loop.html" "northeast-hulunbeier-travel.html" "vercel.json" "README.md")

for file in "${FILES[@]}"; do
    if [ -f "$file" ]; then
        echo "✅ $file 存在"
    else
        echo "❌ $file 缺失"
    fi
done

# 检查图片资源
echo ""
echo "🖼️ 检查图片资源..."
if [ -f "images/jimeng-2.png" ]; then
    echo "✅ Logo文件存在"
else
    echo "❌ Logo文件缺失"
fi

# 检查视频资源
echo ""
echo "🎥 检查视频资源..."
if [ -f "videos/831_1755086568.mp4" ]; then
    echo "✅ 视频文件存在"
else
    echo "❌ 视频文件缺失"
fi

# 测试页面内容完整性
echo ""
echo "📄 测试页面内容完整性"
echo "----------------------------------------"

# 检查主页是否包含两个行程卡片
if grep -q "东北+呼伦贝尔精华环线" index.html; then
    echo "✅ 主页包含第一个行程卡片"
else
    echo "❌ 主页缺少第一个行程卡片"
fi

if grep -q "东三省环线+呼伦贝尔环线" index.html; then
    echo "✅ 主页包含第二个行程卡片"
else
    echo "❌ 主页缺少第二个行程卡片"
fi

# 检查统计信息
if grep -q "精选路线" index.html; then
    echo "✅ 主页包含统计信息"
else
    echo "❌ 主页缺少统计信息"
fi

# 检查Logo引用
if grep -q "images/jimeng-2.png" index.html; then
    echo "✅ Logo路径正确"
else
    echo "❌ Logo路径错误"
fi

echo ""
echo "🎉 测试完成！"
echo "=================="
