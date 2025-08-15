import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Calendar, Camera, BookOpen, Globe, Heart, Star, Search, ArrowRight } from 'lucide-react';
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
            color: 'bg-blue-500',
            icon: MapPin
        },
        {
            id: 'timeline',
            title: '📅 时间轴',
            description: '按时间顺序回顾旅行回忆',
            path: '/timeline',
            color: 'bg-green-500',
            icon: Calendar
        },
        {
            id: 'photos',
            title: '📸 相册回忆',
            description: '瀑布流展示旅行照片和视频',
            path: '/photos',
            color: 'bg-red-500',
            icon: Camera
        },
        {
            id: 'guides',
            title: '📖 旅行攻略',
            description: '查看和分享旅行攻略',
            path: '/guides',
            color: 'bg-purple-500',
            icon: BookOpen
        }
    ];

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Hero Banner - 保持原有结构但采用新风格 */}
            <section className="relative overflow-hidden bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 rounded-3xl shadow-2xl mb-12 p-8 md:p-12 text-center">
                {/* 背景装饰 */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-10 left-10 w-32 h-32 bg-amber-300 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-10 right-10 w-40 h-40 bg-orange-400 rounded-full blur-3xl"></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-red-500 rounded-full blur-3xl"></div>
                </div>

                {/* 地图背景装饰 */}
                <div className="absolute inset-0 opacity-10">
                    <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <path
                            d="M10,50 Q25,30 40,50 T70,50 T100,50"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="0.5"
                            className="text-amber-600"
                        />
                        <circle cx="10" cy="50" r="1" fill="currentColor" className="text-amber-600" />
                        <circle cx="40" cy="50" r="1" fill="currentColor" className="text-amber-600" />
                        <circle cx="70" cy="50" r="1" fill="currentColor" className="text-amber-600" />
                        <circle cx="100" cy="50" r="1" fill="currentColor" className="text-amber-600" />
                    </svg>
                </div>

                <div className="relative z-10 max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="flex justify-center mb-6">
                            <div className="relative">
                                <img
                                    src="/images/jimeng-2.png"
                                    alt="Timeless Trips"
                                    className="w-16 h-16 md:w-20 md:h-20 rounded-2xl shadow-lg"
                                />
                                <div className="absolute -top-2 -right-2 w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center">
                                    <Globe className="w-3 h-3 text-white" />
                                </div>
                            </div>
                        </div>

                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-800 mb-6 leading-tight">
                            无尽之旅
                            <span className="block text-3xl md:text-4xl lg:text-5xl text-amber-600 mt-2">
                                Timeless Trips
                            </span>
                        </h1>

                        <p className="text-lg md:text-xl lg:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
                            重返20岁，致敬青春。在地图上记录每一次旅程，让世界成为你的故事。
                        </p>

                        {/* 搜索框 */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="max-w-2xl mx-auto mb-8"
                        >
                            <div className="relative">
                                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="text"
                                    placeholder="搜索目的地、故事、回忆..."
                                    className="w-full pl-12 pr-4 py-4 bg-white/90 backdrop-blur-sm border-2 border-amber-200 rounded-2xl text-gray-700 placeholder-gray-400 focus:outline-none focus:border-amber-400 focus:bg-white transition-all duration-300"
                                />
                            </div>
                        </motion.div>

                        {/* 快速入口 */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto"
                        >
                            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 hover:bg-white hover:shadow-xl transition-all duration-300 cursor-pointer group transform hover:-translate-y-1">
                                <MapPin className="w-8 h-8 text-amber-500 mx-auto mb-2 group-hover:scale-110 transition-transform duration-300" />
                                <div className="text-sm font-medium text-gray-700">世界地图</div>
                            </div>
                            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 hover:bg-white hover:shadow-xl transition-all duration-300 cursor-pointer group transform hover:-translate-y-1">
                                <Calendar className="w-8 h-8 text-orange-500 mx-auto mb-2 group-hover:scale-110 transition-transform duration-300" />
                                <div className="text-sm font-medium text-gray-700">时间轴</div>
                            </div>
                            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 hover:bg-white hover:shadow-xl transition-all duration-300 cursor-pointer group transform hover:-translate-y-1">
                                <Camera className="w-8 h-8 text-red-500 mx-auto mb-2 group-hover:scale-110 transition-transform duration-300" />
                                <div className="text-sm font-medium text-gray-700">相册回忆</div>
                            </div>
                            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 hover:bg-white hover:shadow-xl transition-all duration-300 cursor-pointer group transform hover:-translate-y-1">
                                <div className="w-8 h-8 bg-amber-500 rounded-full mx-auto mb-2 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                    <span className="text-white text-sm font-bold">📖</span>
                                </div>
                                <div className="text-sm font-medium text-gray-700">旅行攻略</div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* MVP功能导航 - 新增 */}
            <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="mb-12"
            >
                <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-gray-800 mb-4">
                            🚀 MVP功能展示
                        </h2>
                        <p className="text-lg text-gray-600">
                            点击下方功能模块，体验完整的旅行记录功能
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {mvpFeatures.map((feature, index) => (
                            <motion.div
                                key={feature.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.2 + index * 0.1 }}
                            >
                                <Link
                                    to={feature.path}
                                    className="block bg-gray-50 rounded-2xl p-6 hover:bg-white hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-200 group"
                                >
                                    <div className={`w-16 h-16 ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                                        <feature.icon className="w-8 h-8 text-white" />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-800 mb-2 text-center">
                                        {feature.title}
                                    </h3>
                                    <p className="text-gray-600 text-sm text-center mb-4">
                                        {feature.description}
                                    </p>
                                    <div className="flex items-center justify-center text-primary-600 font-medium group-hover:text-primary-700 transition-colors">
                                        <span>立即体验</span>
                                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.section>

            {/* 统计信息 - 采用新风格 */}
            <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="mb-12"
            >
                <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                        📊 无尽之旅数据概览
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                        <div className="text-center group">
                            <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:bg-primary-200 transition-colors">
                                <BookOpen className="w-8 h-8 text-primary-600" />
                            </div>
                            <div className="text-3xl font-bold text-gray-800 mb-2">{stats.guides}</div>
                            <div className="text-gray-600 text-sm">精选攻略</div>
                        </div>
                        <div className="text-center group">
                            <div className="w-16 h-16 bg-accent-100 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:bg-accent-200 transition-colors">
                                <MapPin className="w-8 h-8 text-accent-600" />
                            </div>
                            <div className="text-3xl font-bold text-gray-800 mb-2">{stats.destinations}</div>
                            <div className="text-gray-600 text-sm">目的地</div>
                        </div>
                        <div className="text-center group">
                            <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:bg-red-200 transition-colors">
                                <Camera className="w-8 h-8 text-red-600" />
                            </div>
                            <div className="text-3xl font-bold text-gray-800 mb-2">{stats.photos}</div>
                            <div className="text-gray-600 text-sm">精彩照片</div>
                        </div>
                        <div className="text-center group">
                            <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:bg-green-200 transition-colors">
                                <Globe className="w-8 h-8 text-green-600" />
                            </div>
                            <div className="text-3xl font-bold text-gray-800 mb-2">{stats.users}</div>
                            <div className="text-gray-600 text-sm">活跃用户</div>
                        </div>
                        <div className="text-center group">
                            <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:bg-purple-200 transition-colors">
                                <Heart className="w-8 h-8 text-purple-600" />
                            </div>
                            <div className="text-3xl font-bold text-gray-800 mb-2">{stats.favorites}</div>
                            <div className="text-gray-600 text-sm">收藏数</div>
                        </div>
                        <div className="text-center group">
                            <div className="w-16 h-16 bg-yellow-100 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:bg-yellow-200 transition-colors">
                                <Star className="w-8 h-8 text-yellow-600" />
                            </div>
                            <div className="text-3xl font-bold text-gray-800 mb-2">{stats.reviews}</div>
                            <div className="text-gray-600 text-sm">评价数</div>
                        </div>
                    </div>
                </div>
            </motion.section>

            {/* 快速筛选 - 保持原有功能 */}
            <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="mb-12"
            >
                <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">
                        快速筛选
                    </h3>
                    <div className="flex flex-wrap gap-3">
                        {filterOptions.map(option => (
                            <button
                                key={option.id}
                                onClick={() => setSelectedFilter(option.id)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${selectedFilter === option.id
                                    ? 'bg-primary-500 text-white shadow-lg'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                    }`}
                            >
                                <span className="mr-2">{option.icon}</span>
                                {option.label}
                            </button>
                        ))}
                    </div>
                </div>
            </motion.section>

            {/* 精选行程 - 保持原有组件 */}
            <FeaturedRoutes />

            {/* 特色功能展示 - 采用新风格 */}
            <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="mb-12"
            >
                <div className="text-center mb-8">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                        特色功能
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        多种方式记录和分享您的旅行故事
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
                        <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <MapPin className="w-8 h-8 text-primary-600" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 mb-2">世界地图</h3>
                        <p className="text-gray-600 text-sm">
                            在地图上标记您的旅行足迹，查看路线轨迹
                        </p>
                    </div>

                    <div className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
                        <div className="w-16 h-16 bg-accent-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <Calendar className="w-8 h-8 text-accent-600" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 mb-2">时间轴</h3>
                        <p className="text-gray-600 text-sm">
                            按时间顺序回顾您的旅行回忆
                        </p>
                    </div>

                    <div className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
                        <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <Camera className="w-8 h-8 text-red-600" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 mb-2">相册回忆</h3>
                        <p className="text-gray-600 text-sm">
                            瀑布流展示您的旅行照片和视频
                        </p>
                    </div>

                    <div className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
                        <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <BookOpen className="w-8 h-8 text-primary-600" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 mb-2">旅行攻略</h3>
                        <p className="text-gray-600 text-sm">
                            分享您的旅行经验和实用攻略
                        </p>
                    </div>
                </div>
            </motion.section>

            {/* 最新动态 - 采用新风格 */}
            <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="mb-12"
            >
                <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                        🆕 最新动态
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="border-l-4 border-primary-500 pl-4">
                            <div className="text-sm text-gray-500 mb-1">2024-10-15</div>
                            <div className="text-gray-800 font-medium">新增东北秋季摄影攻略</div>
                        </div>
                        <div className="border-l-4 border-accent-500 pl-4">
                            <div className="text-sm text-gray-500 mb-1">2024-10-10</div>
                            <div className="text-gray-800 font-medium">呼伦贝尔草原路线更新</div>
                        </div>
                        <div className="border-l-4 border-red-500 pl-4">
                            <div className="text-sm text-gray-500 mb-1">2024-10-05</div>
                            <div className="text-gray-800 font-medium">长白山天池最佳拍摄时间</div>
                        </div>
                    </div>
                </div>
            </motion.section>
        </div>
    );
};

export default Home;
