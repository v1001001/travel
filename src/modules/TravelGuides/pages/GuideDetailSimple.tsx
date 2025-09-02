import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    Calendar,
    Car,
    DollarSign,
    Cloud,
    Navigation,
    Camera,
    AlertTriangle,
    ChevronUp
} from 'lucide-react';
import { Guide } from '../../../types';
import guidesData from '../../../data/guides.json';

const GuideDetailSimple: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [guide, setGuide] = useState<Guide | null>(null);
    const [activeSection, setActiveSection] = useState('overview');
    const [showScrollTop, setShowScrollTop] = useState(false);

    useEffect(() => {
        const foundGuide = guidesData.find(g => g.id === id);
        setGuide(foundGuide || null);
    }, [id]);

    // 监听滚动事件
    useEffect(() => {
        const handleScroll = () => {
            setShowScrollTop(window.scrollY > 300);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (sectionId: string) => {
        setActiveSection(sectionId);
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    if (!guide) {
        return (
            <div className="max-w-7xl mx-auto px-6 py-12 text-center">
                <div className="text-6xl mb-4">😵</div>
                <h1 className="text-2xl font-bold text-gray-800 mb-4">
                    攻略未找到
                </h1>
                <p className="text-gray-600 mb-6">
                    抱歉，您查找的攻略不存在或已被移除
                </p>
                <Link to="/guides" className="px-6 py-3 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors">
                    返回攻略列表
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
            {/* 返回按钮 */}
            <div className="max-w-7xl mx-auto px-6 pt-6">
                <Link
                    to="/guides"
                    className="inline-flex items-center gap-2 text-amber-600 hover:text-amber-700 font-medium"
                >
                    ← 返回攻略列表
                </Link>
            </div>

            {/* 英雄区域 */}
            <div className="relative h-96 overflow-hidden">
                <img
                    src={guide.cover}
                    alt={guide.title}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-8 left-8 text-white">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl font-bold mb-4"
                    >
                        {guide.title}
                    </motion.h1>
                    <div className="flex flex-wrap gap-4 text-lg">
                        <span className="flex items-center gap-2">
                            <Calendar className="w-5 h-5" />
                            {String(guide.days || '7')}天
                        </span>
                        <span className="flex items-center gap-2">
                            <Car className="w-5 h-5" />
                            {guide.id === 'hulunbeier-loop' ? '1200公里' : '5000公里'}
                        </span>
                        <span className="flex items-center gap-2">
                            <DollarSign className="w-5 h-5" />
                            ¥{guide.budget?.min || 0}-{guide.budget?.max || 0}
                        </span>
                    </div>
                </div>
            </div>

            {/* 粘性导航栏 */}
            <div className="sticky top-16 z-40 bg-white/90 backdrop-blur-sm border-b border-amber-200">
                <div className="max-w-7xl mx-auto px-6">
                    <nav className="flex space-x-8 overflow-x-auto py-4">
                        {[
                            { id: 'overview', label: '🗺️ 路线总览', icon: Navigation },
                            { id: 'weather', label: '🌤️ 天气查询', icon: Cloud },
                            { id: 'highlights', label: '🌟 行程亮点', icon: Camera }
                        ].map((item) => (
                            <button
                                key={item.id}
                                onClick={() => scrollToSection(item.id)}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition-all ${activeSection === item.id
                                    ? 'bg-amber-500 text-white'
                                    : 'text-gray-600 hover:bg-amber-100'
                                    }`}
                            >
                                <item.icon className="w-4 h-4" />
                                {item.label}
                            </button>
                        ))}
                    </nav>
                </div>
            </div>

            {/* 主要内容 */}
            <div className="max-w-7xl mx-auto px-6 py-12 space-y-16">
                {/* 路线总览 */}
                <motion.section
                    id="overview"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="bg-white rounded-2xl p-8 shadow-lg"
                >
                    <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                        <Navigation className="w-8 h-8 text-amber-600" />
                        {guide.title} - 路线总览
                    </h2>

                    <div className="mb-8 p-6 bg-amber-50 rounded-xl">
                        <h3 className="text-xl font-semibold text-amber-800 mb-3">
                            🚗 {guide.id === 'hulunbeier-loop' ? '海拉尔出发，海拉尔收官' : '长春出发，阿尔山收官'}
                        </h3>
                        <div className="text-gray-700 leading-relaxed mb-4">
                            <strong>路线简介：</strong>{guide.excerpt}
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div className="flex items-center gap-2 text-amber-700">
                                <span className="font-semibold">🏞️ 最佳季节:</span> {guide.bestSeason || '全年适宜'}
                            </div>
                            <div className="flex items-center gap-2 text-amber-700">
                                <span className="font-semibold">📍 主要目的地:</span> {guide.destination || '精选目的地'}
                            </div>
                            <div className="flex items-center gap-2 text-amber-700">
                                <span className="font-semibold">💰 预算范围:</span> ¥{guide.budget?.min || 0}-{guide.budget?.max || 0}
                            </div>
                            <div className="flex items-center gap-2 text-amber-700">
                                <span className="font-semibold">🚙 建议车型:</span> SUV/越野车
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {[
                            { label: '行程天数', value: String(guide.days || '7'), unit: '天', color: 'bg-blue-500', icon: '📅' },
                            { label: '总里程', value: guide.id === 'hulunbeier-loop' ? '1200' : '5000', unit: '公里', color: 'bg-green-500', icon: '🛣️' },
                            { label: '主要景点', value: '15+', unit: '个', color: 'bg-purple-500', icon: '🏞️' },
                            { label: '核心区域', value: guide.id === 'hulunbeier-loop' ? '6' : '7', unit: '大', color: 'bg-orange-500', icon: '⭐' }
                        ].map((stat, index) => (
                            <motion.div
                                key={index}
                                whileHover={{ scale: 1.05, y: -5 }}
                                className="text-center p-6 bg-gradient-to-br from-white to-gray-50 rounded-xl border border-gray-200 shadow-lg hover:shadow-xl transition-all cursor-pointer"
                            >
                                <div className={`w-16 h-16 ${stat.color} rounded-full flex items-center justify-center mx-auto mb-4 text-white text-xl font-bold shadow-lg`}>
                                    {stat.icon}
                                </div>
                                <div className="text-2xl font-bold text-gray-800 mb-1">{stat.value}</div>
                                <div className="text-sm text-gray-500 mb-1">{stat.label}</div>
                                <div className="text-xs text-gray-400">{stat.unit}</div>
                            </motion.div>
                        ))}
                    </div>
                </motion.section>

                {/* 实时天气查询 */}
                <motion.section
                    id="weather"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="bg-white rounded-2xl p-8 shadow-lg"
                >
                    <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                        <Cloud className="w-8 h-8 text-blue-600" />
                        主要城市天气查询
                    </h2>

                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
                        {(guide.id === 'hulunbeier-loop' ? [
                            { name: '海拉尔', color: 'from-purple-400 to-purple-600', temp: '22°C', weather: '晴' },
                            { name: '额尔古纳', color: 'from-pink-400 to-pink-600', temp: '20°C', weather: '多云' },
                            { name: '恩和', color: 'from-blue-400 to-blue-600', temp: '18°C', weather: '晴' },
                            { name: '满洲里', color: 'from-green-400 to-green-600', temp: '21°C', weather: '小雨' },
                            { name: '阿尔山', color: 'from-orange-400 to-orange-600', temp: '19°C', weather: '多云' }
                        ] : [
                            { name: '长春', color: 'from-purple-400 to-purple-600', temp: '15°C', weather: '晴' },
                            { name: '长白山', color: 'from-pink-400 to-pink-600', temp: '8°C', weather: '多云' },
                            { name: '黑河', color: 'from-blue-400 to-blue-600', temp: '6°C', weather: '晴' },
                            { name: '漠河', color: 'from-green-400 to-green-600', temp: '2°C', weather: '晴' },
                            { name: '阿尔山', color: 'from-orange-400 to-orange-600', temp: '5°C', weather: '多云' }
                        ]).map((city, index) => (
                            <motion.div
                                key={index}
                                whileHover={{ scale: 1.05, y: -5 }}
                                className={`bg-gradient-to-br ${city.color} rounded-xl p-4 text-white text-center cursor-pointer shadow-lg hover:shadow-xl transition-all`}
                            >
                                <div className="text-lg font-semibold mb-2">{city.name}</div>
                                <div className="text-2xl font-bold mb-1">{city.temp}</div>
                                <div className="text-sm opacity-90">{city.weather}</div>
                                <div className="text-xs opacity-75 mt-2">实时天气</div>
                            </motion.div>
                        ))}
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                        <h4 className="font-semibold text-blue-800 mb-4 flex items-center gap-2">
                            <Cloud className="w-5 h-5" />
                            天气贴士
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-blue-700">
                            <div>• {guide.id === 'hulunbeier-loop' ? '草原地区昼夜温差大，注意保暖' : '东北地区昼夜温差大，注意保暖'}</div>
                            <div>• 出行前关注天气变化，做好防雨准备</div>
                            <div>• {guide.id === 'hulunbeier-loop' ? '草原风力较大，注意防风' : '边境地区风力较大，注意防风'}</div>
                            <div>• 雨天路滑，驾车注意安全</div>
                        </div>
                    </div>
                </motion.section>

                {/* 行程亮点 */}
                <motion.section
                    id="highlights"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="bg-white rounded-2xl p-8 shadow-lg"
                >
                    <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center gap-3">
                        <Camera className="w-8 h-8 text-purple-600" />
                        行程亮点
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {guide.detailedContent?.highlights?.map((highlight, index) => highlight ? (
                            <div key={index} className="group cursor-pointer">
                                <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                                    <div className="text-4xl mb-4 text-center">{highlight.icon}</div>
                                    <h3 className="text-lg font-bold text-gray-800 mb-2 text-center">{highlight.title}</h3>
                                    <p className="text-gray-600 text-sm text-center leading-relaxed">{highlight.description}</p>
                                </div>
                            </div>
                        ) : null) || (
                                // 默认亮点，如果数据中没有
                                <>
                                    <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-6 shadow-md">
                                        <div className="text-4xl mb-4 text-center">🏞️</div>
                                        <h3 className="text-lg font-bold text-gray-800 mb-2 text-center">自然风光</h3>
                                        <p className="text-gray-600 text-sm text-center leading-relaxed">欣赏壮美的自然景观</p>
                                    </div>
                                    <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-6 shadow-md">
                                        <div className="text-4xl mb-4 text-center">📸</div>
                                        <h3 className="text-lg font-bold text-gray-800 mb-2 text-center">摄影天堂</h3>
                                        <p className="text-gray-600 text-sm text-center leading-relaxed">绝佳的摄影取景地</p>
                                    </div>
                                    <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-6 shadow-md">
                                        <div className="text-4xl mb-4 text-center">🚗</div>
                                        <h3 className="text-lg font-bold text-gray-800 mb-2 text-center">自驾体验</h3>
                                        <p className="text-gray-600 text-sm text-center leading-relaxed">享受自由的自驾之旅</p>
                                    </div>
                                </>
                            )}
                    </div>
                </motion.section>
            </div>

            {/* 回到顶部按钮 */}
            {showScrollTop && (
                <motion.button
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    onClick={scrollToTop}
                    className="fixed bottom-8 right-8 z-50 bg-gradient-to-r from-amber-500 to-orange-500 text-white p-4 rounded-full shadow-xl hover:from-amber-600 hover:to-orange-600 transition-all transform hover:scale-110"
                >
                    <ChevronUp className="w-6 h-6" />
                </motion.button>
            )}
        </div>
    );
};

export default GuideDetailSimple;
