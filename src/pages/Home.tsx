import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Calendar, Camera, BookOpen, Globe, Heart, Star, Search, ArrowRight, Compass, Mountain, Camera as CameraIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import HeroBanner from '../components/HeroBanner';
import FeaturedRoutes from '../components/FeaturedRoutes';
import guidesData from '../data/guides.json';
import destinationsData from '../data/destinations.json';
import photosData from '../data/photos.json';

const Home: React.FC = () => {
    const [selectedFilter, setSelectedFilter] = useState<string>('all');

    // 统计数据
    const stats = {
        guides: guidesData.length,
        destinations: destinationsData.length,
        photos: photosData.length,
        users: 128,
        favorites: 256,
        reviews: 512
    };

    // 筛选选项
    const filterOptions = [
        { id: 'all', label: '全部', icon: '🌟' },
        { id: 'guides', label: '攻略', icon: '📖' },
        { id: 'destinations', label: '目的地', icon: '🗺️' },
        { id: 'photos', label: '照片', icon: '📸' },
        { id: 'autumn', label: '秋季', icon: '🍂' },
        { id: 'northeast', label: '东北', icon: '🏔️' }
    ];

    // MVP功能模块
    const mvpFeatures = [
        {
            id: 'map',
            title: '🗺️ 旅行地图',
            description: '在地图上查看旅行足迹和路线轨迹',
            path: '/map',
            color: 'from-blue-500 to-blue-600',
            bgColor: 'bg-blue-50',
            icon: MapPin
        },
        {
            id: 'timeline',
            title: '📅 时间轴',
            description: '按时间顺序回顾旅行回忆',
            path: '/timeline',
            color: 'from-emerald-500 to-emerald-600',
            bgColor: 'bg-emerald-50',
            icon: Calendar
        },
        {
            id: 'photos',
            title: '📸 相册回忆',
            description: '瀑布流展示旅行照片和视频',
            path: '/photos',
            color: 'from-rose-500 to-rose-600',
            bgColor: 'bg-rose-50',
            icon: Camera
        },
        {
            id: 'guides',
            title: '📖 旅行攻略',
            description: '查看和分享旅行攻略',
            path: '/guides',
            color: 'from-violet-500 to-violet-600',
            bgColor: 'bg-violet-50',
            icon: BookOpen
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
            {/* Hero Section - 重新设计 */}
            <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
                {/* 背景装饰 */}
                <div className="absolute inset-0">
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-amber-100/30 via-orange-100/20 to-red-100/30"></div>
                    <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-amber-400/20 to-orange-400/20 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-blue-400/20 to-indigo-400/20 rounded-full blur-3xl"></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-amber-300/10 via-orange-300/10 to-red-300/10 rounded-full blur-3xl"></div>
                </div>

                {/* 地图背景装饰 */}
                <div className="absolute inset-0 opacity-5">
                    <svg className="w-full h-full" viewBox="0 0 1200 800" preserveAspectRatio="none">
                        <path
                            d="M100,400 Q300,200 500,400 T900,400 T1100,400"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            className="text-amber-600"
                        />
                        <circle cx="100" cy="400" r="4" fill="currentColor" className="text-amber-600" />
                        <circle cx="500" cy="400" r="4" fill="currentColor" className="text-amber-600" />
                        <circle cx="900" cy="400" r="4" fill="currentColor" className="text-amber-600" />
                        <circle cx="1100" cy="400" r="4" fill="currentColor" className="text-amber-600" />
                        
                        {/* 添加更多装饰线条 */}
                        <path
                            d="M200,300 Q400,100 600,300 T1000,300"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1"
                            className="text-orange-500"
                        />
                        <path
                            d="M150,500 Q350,700 550,500 T950,500"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1"
                            className="text-red-500"
                        />
                    </svg>
                </div>

                <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                    >
                        {/* Logo */}
                        <div className="flex justify-center mb-8">
                            <div className="relative">
                                <div className="w-24 h-24 bg-gradient-to-br from-amber-400 to-orange-500 rounded-3xl shadow-2xl flex items-center justify-center mb-4">
                                    <img
                                        src="/images/jimeng-2.png"
                                        alt="无尽之旅"
                                        className="w-16 h-16 rounded-2xl"
                                    />
                                </div>
                                <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg">
                                    <Compass className="w-4 h-4 text-white" />
                                </div>
                            </div>
                        </div>
                        
                        {/* 主标题 */}
                        <motion.h1 
                            className="text-6xl md:text-8xl lg:text-9xl font-bold mb-6 leading-tight"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: 0.2 }}
                        >
                            <span className="bg-gradient-to-r from-slate-800 via-amber-700 to-orange-600 bg-clip-text text-transparent">
                                无尽之旅
                            </span>
                        </motion.h1>
                        
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: 0.4 }}
                            className="mb-8"
                        >
                            <div className="text-2xl md:text-3xl lg:text-4xl font-light text-slate-600 mb-4">
                                Timeless Trips
                            </div>
                            <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-orange-500 mx-auto rounded-full"></div>
                        </motion.div>
                        
                        <motion.p 
                            className="text-xl md:text-2xl lg:text-3xl text-slate-600 mb-12 max-w-4xl mx-auto leading-relaxed font-light"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: 0.6 }}
                        >
                            重返20岁，致敬青春。在地图上记录每一次旅程，让世界成为你的故事。
                        </motion.p>

                        {/* 搜索框 */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: 0.8 }}
                            className="max-w-2xl mx-auto mb-12"
                        >
                            <div className="relative group">
                                <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-slate-400 w-6 h-6 group-focus-within:text-amber-500 transition-colors" />
                                <input
                                    type="text"
                                    placeholder="搜索目的地、故事、回忆..."
                                    className="w-full pl-16 pr-6 py-5 bg-white/80 backdrop-blur-sm border-2 border-slate-200 rounded-2xl text-slate-700 placeholder-slate-400 focus:outline-none focus:border-amber-400 focus:bg-white transition-all duration-300 text-lg shadow-lg hover:shadow-xl"
                                />
                                <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                                    <button className="px-6 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl hover:from-amber-600 hover:to-orange-600 transition-all duration-300 font-medium">
                                        探索
                                    </button>
                                </div>
                            </div>
                        </motion.div>

                        {/* 快速入口 */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: 1 }}
                            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto"
                        >
                            {mvpFeatures.map((feature, index) => (
                                <motion.div
                                    key={feature.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8, delay: 1.2 + index * 0.1 }}
                                >
                                    <Link
                                        to={feature.path}
                                        className="block group"
                                    >
                                        <div className={`${feature.bgColor} rounded-3xl p-6 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-white/50 backdrop-blur-sm`}>
                                            <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                                                <feature.icon className="w-8 h-8 text-white" />
                                            </div>
                                            <div className="text-lg font-semibold text-slate-700 mb-2 text-center">
                                                {feature.title}
                                            </div>
                                            <div className="text-sm text-slate-500 text-center leading-relaxed">
                                                {feature.description}
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </motion.div>

                        {/* 滚动提示 */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1, delay: 1.6 }}
                            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
                        >
                            <div className="flex flex-col items-center text-slate-400">
                                <span className="text-sm mb-2">向下滚动探索更多</span>
                                <div className="w-6 h-10 border-2 border-slate-300 rounded-full flex justify-center">
                                    <div className="w-1 h-3 bg-slate-300 rounded-full mt-2 animate-bounce"></div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* 统计信息 - 重新设计 */}
            <section className="py-20 bg-white/50 backdrop-blur-sm">
                <div className="max-w-7xl mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
                            探索数据
                        </h2>
                        <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                            发现世界各地的精彩故事和美好回忆
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
                        {[
                            { icon: BookOpen, value: stats.guides, label: '精选攻略', color: 'from-blue-500 to-blue-600', bgColor: 'bg-blue-50' },
                            { icon: MapPin, value: stats.destinations, label: '目的地', color: 'from-emerald-500 to-emerald-600', bgColor: 'bg-emerald-50' },
                            { icon: Camera, value: stats.photos, label: '精彩照片', color: 'from-rose-500 to-rose-600', bgColor: 'bg-rose-50' },
                            { icon: Globe, value: stats.users, label: '活跃用户', color: 'from-violet-500 to-violet-600', bgColor: 'bg-violet-50' },
                            { icon: Heart, value: stats.favorites, label: '收藏数', color: 'from-pink-500 to-pink-600', bgColor: 'bg-pink-50' },
                            { icon: Star, value: stats.reviews, label: '评价数', color: 'from-amber-500 to-amber-600', bgColor: 'bg-amber-50' }
                        ].map((stat, index) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="text-center group"
                            >
                                <div className={`${stat.bgColor} w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                                    <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center`}>
                                        <stat.icon className="w-6 h-6 text-white" />
                                    </div>
                                </div>
                                <div className="text-4xl font-bold text-slate-800 mb-2">{stat.value}</div>
                                <div className="text-slate-600 font-medium">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 快速筛选 - 重新设计 */}
            <section className="py-16 bg-gradient-to-r from-slate-50 to-blue-50">
                <div className="max-w-7xl mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h3 className="text-3xl font-bold text-slate-800 mb-4">
                            快速筛选
                        </h3>
                        <p className="text-lg text-slate-600">
                            找到您感兴趣的旅行内容
                        </p>
                    </motion.div>

                    <div className="flex flex-wrap justify-center gap-4">
                        {filterOptions.map((option, index) => (
                            <motion.button
                                key={option.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                onClick={() => setSelectedFilter(option.id)}
                                className={`px-6 py-3 rounded-2xl text-sm font-medium transition-all duration-300 ${
                                    selectedFilter === option.id
                                        ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg'
                                        : 'bg-white text-slate-600 hover:bg-slate-100 hover:shadow-md'
                                }`}
                            >
                                <span className="mr-2">{option.icon}</span>
                                {option.label}
                            </motion.button>
                        ))}
                    </div>
                </div>
            </section>

            {/* 精选行程 - 重新设计 */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
                            精选行程推荐
                        </h2>
                        <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                            精选全球精彩旅行路线，带您探索世界的美好
                        </p>
                    </motion.div>

                    <FeaturedRoutes />
                </div>
            </section>

            {/* 特色功能展示 - 重新设计 */}
            <section className="py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
                <div className="max-w-7xl mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
                            特色功能
                        </h2>
                        <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                            多种方式记录和分享您的旅行故事
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {mvpFeatures.map((feature, index) => (
                            <motion.div
                                key={feature.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: index * 0.1 }}
                                viewport={{ once: true }}
                            >
                                <Link to={feature.path}>
                                    <div className="bg-white rounded-3xl p-8 text-center hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-slate-100">
                                        <div className={`w-20 h-20 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg`}>
                                            <feature.icon className="w-10 h-10 text-white" />
                                        </div>
                                        <h3 className="text-2xl font-bold text-slate-800 mb-4">{feature.title}</h3>
                                        <p className="text-slate-600 leading-relaxed">
                                            {feature.description}
                                        </p>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 最新动态 - 重新设计 */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
                            最新动态
                        </h2>
                        <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                            了解最新的旅行故事和平台更新
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { date: '2024-10-15', title: '新增东北秋季摄影攻略', color: 'from-blue-500 to-blue-600' },
                            { date: '2024-10-10', title: '呼伦贝尔草原路线更新', color: 'from-emerald-500 to-emerald-600' },
                            { date: '2024-10-05', title: '长白山天池最佳拍摄时间', color: 'from-rose-500 to-rose-600' }
                        ].map((item, index) => (
                            <motion.div
                                key={item.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-3xl p-8 border border-slate-100 hover:shadow-xl transition-all duration-300"
                            >
                                <div className={`w-12 h-12 bg-gradient-to-r ${item.color} rounded-xl flex items-center justify-center mb-4`}>
                                    <Mountain className="w-6 h-6 text-white" />
                                </div>
                                <div className="text-sm text-slate-500 mb-2">{item.date}</div>
                                <div className="text-lg font-semibold text-slate-800">{item.title}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
