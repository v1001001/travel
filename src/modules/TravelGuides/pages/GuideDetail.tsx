import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Calendar, DollarSign, Star, Lightbulb, ArrowUp } from 'lucide-react';
import { Guide } from '../../../types';
import guidesData from '../../../data/guides.json';

const GuideDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [guide, setGuide] = useState<Guide | null>(null);
    const [showScrollTop, setShowScrollTop] = useState(false);

    useEffect(() => {
        const foundGuide = guidesData.find(g => g.id === id);
        setGuide(foundGuide || null);
    }, [id]);

    useEffect(() => {
        const handleScroll = () => {
            setShowScrollTop(window.scrollY > 300);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    if (!guide) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-12 text-center">
                <div className="text-6xl mb-4">😵</div>
                <h1 className="text-2xl font-bold text-primary-600 mb-4">
                    攻略未找到
                </h1>
                <p className="text-primary-500 mb-6">
                    抱歉，您查找的攻略不存在或已被移除
                </p>
                <Link to="/guides" className="btn-primary">
                    返回攻略列表
                </Link>
            </div>
        );
    }

    const navigationItems = [
        { id: 'overview', label: '🗺️ 路线总览', icon: MapPin },
        { id: 'timeline', label: '📅 详细行程', icon: Calendar },
        { id: 'highlights', label: '🌟 行程亮点', icon: Star },
        { id: 'budget', label: '💰 预算估算', icon: DollarSign },
        { id: 'tips', label: '💡 实用贴士', icon: Lightbulb },
    ];

    return (
        <div className="min-h-screen" style={{ backgroundColor: '#FDFBF7', color: '#4A4A4A' }}>
            {/* 粘性导航栏 */}
            <nav className="sticky top-0 z-50" style={{
                background: 'rgba(243, 239, 231, 0.95)',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 2px 20px rgba(0,0,0,0.1)'
            }}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-center items-center gap-5 py-4">
                        {navigationItems.map(item => (
                            <button
                                key={item.id}
                                onClick={() => scrollToSection(item.id)}
                                className="px-5 py-3 rounded-full transition-all duration-300 text-gray-700 hover:bg-white hover:shadow-md font-medium"
                                style={{ color: '#594A3C' }}
                            >
                                {item.label}
                            </button>
                        ))}
                    </div>
                </div>
            </nav>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* 返回按钮 */}
                <Link
                    to="/guides"
                    className="inline-flex items-center gap-2 mb-6 transition-colors"
                    style={{ color: '#BC5A45' }}
                >
                    ← 返回攻略列表
                </Link>

                {/* 头部区域 */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-10 p-10 rounded-3xl shadow-lg"
                    style={{
                        background: 'linear-gradient(135deg, #F3EFE7 0%, #E9E4D9 100%)',
                        color: '#594A3C'
                    }}
                >
                    <h1 className="text-5xl font-bold mb-4" style={{ color: '#594A3C' }}>
                        {guide.title}
                    </h1>
                    <p className="text-xl mb-6" style={{ color: '#6A7B53' }}>
                        {guide.excerpt}
                    </p>

                    {/* 统计信息 */}
                    <div className="flex justify-center gap-8 mt-6">
                        <div className="text-center p-5 rounded-2xl shadow-lg transition-all duration-300 hover:transform hover:-translate-y-1"
                            style={{
                                background: 'linear-gradient(135deg, #D4A276 0%, #BC5A45 100%)',
                                color: 'white',
                                boxShadow: '0 8px 25px rgba(212, 162, 118, 0.3)'
                            }}>
                            <div className="text-2xl font-bold block">{guide.days}</div>
                            <div>行程天数</div>
                        </div>
                        <div className="text-center p-5 rounded-2xl shadow-lg transition-all duration-300 hover:transform hover:-translate-y-1"
                            style={{
                                background: 'linear-gradient(135deg, #D4A276 0%, #BC5A45 100%)',
                                color: 'white',
                                boxShadow: '0 8px 25px rgba(212, 162, 118, 0.3)'
                            }}>
                            <div className="text-2xl font-bold block">5000</div>
                            <div>总里程(公里)</div>
                        </div>
                        <div className="text-center p-5 rounded-2xl shadow-lg transition-all duration-300 hover:transform hover:-translate-y-1"
                            style={{
                                background: 'linear-gradient(135deg, #D4A276 0%, #BC5A45 100%)',
                                color: 'white',
                                boxShadow: '0 8px 25px rgba(212, 162, 118, 0.3)'
                            }}>
                            <div className="text-2xl font-bold block">20+</div>
                            <div>主要景点</div>
                        </div>
                        <div className="text-center p-5 rounded-2xl shadow-lg transition-all duration-300 hover:transform hover:-translate-y-1"
                            style={{
                                background: 'linear-gradient(135deg, #D4A276 0%, #BC5A45 100%)',
                                color: 'white',
                                boxShadow: '0 8px 25px rgba(212, 162, 118, 0.3)'
                            }}>
                            <div className="text-2xl font-bold block">7</div>
                            <div>核心区域</div>
                        </div>
                    </div>
                </motion.div>

                {/* 路线总览 */}
                <section id="overview" className="mb-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="p-8 rounded-2xl shadow-lg"
                        style={{ backgroundColor: '#F3EFE7' }}
                    >
                        <h2 className="text-3xl font-bold mb-8 text-center" style={{ color: '#2d3436' }}>
                            🗺️ G331边境公路环线路线概览（长春出发，阿尔山收官）
                        </h2>
                        <div className="p-5 rounded-xl mb-5" style={{ backgroundColor: '#f8f9fa' }}>
                            <h3 className="text-xl font-bold mb-4 text-center" style={{ color: '#2d3436' }}>
                                {guide.detailedContent?.routeDescription}
                            </h3>
                            <div className="flex justify-between items-center flex-wrap gap-3">
                                {guide.detailedContent?.routeDescription?.split(' → ').map((city, index) => (
                                    <div
                                        key={index}
                                        className="px-4 py-2 rounded-full text-white font-medium text-sm"
                                        style={{ backgroundColor: '#74b9ff' }}
                                    >
                                        {city}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </section>

                {/* 详细行程时间线 */}
                <section className="mb-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="p-8 rounded-2xl shadow-lg"
                        style={{ backgroundColor: '#F3EFE7' }}
                    >
                        <h2 className="text-3xl font-bold mb-8 text-center" style={{ color: '#2d3436' }}>
                            📅 详细行程时间线（13天G331边境公路环线）
                        </h2>

                        {/* 去程交通建议 */}
                        <div className="mb-8 p-5 rounded-lg" style={{
                            background: 'linear-gradient(135deg, #fff3cd 0%, #ffeaa7 100%)',
                            borderLeft: '4px solid #ffc107',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                        }}>
                            <div className="flex items-center mb-3">
                                <span className="text-lg mr-2">🚗</span>
                                <h4 className="font-semibold" style={{ color: '#856404' }}>去程交通建议</h4>
                            </div>
                            <p className="text-sm" style={{ color: '#856404', lineHeight: '1.6' }}>
                                <strong>当前方案：</strong>长春集合出发（交通便利，租车方便）<br />
                                <strong>备选方案：</strong>自驾可考虑从丹东出发，沿G331经集安市抵达白山市（完整G331体验，含鸭绿江风光、高句丽遗址）
                            </p>
                        </div>

                        <div className="space-y-4 mb-8">
                            {[
                                { day: 0, date: '9月24日', title: '各地 → 长春集合', desc: '抵达长春，取车检车，行程准备' },
                                { day: '1-2', date: '9月25-26日', title: '长春 → 长白山', desc: '长白山天池、瀑布、温泉群' },
                                { day: '3-4', date: '9月27-28日', title: '长白山 → 珲春 → 虎林', desc: '三国交界、边境口岸、珍宝岛风光' },
                                { day: '5-6', date: '9月29-30日', title: '虎林 → 饶河 → 抚远', desc: '乌苏里江、东极广场、黑瞎子岛风光' },
                                { day: '7-8', date: '10月1-2日', title: '抚远 → 同江 → 黑河', desc: '三江口、赫哲族文化、界江风光' },
                                { day: '9-10', date: '10月3-4日', title: '黑河 → 五大连池', desc: '火山地貌、温泉体验、地质奇观' },
                                { day: '11-12', date: '10月5-6日', title: '五大连池 → 漠河 → 根河', desc: '边境风光、大兴安岭、最北地标、白桦林' },
                                { day: 13, date: '10月7日', title: '根河 → 额尔古纳 → 海拉尔 → 阿尔山', desc: '湿地风光、草原风情、阿尔山天池（收官）' },
                                { day: 14, date: '10月8日', title: '阿尔山 → 各地返程', desc: '结束精彩旅程，各自返程' }
                            ].map((item, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                    className="flex items-start gap-4 p-4 rounded-lg"
                                    style={{ backgroundColor: 'rgba(255, 255, 255, 0.7)' }}
                                >
                                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                                        style={{ backgroundColor: '#74b9ff' }}>
                                        {item.day}
                                    </div>
                                    <div className="flex-1">
                                        <div className="font-bold text-sm" style={{ color: '#74b9ff' }}>
                                            第{item.day}天 ({item.date})
                                        </div>
                                        <div className="font-semibold text-base" style={{ color: '#2d3436' }}>
                                            {item.title}
                                        </div>
                                        <div className="text-sm" style={{ color: '#636e72' }}>
                                            {item.desc}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* 返程交通建议 */}
                        <div className="p-5 rounded-lg" style={{
                            background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
                            borderLeft: '4px solid #007bff',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                        }}>
                            <div className="flex items-center mb-3">
                                <span className="text-lg mr-2">💡</span>
                                <h4 className="font-semibold" style={{ color: '#495057' }}>返程交通建议</h4>
                            </div>
                            <p className="text-sm" style={{ color: '#6c757d', lineHeight: '1.6' }}>
                                <strong>当前方案：</strong>阿尔山直接返程（需中转，航班选择少）<br />
                                <strong>推荐方案：</strong>第13天返回海拉尔再返程（270公里，4小时车程，有直飞上海航班，更便利）
                            </p>
                        </div>
                    </motion.div>
                </section>

                {/* 每日行程细节·交通·住宿 */}
                <section className="mb-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="p-8 rounded-2xl shadow-lg"
                        style={{ backgroundColor: 'white' }}
                    >
                        <h2 className="text-3xl font-bold mb-8 text-center" style={{ color: '#2d3436' }}>
                            🧭 每日行程细节 · 交通 · 住宿
                        </h2>

                        <div className="space-y-6">
                            {guide.detailedContent?.timeline?.map((day, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                    className="border rounded-xl p-6"
                                    style={{ borderColor: '#e9ecef' }}
                                >
                                    <h3 className="text-xl font-bold mb-4" style={{ color: '#2d3436' }}>
                                        第{day.day}天 | {day.title}
                                    </h3>

                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                                        <div className="p-3 rounded-lg" style={{ backgroundColor: '#f8f9fa' }}>
                                            <div className="font-semibold mb-2" style={{ color: '#2d3436' }}>时间安排</div>
                                            <div className="text-sm" style={{ color: '#636e72' }}>{day.plan.join('；')}</div>
                                        </div>

                                        <div className="p-3 rounded-lg" style={{ backgroundColor: '#f8f9fa' }}>
                                            <div className="font-semibold mb-2" style={{ color: '#2d3436' }}>自驾交通</div>
                                            <div className="text-sm" style={{ color: '#636e72' }}>约{day.distance}km · 预估{day.hours}小时</div>
                                        </div>

                                        <div className="p-3 rounded-lg" style={{ backgroundColor: '#f8f9fa' }}>
                                            <div className="font-semibold mb-2" style={{ color: '#2d3436' }}>公共交通</div>
                                            <div className="text-sm" style={{ color: '#636e72' }}>{day.alt}</div>
                                        </div>

                                        <div className="p-3 rounded-lg" style={{ backgroundColor: '#f8f9fa' }}>
                                            <div className="font-semibold mb-2" style={{ color: '#2d3436' }}>城市地铁/市内交通</div>
                                            <div className="text-sm" style={{ color: '#636e72' }}>{day.cityMetro}</div>
                                        </div>

                                        <div className="p-3 rounded-lg" style={{ backgroundColor: '#f8f9fa' }}>
                                            <div className="font-semibold mb-2" style={{ color: '#2d3436' }}>住宿建议</div>
                                            <div className="text-sm" style={{ color: '#636e72' }}>{day.stay}</div>
                                        </div>

                                        <div className="p-3 rounded-lg" style={{ backgroundColor: '#f8f9fa' }}>
                                            <div className="font-semibold mb-2" style={{ color: '#2d3436' }}>美食推荐</div>
                                            <div className="text-sm" style={{ color: '#636e72' }}>{day.food || '—'}</div>
                                        </div>

                                        <div className="p-3 rounded-lg" style={{ backgroundColor: '#f8f9fa' }}>
                                            <div className="font-semibold mb-2" style={{ color: '#2d3436' }}>门票价格</div>
                                            <div className="text-sm" style={{ color: '#636e72' }}>{day.ticket || '—'}</div>
                                        </div>

                                        <div className="p-3 rounded-lg" style={{ backgroundColor: '#f8f9fa' }}>
                                            <div className="font-semibold mb-2" style={{ color: '#2d3436' }}>最佳时间</div>
                                            <div className="text-sm" style={{ color: '#636e72' }}>{day.bestTime || '—'}</div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                        <div className="p-3 rounded-lg" style={{ backgroundColor: '#f8f9fa' }}>
                                            <div className="font-semibold mb-2" style={{ color: '#2d3436' }}>摄影建议</div>
                                            <div className="text-sm" style={{ color: '#636e72' }}>{day.photoTip || '—'}</div>
                                        </div>

                                        <div className="p-3 rounded-lg" style={{ backgroundColor: '#f8f9fa' }}>
                                            <div className="font-semibold mb-2" style={{ color: '#2d3436' }}>提醒</div>
                                            <div className="text-sm" style={{ color: '#636e72' }}>{day.notice || '—'}</div>
                                        </div>
                                    </div>

                                    <div className="flex gap-3">
                                        <button
                                            className="px-4 py-2 rounded-full text-white text-sm font-medium"
                                            style={{ backgroundColor: '#007bff' }}
                                            onClick={() => {
                                                const from = day.start;
                                                const to = day.end;
                                                const url = `https://uri.amap.com/navigation?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}&mode=car&policy=1`;
                                                window.open(url, '_blank');
                                            }}
                                        >
                                            📍 一键导航（高德）
                                        </button>
                                        <button
                                            className="px-4 py-2 rounded-full text-sm font-medium border"
                                            style={{ backgroundColor: '#f8f9fa', color: '#636e72' }}
                                            onClick={() => alert(`在轨迹图中高亮第${day.day}天：${day.start}到${day.end}`)}
                                        >
                                            在轨迹图中高亮本日
                                        </button>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </section>

                {/* 7大核心区域详解 */}
                <section id="core-areas" className="mb-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="p-8 rounded-2xl shadow-lg"
                        style={{ backgroundColor: '#F3EFE7' }}
                    >
                        <h2 className="text-3xl font-bold mb-8 text-center" style={{ color: '#2d3436' }}>
                            🏔️ 7大核心区域详解
                        </h2>

                        {/* 1. 长白山区域 */}
                        <div className="mb-8">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm"
                                    style={{ backgroundColor: '#74b9ff' }}>
                                    1
                                </div>
                                <h3 className="text-xl font-bold" style={{ color: '#2d3436' }}>长白山区域</h3>
                            </div>
                            <div className="p-4 rounded-xl mb-4" style={{ backgroundColor: '#f8f9fa' }}>
                                <h4 className="font-bold mb-2" style={{ color: '#2d3436' }}>🏔️ 区域特色</h4>
                                <p style={{ color: '#636e72' }}>秋季的长白山色彩斑斓，天池、瀑布、温泉构成绝美画卷。建议游览北坡和西坡，体验不同的视角。</p>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="bg-white rounded-xl overflow-hidden shadow-lg">
                                    <img
                                        src="/images/changbai-tianchi.png"
                                        alt="长白山天池"
                                        className="w-full h-48 object-cover"
                                        onError={(e) => {
                                            e.currentTarget.src = "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop";
                                        }}
                                    />
                                    <div className="p-4">
                                        <h4 className="font-bold mb-2" style={{ color: '#2d3436' }}>长白山天池</h4>
                                        <p className="text-sm mb-3" style={{ color: '#636e72' }}>中国最高火山湖，秋季倒映着五彩斑斓的山林，美不胜收。</p>
                                        <div className="flex justify-between items-center text-sm mb-3">
                                            <span style={{ color: '#74b9ff' }}>📍 长白山</span>
                                            <span style={{ color: '#74b9ff' }}>⏰ 建议4-5小时</span>
                                        </div>
                                        <div className="flex flex-wrap gap-2 mb-3">
                                            <span className="px-2 py-1 rounded-full text-xs" style={{ backgroundColor: '#e3f2fd', color: '#1976d2' }}>
                                                📸 6:00-10:00最佳光线
                                            </span>
                                            <span className="px-2 py-1 rounded-full text-xs" style={{ backgroundColor: '#f3e5f5', color: '#7b1fa2' }}>
                                                🏔️ 火山地貌
                                            </span>
                                            <span className="px-2 py-1 rounded-full text-xs" style={{ backgroundColor: '#e8f5e8', color: '#388e3c' }}>
                                                ♨️ 温泉体验
                                            </span>
                                        </div>
                                        <div className="p-2 rounded text-xs" style={{ backgroundColor: '#f8f9fa', color: '#636e72' }}>
                                            <strong>📸 摄影提示：</strong>清晨顺光拍摄，使用偏振镜减少水面反光，广角镜头捕捉全景
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-white rounded-xl overflow-hidden shadow-lg">
                                    <img
                                        src="https://dimg04.c-ctrip.com/images/100b0t000000iqxfj746E_R_10000_1200.jpg"
                                        alt="长白山瀑布"
                                        className="w-full h-48 object-cover"
                                        onError={(e) => {
                                            e.currentTarget.src = "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop";
                                        }}
                                    />
                                    <div className="p-4">
                                        <h4 className="font-bold mb-2" style={{ color: '#2d3436' }}>长白山瀑布</h4>
                                        <p className="text-sm mb-3" style={{ color: '#636e72' }}>落差68米的壮观瀑布，秋季水量充沛，气势磅礴。</p>
                                        <div className="flex justify-between items-center text-sm mb-3">
                                            <span style={{ color: '#74b9ff' }}>📍 长白山</span>
                                            <span style={{ color: '#74b9ff' }}>⏰ 建议2小时</span>
                                        </div>
                                        <div className="flex flex-wrap gap-2 mb-3">
                                            <span className="px-2 py-1 rounded-full text-xs" style={{ backgroundColor: '#e3f2fd', color: '#1976d2' }}>
                                                📸 14:00-17:00侧光
                                            </span>
                                            <span className="px-2 py-1 rounded-full text-xs" style={{ backgroundColor: '#fff3e0', color: '#f57c00' }}>
                                                🌊 慢门拍摄
                                            </span>
                                            <span className="px-2 py-1 rounded-full text-xs" style={{ backgroundColor: '#f3e5f5', color: '#7b1fa2' }}>
                                                🏔️ 火山地貌
                                            </span>
                                        </div>
                                        <div className="p-2 rounded text-xs" style={{ backgroundColor: '#f8f9fa', color: '#636e72' }}>
                                            <strong>📸 摄影提示：</strong>使用1/8-1秒慢门拍摄水流，三脚架稳定，侧光突出瀑布层次
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 2. 大兴安岭林海 */}
                        <div className="mb-8">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm"
                                    style={{ backgroundColor: '#74b9ff' }}>
                                    2
                                </div>
                                <h3 className="text-xl font-bold" style={{ color: '#2d3436' }}>大兴安岭林海</h3>
                            </div>
                            <div className="p-4 rounded-xl mb-4" style={{ backgroundColor: '#f8f9fa' }}>
                                <h4 className="font-bold mb-2" style={{ color: '#2d3436' }}>🌲 区域特色</h4>
                                <p style={{ color: '#636e72' }}>穿越原始森林，体验与梅花鹿的亲密接触，感受大兴安岭的壮美与神秘。</p>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="bg-white rounded-xl overflow-hidden shadow-lg">
                                    <img
                                        src="https://dimg04.c-ctrip.com/images/0103l1200083ts6mx83CB_C_1600_1200.jpg"
                                        alt="大兴安岭林海"
                                        className="w-full h-48 object-cover"
                                        onError={(e) => {
                                            e.currentTarget.src = "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop";
                                        }}
                                    />
                                    <div className="p-4">
                                        <h4 className="font-bold mb-2" style={{ color: '#2d3436' }}>大兴安岭林海</h4>
                                        <p className="text-sm mb-3" style={{ color: '#636e72' }}>穿越原始森林，感受大自然的壮美与神秘。</p>
                                        <div className="flex justify-between items-center text-sm mb-3">
                                            <span style={{ color: '#74b9ff' }}>📍 大兴安岭</span>
                                            <span style={{ color: '#74b9ff' }}>⏰ 建议3-4小时</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-white rounded-xl overflow-hidden shadow-lg">
                                    <img
                                        src="https://dimg04.c-ctrip.com/images/100c0p000000fikf3381F_C_1600_1200.jpg"
                                        alt="白桦林"
                                        className="w-full h-48 object-cover"
                                        onError={(e) => {
                                            e.currentTarget.src = "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop";
                                        }}
                                    />
                                    <div className="p-4">
                                        <h4 className="font-bold mb-2" style={{ color: '#2d3436' }}>白桦林</h4>
                                        <p className="text-sm mb-3" style={{ color: '#636e72' }}>秋季的白桦林金黄一片，是摄影爱好者的天堂。</p>
                                        <div className="flex justify-between items-center text-sm mb-3">
                                            <span style={{ color: '#74b9ff' }}>📍 大兴安岭</span>
                                            <span style={{ color: '#74b9ff' }}>⏰ 建议2小时</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 3. 漠河极地 */}
                        <div className="mb-8">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm"
                                    style={{ backgroundColor: '#74b9ff' }}>
                                    3
                                </div>
                                <h3 className="text-xl font-bold" style={{ color: '#2d3436' }}>漠河极地</h3>
                            </div>
                            <div className="p-4 rounded-xl mb-4" style={{ backgroundColor: '#f8f9fa' }}>
                                <h4 className="font-bold mb-2" style={{ color: '#2d3436' }}>📍 区域特色</h4>
                                <p style={{ color: '#636e72' }}>寻找"最北之家"，体验祖国最北端的独特魅力，欣赏龙江第一湾的壮美。</p>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="bg-white rounded-xl overflow-hidden shadow-lg">
                                    <img
                                        src="https://dimg04.c-ctrip.com/images/0100h12000f6se7skAB64_C_1600_1200.jpg"
                                        alt="北极村"
                                        className="w-full h-48 object-cover"
                                        onError={(e) => {
                                            e.currentTarget.src = "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop";
                                        }}
                                    />
                                    <div className="p-4">
                                        <h4 className="font-bold mb-2" style={{ color: '#2d3436' }}>北极村</h4>
                                        <p className="text-sm mb-3" style={{ color: '#636e72' }}>寻找"最北之家"，体验祖国最北端的独特魅力。</p>
                                        <div className="flex justify-between items-center text-sm mb-3">
                                            <span style={{ color: '#74b9ff' }}>📍 漠河市</span>
                                            <span style={{ color: '#74b9ff' }}>⏰ 建议3-4小时</span>
                                        </div>
                                        <div className="flex flex-wrap gap-2 mb-3">
                                            <span className="px-2 py-1 rounded-full text-xs" style={{ backgroundColor: '#e3f2fd', color: '#1976d2' }}>
                                                📸 14:00-16:00白桦林
                                            </span>
                                            <span className="px-2 py-1 rounded-full text-xs" style={{ backgroundColor: '#fff3e0', color: '#f57c00' }}>
                                                📍 最北地标
                                            </span>
                                            <span className="px-2 py-1 rounded-full text-xs" style={{ backgroundColor: '#f3e5f5', color: '#7b1fa2' }}>
                                                🌲 白桦林
                                            </span>
                                        </div>
                                        <div className="p-2 rounded text-xs" style={{ backgroundColor: '#f8f9fa', color: '#636e72' }}>
                                            <strong>📸 摄影提示：</strong>白桦林逆光拍摄叶片透亮，最北地标清晨少人好拍，可能看到极光
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-white rounded-xl overflow-hidden shadow-lg">
                                    <img
                                        src="https://dimg04.c-ctrip.com/images/100q0r000000gqmliE3FF_R_1600_10000.jpg"
                                        alt="龙江第一湾"
                                        className="w-full h-48 object-cover"
                                        onError={(e) => {
                                            e.currentTarget.src = "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop";
                                        }}
                                    />
                                    <div className="p-4">
                                        <h4 className="font-bold mb-2" style={{ color: '#2d3436' }}>龙江第一湾</h4>
                                        <p className="text-sm mb-3" style={{ color: '#636e72' }}>欣赏黑龙江最壮观弯曲，感受大自然的鬼斧神工。</p>
                                        <div className="flex justify-between items-center text-sm mb-3">
                                            <span style={{ color: '#74b9ff' }}>📍 漠河市</span>
                                            <span style={{ color: '#74b9ff' }}>⏰ 建议2小时</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 4. 五大连池 */}
                        <div className="mb-8">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm"
                                    style={{ backgroundColor: '#74b9ff' }}>
                                    4
                                </div>
                                <h3 className="text-xl font-bold" style={{ color: '#2d3436' }}>五大连池</h3>
                            </div>
                            <div className="p-4 rounded-xl mb-4" style={{ backgroundColor: '#f8f9fa' }}>
                                <h4 className="font-bold mb-2" style={{ color: '#2d3436' }}>🌋 区域特色</h4>
                                <p style={{ color: '#636e72' }}>世界地质公园，火山地貌与湖泊的完美结合，秋季色彩斑斓，温泉资源丰富。</p>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="bg-white rounded-xl overflow-hidden shadow-lg">
                                    <img
                                        src="https://dimg04.c-ctrip.com/images/0106c12000j19xs7i1CBC_R_1600_10000.jpg"
                                        alt="五大连池火山群"
                                        className="w-full h-48 object-cover"
                                        onError={(e) => {
                                            e.currentTarget.src = "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop";
                                        }}
                                    />
                                    <div className="p-4">
                                        <h4 className="font-bold mb-2" style={{ color: '#2d3436' }}>五大连池火山群</h4>
                                        <p className="text-sm mb-3" style={{ color: '#636e72' }}>世界地质公园，14座火山组成的火山群，秋季色彩斑斓。</p>
                                        <div className="flex justify-between items-center text-sm mb-3">
                                            <span style={{ color: '#74b9ff' }}>📍 五大连池市</span>
                                            <span style={{ color: '#74b9ff' }}>⏰ 建议3-4小时</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-white rounded-xl overflow-hidden shadow-lg">
                                    <img
                                        src="https://dimg04.c-ctrip.com/images/0105f12000f9qdwid0F63_R_1600_10000.jpg"
                                        alt="温泊"
                                        className="w-full h-48 object-cover"
                                        onError={(e) => {
                                            e.currentTarget.src = "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop";
                                        }}
                                    />
                                    <div className="p-4">
                                        <h4 className="font-bold mb-2" style={{ color: '#2d3436' }}>温泊</h4>
                                        <p className="text-sm mb-3" style={{ color: '#636e72' }}>火山熔岩堰塞湖，湖水清澈，倒映着火山和森林。</p>
                                        <div className="flex justify-between items-center text-sm mb-3">
                                            <span style={{ color: '#74b9ff' }}>📍 五大连池市</span>
                                            <span style={{ color: '#74b9ff' }}>⏰ 建议2-3小时</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 5. 呼伦贝尔草原 */}
                        <div className="mb-8">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm"
                                    style={{ backgroundColor: '#74b9ff' }}>
                                    5
                                </div>
                                <h3 className="text-xl font-bold" style={{ color: '#2d3436' }}>呼伦贝尔草原</h3>
                            </div>
                            <div className="p-4 rounded-xl mb-4" style={{ backgroundColor: '#f8f9fa' }}>
                                <h4 className="font-bold mb-2" style={{ color: '#2d3436' }}>🌾 区域特色</h4>
                                <p style={{ color: '#636e72' }}>广袤的草原、蜿蜒的河流、成群的牛羊，构成了一幅壮美的草原画卷。</p>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="bg-white rounded-xl overflow-hidden shadow-lg">
                                    <img
                                        src="https://dimg04.c-ctrip.com/images/1lo3812000bfhar1e35C6_C_1600_1200.jpg"
                                        alt="莫日格勒河"
                                        className="w-full h-48 object-cover"
                                        onError={(e) => {
                                            e.currentTarget.src = "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop";
                                        }}
                                    />
                                    <div className="p-4">
                                        <h4 className="font-bold mb-2" style={{ color: '#2d3436' }}>莫日格勒河</h4>
                                        <p className="text-sm mb-3" style={{ color: '#636e72' }}>草原上的九曲十八弯，被誉为"天下第一曲水"。</p>
                                        <div className="flex justify-between items-center text-sm mb-3">
                                            <span style={{ color: '#74b9ff' }}>📍 海拉尔市</span>
                                            <span style={{ color: '#74b9ff' }}>⏰ 建议2-3小时</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-white rounded-xl overflow-hidden shadow-lg">
                                    <img
                                        src="https://dimg04.c-ctrip.com/images/0105912000j0h49tpE37D_R_1600_10000.jpg"
                                        alt="草原风光"
                                        className="w-full h-48 object-cover"
                                        onError={(e) => {
                                            e.currentTarget.src = "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop";
                                        }}
                                    />
                                    <div className="p-4">
                                        <h4 className="font-bold mb-2" style={{ color: '#2d3436' }}>草原风光</h4>
                                        <p className="text-sm mb-3" style={{ color: '#636e72' }}>广袤的草原、成群的牛羊，构成了一幅壮美的草原画卷。</p>
                                        <div className="flex justify-between items-center text-sm mb-3">
                                            <span style={{ color: '#74b9ff' }}>📍 呼伦贝尔</span>
                                            <span style={{ color: '#74b9ff' }}>⏰ 建议全天</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 6. 阿尔山火山 */}
                        <div className="mb-8">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm"
                                    style={{ backgroundColor: '#74b9ff' }}>
                                    6
                                </div>
                                <h3 className="text-xl font-bold" style={{ color: '#2d3436' }}>阿尔山火山</h3>
                            </div>
                            <div className="p-4 rounded-xl mb-4" style={{ backgroundColor: '#f8f9fa' }}>
                                <h4 className="font-bold mb-2" style={{ color: '#2d3436' }}>🌋 区域特色</h4>
                                <p style={{ color: '#636e72' }}>火山地貌与森林温泉的完美结合，秋季的阿尔山色彩丰富，是摄影和休闲的绝佳去处。</p>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="bg-white rounded-xl overflow-hidden shadow-lg">
                                    <img
                                        src="https://dimg04.c-ctrip.com/images/1005180000015chbo1954_R_1600_10000.jpg"
                                        alt="阿尔山天池"
                                        className="w-full h-48 object-cover"
                                        onError={(e) => {
                                            e.currentTarget.src = "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop";
                                        }}
                                    />
                                    <div className="p-4">
                                        <h4 className="font-bold mb-2" style={{ color: '#2d3436' }}>阿尔山天池</h4>
                                        <p className="text-sm mb-3" style={{ color: '#636e72' }}>火山口湖，秋季倒映着五彩斑斓的山林，美不胜收。</p>
                                        <div className="flex justify-between items-center text-sm mb-3">
                                            <span style={{ color: '#74b9ff' }}>📍 阿尔山市</span>
                                            <span style={{ color: '#74b9ff' }}>⏰ 建议3-4小时</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-white rounded-xl overflow-hidden shadow-lg">
                                    <img
                                        src="https://dimg04.c-ctrip.com/images/fd/tg/g4/M00/5E/12/CggYHlYzAkaANBf7ACYFUmAGuB4244_R_1600_10000.jpg"
                                        alt="石塘林"
                                        className="w-full h-48 object-cover"
                                        onError={(e) => {
                                            e.currentTarget.src = "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop";
                                        }}
                                    />
                                    <div className="p-4">
                                        <h4 className="font-bold mb-2" style={{ color: '#2d3436' }}>石塘林</h4>
                                        <p className="text-sm mb-3" style={{ color: '#636e72' }}>火山熔岩地貌，秋季色彩丰富，是摄影的绝佳地点。</p>
                                        <div className="flex justify-between items-center text-sm mb-3">
                                            <span style={{ color: '#74b9ff' }}>📍 阿尔山市</span>
                                            <span style={{ color: '#74b9ff' }}>⏰ 建议2-3小时</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 7. 额尔古纳湿地 */}
                        <div className="mb-8">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm"
                                    style={{ backgroundColor: '#74b9ff' }}>
                                    7
                                </div>
                                <h3 className="text-xl font-bold" style={{ color: '#2d3436' }}>额尔古纳湿地</h3>
                            </div>
                            <div className="p-4 rounded-xl mb-4" style={{ backgroundColor: '#f8f9fa' }}>
                                <h4 className="font-bold mb-2" style={{ color: '#2d3436' }}>🌿 区域特色</h4>
                                <p style={{ color: '#636e72' }}>亚洲第一湿地，秋季色彩斑斓，是摄影爱好者的天堂，也是候鸟的重要栖息地。</p>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="bg-white rounded-xl overflow-hidden shadow-lg">
                                    <img
                                        src="https://dimg04.c-ctrip.com/images/0101i120008obv8cy3844_R_1600_10000.jpg"
                                        alt="额尔古纳湿地"
                                        className="w-full h-48 object-cover"
                                        onError={(e) => {
                                            e.currentTarget.src = "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop";
                                        }}
                                    />
                                    <div className="p-4">
                                        <h4 className="font-bold mb-2" style={{ color: '#2d3436' }}>额尔古纳湿地</h4>
                                        <p className="text-sm mb-3" style={{ color: '#636e72' }}>亚洲第一湿地，秋季色彩斑斓，是摄影爱好者的天堂。</p>
                                        <div className="flex justify-between items-center text-sm mb-3">
                                            <span style={{ color: '#74b9ff' }}>📍 额尔古纳市</span>
                                            <span style={{ color: '#74b9ff' }}>⏰ 建议3-4小时</span>
                                        </div>
                                        <div className="flex flex-wrap gap-2 mb-3">
                                            <span className="px-2 py-1 rounded-full text-xs" style={{ backgroundColor: '#e3f2fd', color: '#1976d2' }}>
                                                📸 16:00-18:00日落
                                            </span>
                                            <span className="px-2 py-1 rounded-full text-xs" style={{ backgroundColor: '#e8f5e8', color: '#388e3c' }}>
                                                🌿 亚洲第一湿地
                                            </span>
                                            <span className="px-2 py-1 rounded-full text-xs" style={{ backgroundColor: '#fff3e0', color: '#f57c00' }}>
                                                🦅 候鸟栖息地
                                            </span>
                                        </div>
                                        <div className="p-2 rounded text-xs" style={{ backgroundColor: '#f8f9fa', color: '#636e72' }}>
                                            <strong>📸 摄影提示：</strong>日落时分金色湿地最美，广角镜头捕捉全景，注意候鸟拍摄时机
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-white rounded-xl overflow-hidden shadow-lg">
                                    <img
                                        src="https://dimg04.c-ctrip.com/images/10070t000000iqheq1725_R_1600_10000.jpg"
                                        alt="湿地日落"
                                        className="w-full h-48 object-cover"
                                        onError={(e) => {
                                            e.currentTarget.src = "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop";
                                        }}
                                    />
                                    <div className="p-4">
                                        <h4 className="font-bold mb-2" style={{ color: '#2d3436' }}>湿地日落</h4>
                                        <p className="text-sm mb-3" style={{ color: '#636e72' }}>欣赏湿地的壮美日落，感受大自然的宁静与壮美。</p>
                                        <div className="flex justify-between items-center text-sm mb-3">
                                            <span style={{ color: '#74b9ff' }}>📍 额尔古纳市</span>
                                            <span style={{ color: '#74b9ff' }}>⏰ 建议1-2小时</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </section>

                {/* 行程亮点 */}
                <section id="highlights" className="mb-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="p-8 rounded-2xl shadow-lg"
                        style={{ backgroundColor: 'white' }}
                    >
                        <h2 className="text-3xl font-bold mb-8 text-center" style={{ color: '#2d3436' }}>
                            🌟 行程亮点
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {guide.detailedContent?.highlights?.map((highlight, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                    className="p-5 rounded-xl text-center text-white transition-all duration-300 hover:transform hover:-translate-y-2"
                                    style={{
                                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                        boxShadow: '0 5px 15px rgba(0,0,0,0.1)'
                                    }}
                                >
                                    <div className="text-3xl mb-3">{highlight.icon}</div>
                                    <h3 className="text-lg font-bold mb-2">{highlight.title}</h3>
                                    <p className="text-sm opacity-90">{highlight.description}</p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </section>

                {/* 预算估算 */}
                <section id="budget" className="mb-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="p-8 rounded-2xl shadow-lg"
                        style={{ backgroundColor: '#F3EFE7' }}
                    >
                        <h2 className="text-3xl font-bold mb-8 text-center" style={{ color: '#2d3436' }}>
                            💰 预算估算（4人拼车）
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                            {guide.detailedContent?.budgetDetails && (
                                <>
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.6, delay: 0.1 }}
                                        viewport={{ once: true }}
                                        className="p-6 rounded-xl border-2 transition-all duration-300"
                                        style={{
                                            borderColor: '#28a745',
                                            backgroundColor: '#d4edda'
                                        }}
                                    >
                                        <div className="text-center mb-4">
                                            <h3 className="font-bold mb-2" style={{ color: '#155724' }}>💰 经济型</h3>
                                            <p className="text-2xl font-bold" style={{ color: '#155724' }}>
                                                ¥{guide.detailedContent.budgetDetails.economic.amount}/人
                                            </p>
                                        </div>
                                        <ul className="space-y-2 text-sm" style={{ color: '#155724' }}>
                                            {guide.detailedContent.budgetDetails.economic.items.map((item, index) => (
                                                <li key={index}>{item}</li>
                                            ))}
                                        </ul>
                                    </motion.div>

                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.6, delay: 0.2 }}
                                        viewport={{ once: true }}
                                        className="p-6 rounded-xl border-2 transition-all duration-300"
                                        style={{
                                            borderColor: '#007bff',
                                            backgroundColor: '#cce7ff'
                                        }}
                                    >
                                        <div className="text-center mb-4">
                                            <h3 className="font-bold mb-2" style={{ color: '#004085' }}>💎 标准型</h3>
                                            <p className="text-2xl font-bold" style={{ color: '#004085' }}>
                                                ¥{guide.detailedContent.budgetDetails.standard.amount}/人
                                            </p>
                                        </div>
                                        <ul className="space-y-2 text-sm" style={{ color: '#004085' }}>
                                            {guide.detailedContent.budgetDetails.standard.items.map((item, index) => (
                                                <li key={index}>{item}</li>
                                            ))}
                                        </ul>
                                    </motion.div>

                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.6, delay: 0.3 }}
                                        viewport={{ once: true }}
                                        className="p-6 rounded-xl border-2 transition-all duration-300"
                                        style={{
                                            borderColor: '#fd7e14',
                                            backgroundColor: '#ffe8d1'
                                        }}
                                    >
                                        <div className="text-center mb-4">
                                            <h3 className="font-bold mb-2" style={{ color: '#856404' }}>👑 豪华型</h3>
                                            <p className="text-2xl font-bold" style={{ color: '#856404' }}>
                                                ¥{guide.detailedContent.budgetDetails.luxury.amount}/人
                                            </p>
                                        </div>
                                        <ul className="space-y-2 text-sm" style={{ color: '#856404' }}>
                                            {guide.detailedContent.budgetDetails.luxury.items.map((item, index) => (
                                                <li key={index}>{item}</li>
                                            ))}
                                        </ul>
                                    </motion.div>
                                </>
                            )}
                        </div>
                    </motion.div>
                </section>

                {/* 天气查询 */}
                <section className="mb-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="p-8 rounded-2xl shadow-lg"
                        style={{ backgroundColor: 'white' }}
                    >
                        <h2 className="text-3xl font-bold mb-8 text-center" style={{ color: '#2d3436' }}>
                            🌤️ 主要城市天气查询
                        </h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                            {[
                                { name: '长春', gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
                                { name: '长白山', gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' },
                                { name: '珲春', gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' },
                                { name: '黑河', gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' },
                                { name: '五大连池', gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)' },
                                { name: '漠河', gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)' },
                                { name: '根河', gradient: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)' },
                                { name: '额尔古纳', gradient: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)' },
                                { name: '海拉尔', gradient: 'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)' },
                                { name: '阿尔山', gradient: 'linear-gradient(135deg, #fad0c4 0%, #ffd1ff 100%)' }
                            ].map((city, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                    className="p-4 rounded-xl text-center text-white cursor-pointer transition-transform hover:scale-105"
                                    style={{ background: city.gradient }}
                                    onClick={() => {
                                        const weatherInfo = {
                                            '长春': '温度：15°C，天气：晴，风力：东北风3级，湿度：65%\n💡 出行建议：适合户外活动，注意防晒\n👕 穿衣建议：薄外套+长袖衬衫',
                                            '长白山': '温度：8°C，天气：多云，风力：西北风4级，湿度：75%\n💡 出行建议：山顶温度低，需保暖\n👕 穿衣建议：冲锋衣+保暖内衣',
                                            '珲春': '温度：12°C，天气：晴，风力：东风2级，湿度：60%\n💡 出行建议：边境地区，注意证件\n👕 穿衣建议：薄外套+长袖',
                                            '黑河': '温度：6°C，天气：晴，风力：西北风5级，湿度：50%\n💡 出行建议：风力较大，注意保暖\n👕 穿衣建议：厚外套+帽子',
                                            '五大连池': '温度：7°C，天气：多云，风力：西风3级，湿度：70%\n💡 出行建议：火山地貌，注意安全\n👕 穿衣建议：厚外套+防滑鞋',
                                            '漠河': '温度：2°C，天气：晴，风力：北风6级，湿度：45%\n💡 出行建议：最北端，温度最低\n👕 穿衣建议：羽绒服+保暖装备',
                                            '根河': '温度：4°C，天气：多云，风力：西北风4级，湿度：60%\n💡 出行建议：林区湿度大\n👕 穿衣建议：厚外套+防水鞋',
                                            '额尔古纳': '温度：6°C，天气：晴，风力：西风3级，湿度：55%\n💡 出行建议：湿地风光，注意防蚊\n👕 穿衣建议：厚外套+防蚊装备',
                                            '海拉尔': '温度：8°C，天气：晴，风力：西风5级，湿度：55%\n💡 出行建议：草原风大\n👕 穿衣建议：厚外套+防风装备',
                                            '阿尔山': '温度：5°C，天气：多云，风力：西北风4级，湿度：65%\n💡 出行建议：火山温泉，注意保暖\n👕 穿衣建议：厚外套+温泉装备'
                                        };

                                        const info = weatherInfo[city.name as keyof typeof weatherInfo] || '暂无天气信息';

                                        alert(`${city.name}天气信息：\n${info}\n\n🌟 9月15-20°C，10月5-15°C，早晚温差10°C以上，10月中旬大兴安岭可能初雪`);
                                    }}
                                >
                                    <h3 className="font-bold mb-2">{city.name}</h3>
                                    <p className="text-sm opacity-90">点击查询天气</p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </section>

                {/* 轨迹图 */}
                <section className="mb-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="p-8 rounded-2xl shadow-lg"
                        style={{ backgroundColor: 'white' }}
                    >
                        <h2 className="text-3xl font-bold mb-6 text-center" style={{ color: '#2d3436' }}>
                            📍 G331边境公路轨迹图（13天精华环线）
                        </h2>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {/* 左侧：地图展示 */}
                            <div className="lg:col-span-2">
                                <div className="p-5 rounded-xl" style={{ backgroundColor: '#f8f9fa' }}>
                                    <h3 className="text-xl font-bold mb-4 text-center" style={{ color: '#2d3436' }}>十一自驾游</h3>
                                    <p className="text-center mb-4" style={{ color: '#636e72' }}>十一自驾路线</p>
                                    <p className="text-center mb-4 text-sm font-medium" style={{ color: '#e74c3c' }}>
                                        📍 当前显示：长春→长白山→珲春段 | 完整路线：13天环线见右侧
                                    </p>
                                    <p className="text-center mb-6 text-xs italic" style={{ color: '#636e72' }}>
                                        💡 提示：点击图片或按钮可查看完整高德地图路线，包含所有13天行程点
                                    </p>

                                    {/* 地图容器 */}
                                    <div className="relative w-full h-80 rounded-lg overflow-hidden cursor-pointer bg-gray-200 flex items-center justify-center"
                                        onClick={() => alert('打开高德地图功能')}>
                                        <img
                                            src="/images/WX20250813-202731.png"
                                            alt="G331边境公路轨迹图"
                                            className="w-full h-full object-contain rounded-lg"
                                            onError={(e) => {
                                                const target = e.currentTarget;
                                                target.style.display = 'none';
                                                const fallback = target.parentElement?.querySelector('.fallback-content');
                                                if (fallback) {
                                                    (fallback as HTMLElement).style.display = 'flex';
                                                }
                                            }}
                                        />
                                        <div className="absolute inset-0 flex items-center justify-center bg-gray-200 rounded-lg fallback-content" style={{ display: 'none' }}>
                                            <div className="text-center">
                                                <div className="text-4xl mb-2">🗺️</div>
                                                <div className="text-lg font-semibold">G331边境公路轨迹图</div>
                                                <div className="text-sm text-gray-600 mt-2">点击查看完整路线</div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* 路线信息 */}
                                    <div className="mt-4 p-4 rounded-lg border" style={{ backgroundColor: 'white' }}>
                                        <div className="flex justify-between items-center mb-3">
                                            <span className="font-semibold" style={{ color: '#2d3436' }}>分享人: 骑公路自行车的青豆</span>
                                            <span className="text-xs" style={{ color: '#636e72' }}>二维码长期有效</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <div className="flex items-center gap-3">
                                                <span className="text-sm" style={{ color: '#636e72' }}>拥有自己的地图</span>
                                                <div className="flex gap-2">
                                                    <span className="px-2 py-1 rounded text-xs text-white" style={{ backgroundColor: '#007bff' }}>高德地图</span>
                                                    <span className="px-2 py-1 rounded text-xs text-white" style={{ backgroundColor: '#28a745' }}>地图小程序</span>
                                                </div>
                                            </div>
                                            <div className="w-12 h-12 bg-gray-100 border rounded flex items-center justify-center text-xs cursor-pointer"
                                                style={{ color: '#636e72' }}
                                                onClick={() => alert('打开高德地图')}>
                                                🗺️
                                            </div>
                                        </div>
                                    </div>

                                    {/* 地图控制按钮 */}
                                    <div className="mt-4 flex gap-3 justify-center">
                                        <button className="px-4 py-2 rounded-full text-white text-sm font-medium"
                                            style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}
                                            onClick={() => alert('打开高德地图')}>
                                            🗺️ 打开高德地图
                                        </button>
                                        <button className="px-4 py-2 rounded-full text-sm font-medium border"
                                            style={{ backgroundColor: '#f8f9fa', color: '#636e72' }}
                                            onClick={() => alert('风景地形图功能')}>
                                            🏔️ 风景地形图
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* 右侧：视频和路线概览 */}
                            <div className="space-y-4">
                                {/* 行程视频 */}
                                <div className="p-4 rounded-xl" style={{ backgroundColor: '#f8f9fa' }}>
                                    <h4 className="font-bold mb-3" style={{ color: '#2d3436' }}>🎬 行程视频</h4>
                                    <video
                                        controls
                                        className="w-full h-32 rounded-lg bg-black"
                                        onError={(e) => {
                                            const target = e.currentTarget;
                                            target.style.display = 'none';
                                            const fallback = target.parentElement?.querySelector('.video-fallback');
                                            if (fallback) {
                                                (fallback as HTMLElement).style.display = 'flex';
                                            }
                                        }}
                                    >
                                        <source src="/videos/831_1755086568.mp4" type="video/mp4" />
                                        您的浏览器不支持视频播放。
                                    </video>
                                    <div className="w-full h-32 bg-gray-300 rounded-lg flex items-center justify-center video-fallback" style={{ display: 'none' }}>
                                        <div className="text-center">
                                            <div className="text-2xl mb-1">🎥</div>
                                            <div className="text-sm">G331边境公路精华片段</div>
                                        </div>
                                    </div>
                                </div>

                                {/* 路线概览 */}
                                <div className="p-4 rounded-xl" style={{ backgroundColor: '#f8f9fa' }}>
                                    <h4 className="font-bold mb-3" style={{ color: '#2d3436' }}>📋 完整13天路线</h4>
                                    <div className="text-xs space-y-2" style={{ color: '#636e72' }}>
                                        <div><strong>总里程：</strong>约5000公里</div>
                                        <div><strong>行程天数：</strong>13天精华环线</div>
                                        <div><strong>穿越省份：</strong>吉林、黑龙江、内蒙古</div>
                                        <div><strong>完整路线：</strong></div>
                                        <div className="p-2 rounded bg-white text-xs space-y-1 max-h-48 overflow-y-auto">
                                            <div className="font-medium" style={{ color: '#2d3436' }}>D0: 各地→长春</div>
                                            <div>D1-2: 长春→长白山</div>
                                            <div>D3: 长白山→珲春→虎林</div>
                                            <div>D4: 虎林→饶河→抚远</div>
                                            <div>D5: 抚远→同江</div>
                                            <div>D6: 同江→黑河</div>
                                            <div>D7: 黑河→五大连池</div>
                                            <div>D8: 五大连池→漠河</div>
                                            <div>D9: 漠河→根河</div>
                                            <div>D10: 根河→额尔古纳</div>
                                            <div>D11: 额尔古纳→海拉尔</div>
                                            <div>D12: 海拉尔→阿尔山</div>
                                            <div>D13: 阿尔山→各地</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </section>

                {/* 专业摄影指导 */}
                <section className="mb-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="p-8 rounded-2xl shadow-lg"
                        style={{ backgroundColor: 'white' }}
                    >
                        <h2 className="text-3xl font-bold mb-8 text-center" style={{ color: '#2d3436' }}>
                            📸 专业摄影指导
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                            {/* 长白山摄影指导 */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.1 }}
                                viewport={{ once: true }}
                                className="p-5 rounded-xl text-white"
                                style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}
                            >
                                <h3 className="font-bold mb-4">🏔️ 长白山摄影</h3>
                                <div className="space-y-3 text-sm">
                                    <div>
                                        <strong>天池最佳时间：</strong>6:00-10:00<br />
                                        <strong>拍摄技巧：</strong>顺光拍摄，偏振镜减少反光<br />
                                        <strong>设备建议：</strong>广角镜头(16-35mm)，三脚架
                                    </div>
                                    <div>
                                        <strong>瀑布拍摄：</strong>14:00-17:00侧光<br />
                                        <strong>慢门参数：</strong>1/8-1秒，ISO 100，f/8
                                    </div>
                                </div>
                            </motion.div>

                            {/* 大兴安岭摄影指导 */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                viewport={{ once: true }}
                                className="p-5 rounded-xl text-white"
                                style={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' }}
                            >
                                <h3 className="font-bold mb-4">🌲 大兴安岭摄影</h3>
                                <div className="space-y-3 text-sm">
                                    <div>
                                        <strong>白桦林时间：</strong>14:00-16:00<br />
                                        <strong>拍摄技巧：</strong>逆光拍摄，突出叶片纹理<br />
                                        <strong>设备建议：</strong>长焦镜头(70-200mm)，偏光镜
                                    </div>
                                    <div>
                                        <strong>林海全景：</strong>全天适合<br />
                                        <strong>延时摄影：</strong>云海变化，30秒间隔
                                    </div>
                                </div>
                            </motion.div>

                            {/* 湿地摄影指导 */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.3 }}
                                viewport={{ once: true }}
                                className="p-5 rounded-xl text-white"
                                style={{ background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' }}
                            >
                                <h3 className="font-bold mb-4">🌿 湿地摄影</h3>
                                <div className="space-y-3 text-sm">
                                    <div>
                                        <strong>最佳时间：</strong>16:00-18:00日落<br />
                                        <strong>拍摄技巧：</strong>广角镜头，压低地平线<br />
                                        <strong>设备建议：</strong>超广角(14-24mm)，渐变镜
                                    </div>
                                    <div>
                                        <strong>候鸟拍摄：</strong>清晨和黄昏<br />
                                        <strong>参数设置：</strong>高速连拍，1/1000秒以上
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        {/* 摄影时间轴 */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            viewport={{ once: true }}
                            className="p-5 rounded-xl"
                            style={{ backgroundColor: '#f8f9fa' }}
                        >
                            <h3 className="font-bold mb-4 text-center" style={{ color: '#2d3436' }}>📅 每日摄影时间轴</h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {[
                                    { time: '6:00-10:00', desc: '长白山天池顺光拍摄', color: '#667eea' },
                                    { time: '14:00-16:00', desc: '白桦林逆光拍摄', color: '#f093fb' },
                                    { time: '16:00-18:00', desc: '湿地日落黄金时间', color: '#4facfe' },
                                    { time: '18:00-20:00', desc: '草原日落蓝调时间', color: '#43e97b' }
                                ].map((item, index) => (
                                    <div key={index} className="p-4 rounded-lg bg-white border-l-4"
                                        style={{ borderLeftColor: item.color }}>
                                        <div className="font-bold mb-2" style={{ color: item.color }}>{item.time}</div>
                                        <div className="text-sm" style={{ color: '#636e72' }}>{item.desc}</div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>
                </section>

                {/* 实用贴士 */}
                <section id="tips" className="mb-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="p-8 rounded-2xl shadow-lg"
                        style={{ backgroundColor: '#F3EFE7' }}
                    >
                        <h2 className="text-3xl font-bold mb-8 text-center" style={{ color: '#2d3436' }}>
                            💡 实用贴士
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {guide.detailedContent?.tips?.map((tip, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                    className="p-6 rounded-xl border-l-4 transition-all duration-300"
                                    style={{
                                        backgroundColor: '#F3EFE7',
                                        borderLeftColor: '#D4A276',
                                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                                    }}
                                >
                                    <h3 className="text-lg font-bold mb-3" style={{ color: '#594A3C' }}>
                                        {tip.title}
                                    </h3>
                                    <ul className="space-y-2">
                                        {tip.items.map((item, itemIndex) => (
                                            <li key={itemIndex} className="flex items-start gap-2">
                                                <span className="mt-1" style={{ color: '#D4A276' }}>💡</span>
                                                <span style={{ color: '#6A7B53' }}>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </motion.div>
                            ))}
                        </div>

                        {/* 装备清单 */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            viewport={{ once: true }}
                            className="mt-8 p-8 rounded-2xl shadow-lg"
                            style={{ backgroundColor: 'white' }}
                        >
                            <h2 className="text-2xl font-bold mb-6 text-center" style={{ color: '#2d3436' }}>
                                🎒 个人携带装备清单
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {guide.detailedContent?.packingList?.map((category, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.6, delay: index * 0.1 }}
                                        viewport={{ once: true }}
                                        className="p-6 rounded-xl transition-all duration-300"
                                        style={{
                                            backgroundColor: '#f8f9fa',
                                            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                                        }}
                                    >
                                        <h3 className="text-lg font-bold mb-4" style={{ color: '#2d3436' }}>
                                            {category.title}
                                        </h3>
                                        <ul className="space-y-2">
                                            {category.items.map((item, itemIndex) => (
                                                <li key={itemIndex} className="flex items-center gap-2">
                                                    <span style={{ color: '#28a745' }}>✅</span>
                                                    <span style={{ color: '#636e72' }}>{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>
                </section>
            </div>

            {/* 回到顶部按钮 */}
            {showScrollTop && (
                <motion.button
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0 }}
                    onClick={scrollToTop}
                    className="fixed bottom-8 right-8 w-12 h-12 rounded-full shadow-lg transition-all duration-300 z-50 flex items-center justify-center"
                    style={{
                        backgroundColor: '#D4A276',
                        color: 'white'
                    }}
                >
                    <ArrowUp className="w-5 h-5" />
                </motion.button>
            )}
        </div>
    );
};

export default GuideDetail;


