import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    Calendar,
    Car,
    DollarSign,
    Cloud,
    Camera,
    MapPin,
    Navigation,
    AlertTriangle,
    ChevronUp,
    Clock,
    Thermometer,
    Wind,
    Phone,
    Home
} from 'lucide-react';
import { Guide } from '../../../types';
import guidesData from '../../../data/guides.json';

const GuideDetailSafe: React.FC = () => {
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

            // 检测当前所在区域
            const sections = ['stats', 'overview', 'timeline', 'weather', 'navigation', 'highlights', 'budget', 'tips'];
            for (const section of sections) {
                const element = document.getElementById(section);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    if (rect.top <= 100 && rect.bottom >= 100) {
                        setActiveSection(section);
                        break;
                    }
                }
            }
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
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 to-orange-50">
                <div className="text-center p-8 bg-white rounded-2xl shadow-xl">
                    <div className="text-6xl mb-4">🧭</div>
                    <h1 className="text-2xl font-bold text-gray-800 mb-4">
                        攻略未找到
                    </h1>
                    <p className="text-gray-600 mb-6">
                        抱歉，您查找的攻略不存在或已被移除
                    </p>
                    <Link
                        to="/guides"
                        className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded-xl font-medium transition-all transform hover:scale-105"
                    >
                        ← 返回攻略列表
                    </Link>
                </div>
            </div>
        );
    }

    // 安全获取详细内容
    const detailedContent = guide.detailedContent || {};
    const timeline = detailedContent.timeline || [];
    const highlights = detailedContent.highlights || [];
    const tips = detailedContent.tips || [];
    const budgetDetails = detailedContent.budgetDetails || {};

    return (
        <div className="min-h-screen bg-white">
            {/* 英雄区域 - 专业级设计 */}
            <div className="relative h-[700px] overflow-hidden bg-white">
                {/* 多层背景装饰 - 秋季金黄色调 */}
                <div className="absolute inset-0">
                    {/* 主要装饰层 */}
                    <div className="absolute inset-0 opacity-6">
                        <div className="absolute top-16 left-16 w-72 h-72 bg-yellow-300 rounded-full blur-3xl animate-pulse-slow"></div>
                        <div className="absolute bottom-16 right-16 w-96 h-96 bg-amber-400 rounded-full blur-3xl animate-float"></div>
                        <div className="absolute top-1/3 right-1/3 w-80 h-80 bg-orange-300 rounded-full blur-3xl opacity-70"></div>
                    </div>
                    {/* 细节装饰层 */}
                    <div className="absolute inset-0 opacity-3">
                        <div className="absolute top-1/4 left-1/3 w-32 h-32 bg-yellow-200 rounded-full blur-2xl"></div>
                        <div className="absolute bottom-1/3 left-1/4 w-48 h-48 bg-amber-200 rounded-full blur-2xl"></div>
                    </div>
                </div>

                {/* 返回按钮 - 专业设计 */}
                <motion.div
                    className="absolute top-8 left-8"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.1 }}
                >
                    <Link
                        to="/guides"
                        className="group inline-flex items-center gap-3 bg-white/90 backdrop-blur-xl text-gray-700 px-6 py-3 rounded-2xl font-medium shadow-lg border border-white/50 hover:bg-white hover:shadow-2xl hover:-translate-y-0.5 transition-all duration-300"
                    >
                        <div className="flex items-center justify-center w-6 h-6 bg-gray-100 rounded-lg group-hover:bg-amber-100 transition-colors">
                            <svg className="w-4 h-4 text-gray-600 group-hover:text-amber-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                        </div>
                        <span className="group-hover:text-gray-800 transition-colors">返回攻略列表</span>
                    </Link>
                </motion.div>

                <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16">
                    <div className="max-w-7xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="space-y-8"
                        >
                            {/* 标题区域 - 增强层次感 */}
                            <div className="space-y-6">
                                <motion.h1
                                    className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-gray-800 leading-[0.9] tracking-tight"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 1, delay: 0.2 }}
                                >
                                    {guide.title}
                                    {/* 装饰性元素 */}
                                    <div className="inline-block ml-4 w-3 h-3 bg-amber-400 rounded-full opacity-80"></div>
                                </motion.h1>

                                <motion.p
                                    className="text-xl md:text-2xl text-gray-600 max-w-4xl leading-relaxed font-light"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 1, delay: 0.4 }}
                                >
                                    {guide.excerpt || ''}
                                </motion.p>
                            </div>


                        </motion.div>
                    </div>
                </div>
            </div>

            {/* 粘性导航栏 */}
            <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
                <div className="max-w-7xl mx-auto px-6">
                    <nav className="flex space-x-1 overflow-x-auto py-4">
                        {[
                            { id: 'stats', label: '攻略总览', icon: MapPin },
                            { id: 'overview', label: '路线概览', icon: MapPin },
                            { id: 'timeline', label: '详细行程', icon: Calendar },
                            { id: 'weather', label: '天气查询', icon: Cloud },
                            { id: 'navigation', label: '交通导航', icon: Navigation },
                            { id: 'highlights', label: '行程亮点', icon: Camera },
                            { id: 'budget', label: '预算估算', icon: DollarSign },
                            { id: 'tips', label: '实用贴士', icon: AlertTriangle }
                        ].map((item) => (
                            <button
                                key={item.id}
                                onClick={() => scrollToSection(item.id)}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition-all font-medium ${activeSection === item.id
                                    ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-md'
                                    : 'text-gray-600 hover:bg-amber-50 hover:text-amber-600'
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

                {/* 攻略总览 - 统计卡片 */}
                <motion.section
                    id="stats"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="bg-gradient-to-br from-white to-amber-50/30 rounded-2xl p-8 shadow-xl border border-amber-100/50"
                >
                    <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
                        <span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                            攻略总览
                        </span>
                    </h2>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {[
                            { label: '行程天数', value: String(guide.days || '7'), unit: '天', color: 'bg-gradient-to-br from-amber-500 to-amber-600', icon: '📅' },
                            { label: '总里程', value: guide.id === 'hulunbeier-loop' ? '1200' : '5000', unit: '公里', color: 'bg-gradient-to-br from-orange-500 to-orange-600', icon: '🛣️' },
                            { label: '主要景点', value: '15+', unit: '个', color: 'bg-gradient-to-br from-yellow-500 to-amber-500', icon: '🏞️' },
                            { label: '核心区域', value: guide.id === 'hulunbeier-loop' ? '6' : '7', unit: '个', color: 'bg-gradient-to-br from-amber-600 to-orange-700', icon: '⭐' }
                        ].map((stat, index) => (
                            <motion.div
                                key={index}
                                whileHover={{ scale: 1.05, y: -5 }}
                                className="text-center p-6 bg-white rounded-xl border border-gray-200 shadow-lg hover:shadow-2xl transition-all cursor-pointer backdrop-blur-sm"
                            >
                                <div className={`w-16 h-16 ${stat.color} rounded-full flex items-center justify-center mx-auto mb-4 text-white text-xl font-bold shadow-lg`}>
                                    {stat.icon}
                                </div>
                                <div className="text-3xl font-bold text-gray-800 mb-2">{stat.value}</div>
                                <div className="text-sm text-gray-600 mb-1">{stat.label}</div>
                                <div className="text-xs text-gray-400">{stat.unit}</div>
                            </motion.div>
                        ))}
                    </div>
                </motion.section>

                {/* 路线概览 */}
                <motion.section
                    id="overview"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="bg-white rounded-2xl p-8 shadow-xl"
                >
                    <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                        <MapPin className="w-8 h-8 text-amber-600" />
                        路线概览
                    </h2>

                    <div className="space-y-6">
                        {/* 路线描述 */}
                        <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-6 border border-amber-200">
                            <h3 className="text-lg font-semibold text-amber-800 mb-3">🗺️ 经典路线</h3>
                            <p className="text-gray-700 text-base leading-relaxed">
                                {detailedContent.routeDescription || '海拉尔 → 莫日格勒河 → 额尔古纳湿地 → 白桦林 → 恩和 → 黑山头 → 满洲里 → 呼伦湖 → 阿尔山 → 海拉尔'}
                            </p>
                        </div>

                        {/* 路线特色 */}
                        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
                            <h3 className="text-lg font-semibold text-blue-800 mb-3">✨ 路线特色</h3>
                            <p className="text-gray-700 text-base leading-relaxed">
                                {detailedContent.overview || '环线设计，无重复路段，涵盖草原、湿地、森林、湖泊、边境等多种地貌，体验最纯正的呼伦贝尔风情。'}
                            </p>
                        </div>
                    </div>
                </motion.section>

                {/* 详细行程时间线 */}
                <motion.section
                    id="timeline"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="bg-white rounded-2xl p-8 shadow-xl"
                >
                    <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center gap-3">
                        <Calendar className="w-8 h-8 text-primary-600" />
                        详细行程时间线
                    </h2>

                    <div className="space-y-8">
                        {timeline.length > 0 ? timeline.map((day: any, index: number) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="relative border-l-4 border-primary-400 pl-8 pb-8"
                            >
                                {/* 时间轴圆点 */}
                                <div className="absolute -left-3 top-0 w-6 h-6 bg-primary-500 rounded-full border-4 border-white shadow-md"></div>

                                <div className="bg-gradient-to-r from-primary-50 to-accent-50 rounded-xl p-6 shadow-md">
                                    <div className="flex flex-wrap items-center gap-4 mb-4">
                                        <span className="bg-primary-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                                            Day {day.day}
                                        </span>
                                        <h3 className="text-xl font-bold text-gray-800">
                                            {String(day.title || '')}
                                        </h3>
                                        {day.distance > 0 && (
                                            <span className="text-sm text-gray-600 bg-white px-3 py-1 rounded-full">
                                                🚗 {day.distance}km · {day.hours}h
                                            </span>
                                        )}
                                    </div>

                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                        <div>
                                            <h4 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
                                                <Clock className="w-4 h-4" />
                                                行程安排
                                            </h4>
                                            <ul className="space-y-2 text-sm text-gray-600">
                                                {(day.plan || []).map((item: string, i: number) => (
                                                    <li key={i} className="flex items-start gap-2">
                                                        <span className="text-green-500 mt-1">•</span>
                                                        {String(item)}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        <div className="space-y-4">
                                            {day.stay && (
                                                <div>
                                                    <h5 className="font-medium text-gray-700 mb-1 flex items-center gap-1">
                                                        <Home className="w-4 h-4" />
                                                        住宿推荐
                                                    </h5>
                                                    <p className="text-sm text-gray-600">{String(day.stay)}</p>
                                                </div>
                                            )}

                                            {day.food && (
                                                <div>
                                                    <h5 className="font-medium text-gray-700 mb-1">🍽️ 美食推荐</h5>
                                                    <p className="text-sm text-gray-600">{String(day.food)}</p>
                                                </div>
                                            )}

                                            {day.ticket && (
                                                <div>
                                                    <h5 className="font-medium text-gray-700 mb-1">🎫 门票信息</h5>
                                                    <p className="text-sm text-gray-600">{String(day.ticket)}</p>
                                                </div>
                                            )}

                                            {day.bestTime && (
                                                <div>
                                                    <h5 className="font-medium text-gray-700 mb-1">⏰ 最佳时间</h5>
                                                    <p className="text-sm text-gray-600">{String(day.bestTime)}</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {day.photoTip && (
                                        <div className="mt-4 p-3 bg-white/70 rounded-lg">
                                            <h5 className="font-medium text-gray-700 mb-1 flex items-center gap-1">
                                                <Camera className="w-4 h-4" />
                                                摄影贴士
                                            </h5>
                                            <p className="text-sm text-gray-600">{String(day.photoTip)}</p>
                                        </div>
                                    )}

                                    {day.notice && (
                                        <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                                            <h5 className="font-medium text-amber-700 mb-1 flex items-center gap-1">
                                                <AlertTriangle className="w-4 h-4" />
                                                注意事项
                                            </h5>
                                            <p className="text-sm text-amber-600">{String(day.notice)}</p>
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        )) : (
                            <div className="text-center text-gray-500 py-12">
                                <Calendar className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                                <p>详细行程信息正在完善中...</p>
                            </div>
                        )}
                    </div>
                </motion.section>

                {/* 天气查询 */}
                <motion.section
                    id="weather"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="bg-white rounded-2xl p-8 shadow-xl"
                >
                    <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center gap-3">
                        <Cloud className="w-8 h-8 text-primary-600" />
                        主要城市天气查询
                    </h2>

                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
                        {guide.id === 'hulunbeier-loop' ? (
                            // 呼伦贝尔7日游城市
                            <>
                                {[
                                    { name: '海拉尔', temp: '22°C', weather: '晴', color: 'from-purple-400 to-purple-600' },
                                    { name: '额尔古纳', temp: '20°C', weather: '多云', color: 'from-pink-400 to-pink-600' },
                                    { name: '恩和', temp: '18°C', weather: '晴', color: 'from-blue-400 to-blue-600' },
                                    { name: '满洲里', temp: '21°C', weather: '小雨', color: 'from-green-400 to-green-600' },
                                    { name: '阿尔山', temp: '19°C', weather: '多云', color: 'from-orange-400 to-orange-600' }
                                ].map((city, index) => (
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
                            </>
                        ) : (
                            // G331大环线城市
                            <>
                                {[
                                    { name: '长春', temp: '15°C', weather: '晴', color: 'from-purple-400 to-purple-600' },
                                    { name: '长白山', temp: '8°C', weather: '多云', color: 'from-pink-400 to-pink-600' },
                                    { name: '黑河', temp: '6°C', weather: '晴', color: 'from-blue-400 to-blue-600' },
                                    { name: '漠河', temp: '2°C', weather: '晴', color: 'from-green-400 to-green-600' },
                                    { name: '阿尔山', temp: '5°C', weather: '多云', color: 'from-orange-400 to-orange-600' }
                                ].map((city, index) => (
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
                            </>
                        )}
                    </div>

                    {/* 天气贴士 */}
                    <div className="bg-primary-50 border border-primary-200 rounded-xl p-6">
                        <h3 className="font-semibold text-primary-800 mb-4 flex items-center gap-2">
                            <Thermometer className="w-5 h-5" />
                            天气贴士
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-primary-700">
                            <div className="flex items-start gap-2">
                                <Wind className="w-4 h-4 mt-0.5 flex-shrink-0" />
                                {guide.id === 'hulunbeier-loop' ? '草原地区昼夜温差大，注意保暖' : '东北地区昼夜温差大，注意保暖'}
                            </div>
                            <div className="flex items-start gap-2">
                                <Cloud className="w-4 h-4 mt-0.5 flex-shrink-0" />
                                出行前关注天气变化，做好防雨准备
                            </div>
                            <div className="flex items-start gap-2">
                                <Wind className="w-4 h-4 mt-0.5 flex-shrink-0" />
                                {guide.id === 'hulunbeier-loop' ? '草原风力较大，注意防风' : '边境地区风力较大，注意防风'}
                            </div>
                            <div className="flex items-start gap-2">
                                <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                                雨天路滑，驾车注意安全
                            </div>
                        </div>
                    </div>
                </motion.section>

                {/* 交通导航 */}
                <motion.section
                    id="navigation"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="bg-white rounded-2xl p-8 shadow-xl"
                >
                    <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center gap-3">
                        <Navigation className="w-8 h-8 text-accent-600" />
                        交通导航指南
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-6">
                            <div className="bg-gradient-to-r from-accent-50 to-primary-50 rounded-xl p-6 border border-accent-200">
                                <h3 className="font-semibold text-accent-800 mb-4 flex items-center gap-2">
                                    <Car className="w-5 h-5" />
                                    自驾出行指南
                                </h3>
                                <ul className="space-y-3 text-sm text-accent-700">
                                    <li className="flex items-start gap-2">
                                        <span className="w-1.5 h-1.5 bg-accent-500 rounded-full mt-2 flex-shrink-0"></span>
                                        {guide.id === 'hulunbeier-loop' ?
                                            '建议租用SUV或越野车，草原路段较多' :
                                            '建议租用SUV，边境路段条件复杂'
                                        }
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="w-1.5 h-1.5 bg-accent-500 rounded-full mt-2 flex-shrink-0"></span>
                                        {guide.id === 'hulunbeier-loop' ?
                                            '提前下载离线地图，草原信号较弱' :
                                            '提前下载离线地图，边境地区信号不稳定'
                                        }
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="w-1.5 h-1.5 bg-accent-500 rounded-full mt-2 flex-shrink-0"></span>
                                        携带身份证等有效证件，边境检查需要
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="w-1.5 h-1.5 bg-accent-500 rounded-full mt-2 flex-shrink-0"></span>
                                        准备足够的现金，部分地区移动支付不便
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="bg-gradient-to-r from-primary-50 to-accent-50 rounded-xl p-6 border border-primary-200">
                                <h3 className="font-semibold text-primary-800 mb-4 flex items-center gap-2">
                                    <MapPin className="w-5 h-5" />
                                    公共交通指南
                                </h3>
                                <ul className="space-y-3 text-sm text-primary-700">
                                    <li className="flex items-start gap-2">
                                        <span className="w-1.5 h-1.5 bg-primary-500 rounded-full mt-2 flex-shrink-0"></span>
                                        机场：{guide.id === 'hulunbeier-loop' ? '海拉尔东山机场' : '长春龙嘉机场'}有航班直达
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="w-1.5 h-1.5 bg-primary-500 rounded-full mt-2 flex-shrink-0"></span>
                                        火车：{guide.id === 'hulunbeier-loop' ? '海拉尔站' : '长春站'}有火车直达
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="w-1.5 h-1.5 bg-primary-500 rounded-full mt-2 flex-shrink-0"></span>
                                        租车：建议提前网上预订，现场验车
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="w-1.5 h-1.5 bg-primary-500 rounded-full mt-2 flex-shrink-0"></span>
                                        包车：可联系当地旅行社安排包车服务
                                    </li>
                                </ul>
                            </div>
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
                    className="bg-white rounded-2xl p-8 shadow-xl"
                >
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-gray-800 mb-4 flex items-center justify-center gap-3">
                            <Camera className="w-8 h-8 text-orange-600" />
                            行程亮点
                        </h2>
                        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                            精选6大核心景点，每一处都是大自然的杰作，值得您驻足欣赏
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {highlights.length > 0 ? highlights.map((highlight: any, index: number) => {
                            // 为每个景点配置精美图片 - 精选高质量景点代表图片
                            const highlightImages: Record<string, string> = {
                                '莫日格勒河九曲十八弯': 'https://dimg04.c-ctrip.com/images/0101112000nmt5n5z66A3_R_1600_10000.jpg', // 携程精选莫日格勒河实景
                                '额尔古纳湿地': 'https://dimg04.c-ctrip.com/images/0101712000j10ws6n39FA_R_1600_10000.jpg', // 携程精选额尔古纳湿地新图
                                '白桦林': 'https://dimg04.c-ctrip.com/images/100c0o000000gokpgC1D3_C_1600_1200.jpg', // 携程精选白桦林实景
                                '莫尔道嘎国家森林公园': 'https://dimg04.c-ctrip.com/images/100q0r000000gyjyy2E53_C_1600_1200.jpg', // 携程精选莫尔道嘎森林公园实景
                                '室韦俄罗斯民族乡': 'https://dimg04.c-ctrip.com/images/0105412000aj6yzpqD23B_R_1600_10000.jpg', // 携程精选室韦俄罗斯民族乡实景
                                '阿尔山国家森林公园': 'https://dimg04.c-ctrip.com/images/100i1d000001e7nni3F3E_C_1600_1200.jpg', // 携程精选阿尔山森林公园实景
                                '满洲里国门': 'https://dimg04.c-ctrip.com/images/100f0r000000gw5o32751_C_1600_1200.jpg' // 携程精选满洲里国门实景
                            };

                            const imageUrl = highlightImages[String(highlight.title)] || 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop&crop=center';

                            return (
                                <motion.div
                                    key={index}
                                    whileHover={{ scale: 1.05, y: -5 }}
                                    className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer border border-gray-200"
                                >
                                    {/* 精美图片 */}
                                    <div className="relative h-48 overflow-hidden group">
                                        <img
                                            src={imageUrl}
                                            alt={String(highlight.title || '')}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                            loading="lazy"
                                            onError={(e) => {
                                                console.log('Image failed to load:', imageUrl);
                                                const img = e.target as HTMLImageElement;
                                                img.src = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop&crop=center';
                                            }}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                        <div className="absolute top-4 right-4">
                                            <div className="bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-sm">
                                                <span className="text-2xl">{String(highlight.icon || '🏞️')}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* 内容区域 */}
                                    <div className="p-6">
                                        <h3 className="text-xl font-bold text-gray-800 mb-3 text-center">
                                            {String(highlight.title || '')}
                                        </h3>
                                        <p className="text-gray-600 text-sm text-center leading-relaxed">
                                            {String(highlight.description || '')}
                                        </p>
                                    </div>
                                </motion.div>
                            );
                        }) : (
                            <div className="col-span-full text-center text-gray-500 py-12">
                                <Camera className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                                <p>行程亮点信息正在完善中...</p>
                            </div>
                        )}
                    </div>
                </motion.section>

                {/* 预算估算 */}
                <motion.section
                    id="budget"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="bg-white rounded-2xl p-8 shadow-xl"
                >
                    <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center gap-3">
                        <DollarSign className="w-8 h-8 text-primary-600" />
                        预算估算
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                        {['economic', 'standard', 'luxury'].map((type, index) => {
                            const budget = (budgetDetails as any)[type];
                            if (!budget) return null;

                            const colors = ['green', 'blue', 'purple'];
                            const color = colors[index];

                            return (
                                <motion.div
                                    key={type}
                                    whileHover={{ scale: 1.03, y: -5 }}
                                    className={`bg-gradient-to-br from-${color}-50 to-${color}-100 border border-${color}-200 rounded-xl p-6 hover:shadow-lg transition-all cursor-pointer`}
                                >
                                    <div className="text-center mb-4">
                                        <h3 className={`text-xl font-bold text-${color}-700 mb-2`}>
                                            {String(budget.type || '')}
                                        </h3>
                                        <div className={`text-3xl font-bold text-${color}-600 mb-2`}>
                                            ¥{budget.amount || 0}
                                        </div>
                                        <p className={`text-sm text-${color}-600`}>
                                            {String(budget.description || '')}
                                        </p>
                                    </div>

                                    <ul className="space-y-2">
                                        {(budget.items || []).map((item: string, i: number) => (
                                            <li key={i} className={`text-sm text-${color}-700 flex items-start gap-2`}>
                                                <span className={`w-1.5 h-1.5 bg-${color}-500 rounded-full mt-2 flex-shrink-0`}></span>
                                                {String(item)}
                                            </li>
                                        ))}
                                    </ul>
                                </motion.div>
                            );
                        })}
                    </div>

                    {/* 省钱贴士 */}
                    {budgetDetails && 'moneySavingTips' in budgetDetails && Array.isArray(budgetDetails.moneySavingTips) && budgetDetails.moneySavingTips.length > 0 && (
                        <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
                            <h3 className="font-semibold text-amber-800 mb-4 flex items-center gap-2">
                                💡 省钱贴士
                            </h3>
                            <ul className="space-y-2">
                                {budgetDetails.moneySavingTips.map((tip: string, index: number) => (
                                    <li key={index} className="text-sm text-amber-700 flex items-start gap-2">
                                        <span className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2 flex-shrink-0"></span>
                                        {String(tip || '')}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </motion.section>

                {/* 实用贴士 */}
                <motion.section
                    id="tips"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="bg-white rounded-2xl p-8 shadow-xl"
                >
                    <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center gap-3">
                        <AlertTriangle className="w-8 h-8 text-red-600" />
                        实用贴士
                    </h2>

                    <div className="space-y-8">
                        {tips.length > 0 ? tips.map((tipSection: any, index: number) => (
                            <div key={index} className="bg-red-50 border border-red-200 rounded-xl p-6">
                                <h3 className="font-semibold text-red-800 mb-4 flex items-center gap-2">
                                    <AlertTriangle className="w-5 h-5" />
                                    {String(tipSection.title || tipSection.category || '重要提醒')}
                                </h3>
                                <ul className="space-y-3">
                                    {(tipSection.items || []).map((item: string, i: number) => (
                                        <li key={i} className="text-sm text-red-700 flex items-start gap-2">
                                            <span className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0"></span>
                                            {String(item)}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )) : (
                            <div className="text-center text-gray-500 py-12">
                                <AlertTriangle className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                                <p>实用贴士信息正在完善中...</p>
                            </div>
                        )}

                        {/* 紧急联系 */}
                        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                            <h3 className="font-semibold text-blue-800 mb-4 flex items-center gap-2">
                                <Phone className="w-5 h-5" />
                                紧急联系方式
                            </h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                <div className="bg-white p-4 rounded-lg">
                                    <div className="font-semibold text-blue-700 mb-2">🚨 报警电话</div>
                                    <div className="text-gray-700">110</div>
                                </div>
                                <div className="bg-white p-4 rounded-lg">
                                    <div className="font-semibold text-blue-700 mb-2">🚑 急救电话</div>
                                    <div className="text-gray-700">120</div>
                                </div>
                                <div className="bg-white p-4 rounded-lg">
                                    <div className="font-semibold text-blue-700 mb-2">🚒 火警电话</div>
                                    <div className="text-gray-700">119</div>
                                </div>
                                <div className="bg-white p-4 rounded-lg">
                                    <div className="font-semibold text-blue-700 mb-2">🧳 旅游投诉</div>
                                    <div className="text-gray-700">12301</div>
                                </div>
                            </div>

                            {/* 呼伦贝尔地区重要联系方式 */}
                            <div className="mt-6 pt-6 border-t border-blue-200">
                                <h4 className="font-semibold text-blue-800 mb-4">📍 呼伦贝尔地区重要联系方式</h4>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                                    <div>
                                        <div className="font-semibold text-blue-700 mb-1">海拉尔区人民医院:</div>
                                        <div className="text-blue-600">0470-8223597</div>
                                    </div>
                                    <div>
                                        <div className="font-semibold text-blue-700 mb-1">满洲里市人民医院:</div>
                                        <div className="text-blue-600">0470-6223295</div>
                                    </div>
                                    <div>
                                        <div className="font-semibold text-blue-700 mb-1">呼伦贝尔旅游局:</div>
                                        <div className="text-blue-600">0470-8217020</div>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm mt-4">
                                    <div>
                                        <div className="font-semibold text-blue-700 mb-1">道路救援:</div>
                                        <div className="text-red-600">12122</div>
                                    </div>
                                    <div>
                                        <div className="font-semibold text-blue-700 mb-1">天气预报:</div>
                                        <div className="text-green-600">12121</div>
                                    </div>
                                    <div>
                                        <div className="font-semibold text-blue-700 mb-1">旅行社24h:</div>
                                        <div className="text-orange-600">400-000-0470</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.section>
            </div>

            {/* 简洁底部区域 */}
            <section className="bg-gradient-to-r from-amber-50 to-orange-50 py-12">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <div className="text-4xl mb-4">🎒✨</div>

                    <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                        呼伦贝尔环线7日游 - 完美旅程等你开启
                    </h2>

                    <p className="text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
                        从海拉尔的都市风情到莫日格勒河的九曲十八弯，从额尔古纳湿地的生态天堂到满洲里的异国风情，
                        这条精心规划的7日环线将带你领略呼伦贝尔草原最精华的美景。
                    </p>

                    <div className="flex flex-wrap justify-center gap-4 text-sm">
                        <div className="flex items-center gap-2 text-blue-600">
                            <span>🌤️</span>
                            <span>实时天气查询</span>
                        </div>
                        <div className="flex items-center gap-2 text-green-600">
                            <span>🧭</span>
                            <span>智能导航助手</span>
                        </div>
                        <div className="flex items-center gap-2 text-purple-600">
                            <span>📋</span>
                            <span>详细装备清单</span>
                        </div>
                        <div className="flex items-center gap-2 text-red-600">
                            <span>🆘</span>
                            <span>24小时紧急联系</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* 回到顶部按钮 */}
            {showScrollTop && (
                <motion.button
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    onClick={scrollToTop}
                    className="fixed bottom-8 right-8 z-50 bg-gradient-to-r from-primary-500 to-accent-500 text-white p-4 rounded-full shadow-xl hover:from-primary-600 hover:to-accent-600 transition-all transform hover:scale-110"
                >
                    <ChevronUp className="w-6 h-6" />
                </motion.button>
            )}
        </div>
    );
};

export default GuideDetailSafe;