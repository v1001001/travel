import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    MapPin,
    Navigation,
    Cloud,
    Car,
    Clock,
    Camera,
    Phone,
    Calendar,
    DollarSign,
    AlertTriangle,
    ChevronUp,
    Thermometer,
    Wind
} from 'lucide-react';
import { Guide } from '../../../types';
import guidesData from '../../../data/guides.json';

const GuideDetail: React.FC = () => {
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

    const { detailedContent } = guide;

    // 防御性编程，确保数据安全
    if (!detailedContent) {
        console.warn('No detailed content found for guide:', guide.id);
    }

    // 获取天气图标
    const getWeatherIcon = (weather: string) => {
        const iconMap: { [key: string]: string } = {
            '晴': '☀️',
            '多云': '⛅',
            '小雨': '🌦️',
            '中雨': '🌧️',
            '大雨': '⛈️',
            '雪': '❄️',
            '雾': '🌫️',
            '阴': '☁️'
        };
        return iconMap[weather] || '🌤️';
    };

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
                            {String(guide.days)}天
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
                            { id: 'overview', label: '🗺️ 路线总览', icon: MapPin },
                            { id: 'timeline', label: '📅 详细行程', icon: Calendar },
                            { id: 'weather', label: '🌤️ 天气查询', icon: Cloud },
                            { id: 'navigation', label: '🧭 交通导航', icon: Navigation },
                            { id: 'highlights', label: '🌟 行程亮点', icon: Camera },
                            { id: 'budget', label: '💰 预算估算', icon: DollarSign },
                            { id: 'tips', label: '💡 实用贴士', icon: AlertTriangle }
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
                        <MapPin className="w-8 h-8 text-amber-600" />
                        {guide.title} - 路线总览
                    </h2>

                    <div className="mb-8 p-6 bg-amber-50 rounded-xl">
                        <h3 className="text-xl font-semibold text-amber-800 mb-3">
                            🚗 {guide.id === 'hulunbeier-loop' ? '海拉尔出发，海拉尔收官' : '长春出发，阿尔山收官'}
                        </h3>
                        <div className="text-gray-700 leading-relaxed mb-4">
                            <strong>完整路线：</strong>{detailedContent?.routeDescription || '精彩路线等你来探索'}
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div className="flex items-center gap-2 text-amber-700">
                                <span className="font-semibold">🏞️ 最佳季节:</span> {guide?.bestSeason || '全年适宜'}
                            </div>
                            <div className="flex items-center gap-2 text-amber-700">
                                <span className="font-semibold">📍 主要目的地:</span> {guide?.destination || '精选目的地'}
                            </div>
                            <div className="flex items-center gap-2 text-amber-700">
                                <span className="font-semibold">💰 预算范围:</span> ¥{guide?.budget?.min || 0}-{guide?.budget?.max || 0}
                            </div>
                            <div className="flex items-center gap-2 text-amber-700">
                                <span className="font-semibold">🚙 建议车型:</span> SUV/越野车
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {[
                            { label: '行程天数', value: String(guide?.days || '7'), unit: '天', color: 'bg-blue-500', icon: '📅' },
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

                {/* 交通导航助手 */}
                <motion.section
                    id="navigation"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="bg-white rounded-2xl p-8 shadow-lg"
                >
                    <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                        <Navigation className="w-8 h-8 text-green-600" />
                        交通导航助手
                    </h2>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="space-y-4">
                            <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                                🗺️ 主要路线导航
                            </h3>
                            {detailedContent?.timeline?.slice(1, 5).map((day, index) => (
                                <motion.div
                                    key={index}
                                    whileHover={{ scale: 1.02 }}
                                    className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-all bg-gradient-to-r from-white to-gray-50"
                                >
                                    <div className="flex items-center justify-between mb-3">
                                        <div className="flex items-center gap-2">
                                            <span className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                                                {index + 1}
                                            </span>
                                            <span className="font-semibold text-gray-800">{day.start} → {day.end}</span>
                                        </div>
                                        <div className="flex gap-2">
                                            <button className="px-3 py-1 bg-green-500 text-white rounded-full text-sm hover:bg-green-600 transition-colors flex items-center gap-1">
                                                <Navigation className="w-3 h-3" />
                                                导航
                                            </button>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-3 gap-4 text-sm text-gray-600">
                                        <span className="flex items-center gap-1">
                                            <Car className="w-4 h-4 text-blue-500" />
                                            <span className="font-medium">{day.distance}km</span>
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Clock className="w-4 h-4 text-green-500" />
                                            <span className="font-medium">{day.hours}小时</span>
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <DollarSign className="w-4 h-4 text-orange-500" />
                                            <span className="font-medium">¥{Math.round(day.distance * 0.8)}</span>
                                        </span>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                                🚖 一键出行服务
                            </h3>

                            {/* 打车服务 */}
                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                className="p-6 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl text-white shadow-lg hover:shadow-xl transition-all"
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <div>
                                        <div className="text-lg font-semibold mb-1">呼叫出租车</div>
                                        <div className="text-sm opacity-90">多平台支持，一键叫车</div>
                                    </div>
                                    <Car className="w-8 h-8 opacity-80" />
                                </div>
                                <div className="grid grid-cols-2 gap-2 mb-4 text-sm">
                                    <div className="bg-white/20 rounded p-2 text-center">滴滴出行</div>
                                    <div className="bg-white/20 rounded p-2 text-center">高德打车</div>
                                </div>
                                <button className="w-full bg-white text-orange-600 font-semibold py-3 rounded-lg hover:bg-gray-100 transition-colors flex items-center justify-center gap-2">
                                    <Phone className="w-4 h-4" />
                                    立即叫车
                                </button>
                            </motion.div>

                            {/* 费用估算器 */}
                            <div className="p-4 bg-gradient-to-br from-purple-50 to-blue-50 border border-purple-200 rounded-xl">
                                <h4 className="font-semibold text-purple-800 mb-3 flex items-center gap-2">
                                    💰 交通费用估算
                                </h4>
                                <div className="space-y-3 text-sm">
                                    <div className="flex justify-between items-center p-2 bg-white rounded">
                                        <span className="text-gray-600">油费 ({guide.id === 'hulunbeier-loop' ? '1200km' : '5000km'})</span>
                                        <span className="font-semibold text-green-600">¥{guide.id === 'hulunbeier-loop' ? '960' : '4000'}</span>
                                    </div>
                                    <div className="flex justify-between items-center p-2 bg-white rounded">
                                        <span className="text-gray-600">过路费</span>
                                        <span className="font-semibold text-blue-600">¥{guide.id === 'hulunbeier-loop' ? '200' : '800'}</span>
                                    </div>
                                    <div className="flex justify-between items-center p-2 bg-white rounded">
                                        <span className="text-gray-600">停车费</span>
                                        <span className="font-semibold text-orange-600">¥{guide.id === 'hulunbeier-loop' ? '150' : '300'}</span>
                                    </div>
                                    <div className="border-t pt-2 flex justify-between items-center font-bold">
                                        <span className="text-gray-800">预计总费用</span>
                                        <span className="text-red-600 text-lg">¥{guide.id === 'hulunbeier-loop' ? '1310' : '5100'}</span>
                                    </div>
                                </div>
                            </div>
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
                    className="bg-white rounded-2xl p-8 shadow-lg"
                >
                    <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center gap-3">
                        <Calendar className="w-8 h-8 text-blue-600" />
                        详细行程时间线（{guide.title}）
                    </h2>

                    <div className="space-y-8">
                        {detailedContent?.timeline?.map((day, index) => day ? (
                            <div key={index} className="relative">
                                {/* 时间线连接线 */}
                                {index < (detailedContent.timeline?.length || 0) - 1 && (
                                    <div className="absolute left-6 top-16 w-0.5 h-full bg-gradient-to-b from-amber-400 to-orange-400"></div>
                                )}

                                <div className="flex gap-6">
                                    {/* 时间轴点 */}
                                    <div className="flex-shrink-0">
                                        <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                                            D{day.day}
                                        </div>
                                    </div>

                                    {/* 内容卡片 */}
                                    <div className="flex-1 bg-gradient-to-br from-white to-gray-50 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
                                        <h3 className="text-xl font-bold text-gray-800 mb-3">{day.title}</h3>

                                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                                            {/* 行程安排 */}
                                            <div className="space-y-4">
                                                <h4 className="font-semibold text-gray-700 flex items-center gap-2">
                                                    📋 行程安排
                                                </h4>
                                                <ul className="space-y-2">
                                                    {day.plan.map((item, idx) => (
                                                        <li key={idx} className="flex items-start gap-2 text-gray-600">
                                                            <span className="w-1.5 h-1.5 bg-amber-400 rounded-full mt-2 flex-shrink-0"></span>
                                                            <span className="text-sm">{item}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>

                                            {/* 基本信息 */}
                                            <div className="space-y-4">
                                                {day.distance > 0 && (
                                                    <div className="flex gap-4">
                                                        <span className="flex items-center gap-1 text-sm text-gray-600">
                                                            <Car className="w-4 h-4 text-blue-600" />
                                                            距离: {day.distance}km
                                                        </span>
                                                        <span className="flex items-center gap-1 text-sm text-gray-600">
                                                            <Clock className="w-4 h-4 text-green-600" />
                                                            时间: {day.hours}小时
                                                        </span>
                                                    </div>
                                                )}

                                                {day.stay !== '—' && (
                                                    <div className="text-sm">
                                                        <span className="font-semibold text-gray-700">🏨 住宿建议: </span>
                                                        <span className="text-gray-600">{day.stay}</span>
                                                    </div>
                                                )}

                                                {day.food && (
                                                    <div className="text-sm">
                                                        <span className="font-semibold text-gray-700">🍽️ 美食推荐: </span>
                                                        <span className="text-gray-600">{day.food}</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                                            <div className="bg-blue-50 p-4 rounded-lg">
                                                <h5 className="font-semibold text-blue-800 mb-2 flex items-center gap-2">
                                                    <Camera className="w-4 h-4" />
                                                    摄影提示
                                                </h5>
                                                <p className="text-sm text-blue-700">{day.photoTip}</p>
                                            </div>

                                            <div className="bg-amber-50 p-4 rounded-lg">
                                                <h5 className="font-semibold text-amber-800 mb-2 flex items-center gap-2">
                                                    <AlertTriangle className="w-4 h-4" />
                                                    注意事项
                                                </h5>
                                                <p className="text-sm text-amber-700">{day.notice}</p>
                                            </div>

                                            <div className="bg-green-50 p-4 rounded-lg">
                                                <h5 className="font-semibold text-green-800 mb-2 flex items-center gap-2">
                                                    <DollarSign className="w-4 h-4" />
                                                    门票价格
                                                </h5>
                                                <p className="text-sm text-green-700">{day.ticket || '详见景区'}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : null)}
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
                        {detailedContent?.highlights?.map((highlight, index) => highlight ? (
                            <div key={index} className="group cursor-pointer">
                                <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                                    <div className="text-4xl mb-4 text-center">{highlight.icon}</div>
                                    <h3 className="text-lg font-bold text-gray-800 mb-2 text-center">{highlight.title}</h3>
                                    <p className="text-gray-600 text-sm text-center leading-relaxed">{highlight.description}</p>
                                </div>
                            </div>
                        ) : null)}
                    </div>
                </motion.section>

                {/* 预算估算 */}
                <motion.section
                    id="budget"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="bg-white rounded-2xl p-8 shadow-lg"
                >
                    <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center gap-3">
                        <DollarSign className="w-8 h-8 text-green-600" />
                        预算估算方案
                    </h2>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                        {detailedContent?.budgetDetails && Object.entries(detailedContent.budgetDetails)
                            .filter(([key]) => key !== 'moneySavingTips')
                            .map(([key, budget], index) => budget && typeof budget === 'object' ? (
                                <div key={key} className="relative">
                                    <div className={`bg-gradient-to-br ${index === 0 ? 'from-blue-400 to-blue-600' :
                                        index === 1 ? 'from-green-400 to-green-600' :
                                            'from-purple-400 to-purple-600'
                                        } rounded-xl p-6 text-white`}>
                                        <h3 className="text-xl font-bold mb-2">{budget.type}</h3>
                                        <div className="text-3xl font-bold mb-3">¥{budget.amount}</div>
                                        <p className="text-sm opacity-90 mb-4">{budget.description}</p>
                                        <ul className="space-y-1 text-sm">
                                            {budget.items.map((item: string, idx: number) => (
                                                <li key={idx} className="opacity-90">• {item}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            ) : null)}
                    </div>

                    <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
                        <h3 className="text-xl font-bold text-yellow-800 mb-4">💡 省钱攻略</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {detailedContent?.budgetDetails?.moneySavingTips?.map((tip: string, index: number) => (
                                <div key={index} className="flex items-start gap-2 text-yellow-700">
                                    <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></span>
                                    <span className="text-sm">{tip}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.section>

                {/* 实用贴士 */}
                <motion.section
                    id="tips"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="bg-white rounded-2xl p-8 shadow-lg"
                >
                    <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center gap-3">
                        <AlertTriangle className="w-8 h-8 text-red-600" />
                        实用贴士
                    </h2>

                    <div className="space-y-6">
                        {detailedContent?.tips?.map((tip, index) => tip ? (
                            <div key={index} className="bg-red-50 border border-red-200 rounded-xl p-6">
                                <h3 className="text-xl font-bold text-red-800 mb-4">{tip.title}</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {tip.items.map((item: string, idx: number) => (
                                        <div key={idx} className="flex items-start gap-2 text-red-700">
                                            <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                                            <span className="text-sm">{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : null)}
                    </div>

                    {/* 智能装备清单 */}
                    <div className="mt-8 bg-gradient-to-br from-green-50 to-blue-50 border border-green-200 rounded-xl p-6">
                        <h3 className="text-xl font-bold text-green-800 mb-6 flex items-center gap-2">
                            🎒 智能装备清单
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="space-y-3">
                                <h4 className="font-semibold text-green-700 flex items-center gap-2 border-b pb-2">
                                    📋 必备证件
                                </h4>
                                <div className="space-y-2 text-sm">
                                    {['身份证', '驾驶证', '行驶证', '保险单', '现金/银行卡'].map((item, idx) => (
                                        <label key={idx} className="flex items-center gap-2 cursor-pointer hover:bg-white rounded p-1">
                                            <input type="checkbox" className="w-4 h-4 text-green-600 rounded" />
                                            <span>{item}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                            <div className="space-y-3">
                                <h4 className="font-semibold text-blue-700 flex items-center gap-2 border-b pb-2">
                                    🧥 服装装备
                                </h4>
                                <div className="space-y-2 text-sm">
                                    {['冲锋衣', '抓绒衣', '保暖内衣', '防风帽', '手套', '防滑鞋'].map((item, idx) => (
                                        <label key={idx} className="flex items-center gap-2 cursor-pointer hover:bg-white rounded p-1">
                                            <input type="checkbox" className="w-4 h-4 text-blue-600 rounded" />
                                            <span>{item}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                            <div className="space-y-3">
                                <h4 className="font-semibold text-purple-700 flex items-center gap-2 border-b pb-2">
                                    📱 电子设备
                                </h4>
                                <div className="space-y-2 text-sm">
                                    {['充电宝', '车载充电器', '对讲机', 'GPS导航', '相机电池', '内存卡'].map((item, idx) => (
                                        <label key={idx} className="flex items-center gap-2 cursor-pointer hover:bg-white rounded p-1">
                                            <input type="checkbox" className="w-4 h-4 text-purple-600 rounded" />
                                            <span>{item}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 增强版紧急联系方式 */}
                    <div className="mt-8 bg-red-50 border border-red-200 rounded-xl p-6">
                        <h3 className="text-xl font-bold text-red-800 mb-6 flex items-center gap-2">
                            <Phone className="w-5 h-5" />
                            24小时紧急联系方式
                        </h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                className="text-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all cursor-pointer"
                            >
                                <div className="text-2xl mb-2">🚔</div>
                                <div className="font-semibold text-gray-800">报警电话</div>
                                <div className="text-red-600 font-bold text-xl">110</div>
                            </motion.div>
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                className="text-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all cursor-pointer"
                            >
                                <div className="text-2xl mb-2">🚑</div>
                                <div className="font-semibold text-gray-800">急救电话</div>
                                <div className="text-red-600 font-bold text-xl">120</div>
                            </motion.div>
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                className="text-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all cursor-pointer"
                            >
                                <div className="text-2xl mb-2">🚒</div>
                                <div className="font-semibold text-gray-800">火警电话</div>
                                <div className="text-red-600 font-bold text-xl">119</div>
                            </motion.div>
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                className="text-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all cursor-pointer"
                            >
                                <div className="text-2xl mb-2">📞</div>
                                <div className="font-semibold text-gray-800">旅游投诉</div>
                                <div className="text-blue-600 font-bold text-xl">12301</div>
                            </motion.div>
                        </div>

                        {/* 当地紧急联系 */}
                        <div className="bg-white rounded-lg p-4">
                            <h4 className="font-semibold text-red-700 mb-3 flex items-center gap-2">
                                📍 {guide.id === 'hulunbeier-loop' ? '呼伦贝尔' : '东北'}地区重要联系方式
                            </h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                <div className="space-y-2">
                                    {guide.id === 'hulunbeier-loop' ? (
                                        <>
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">海拉尔区人民医院:</span>
                                                <span className="font-semibold text-blue-600">0470-8223597</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">满洲里市人民医院:</span>
                                                <span className="font-semibold text-blue-600">0470-6223295</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">呼伦贝尔旅游局:</span>
                                                <span className="font-semibold text-green-600">0470-8217020</span>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">长春市人民医院:</span>
                                                <span className="font-semibold text-blue-600">0431-85595321</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">黑河市人民医院:</span>
                                                <span className="font-semibold text-blue-600">0456-8223456</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">东北旅游服务:</span>
                                                <span className="font-semibold text-green-600">400-024-0431</span>
                                            </div>
                                        </>
                                    )}
                                </div>
                                <div className="space-y-2">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">道路救援:</span>
                                        <span className="font-semibold text-orange-600">12122</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">天气预报:</span>
                                        <span className="font-semibold text-purple-600">12121</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">旅行社24h:</span>
                                        <span className="font-semibold text-indigo-600">{guide.id === 'hulunbeier-loop' ? '400-000-0470' : '400-000-0431'}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.section>

                {/* 页面结尾总结 */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                    viewport={{ once: true }}
                    className="text-center py-12 bg-gradient-to-br from-amber-100 via-orange-100 to-red-100 rounded-2xl"
                >
                    <div className="text-4xl mb-4">🎉</div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">
                        {guide.title} - 完美旅程等你开启
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed mb-6">
                        {guide.id === 'hulunbeier-loop'
                            ? '从海拉尔的都市风情到莫日格勒河的九曲十八弯，从额尔古纳湿地的生态天堂到满洲里的异国风情，这条精心规划的7日环线将带你领略呼伦贝尔草原最精华的美景。'
                            : '从长春的现代都市到长白山的天池秘境，从大兴安岭的原始森林到漠河的极地风光，这条史诗级的G331边境公路环线将带你穿越东北最美的风景。'
                        }
                    </p>
                    <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                            实时天气查询
                        </span>
                        <span className="flex items-center gap-1">
                            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                            智能导航助手
                        </span>
                        <span className="flex items-center gap-1">
                            <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                            详细装备清单
                        </span>
                        <span className="flex items-center gap-1">
                            <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                            24小时紧急联系
                        </span>
                    </div>
                </motion.div>
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

export default GuideDetail;