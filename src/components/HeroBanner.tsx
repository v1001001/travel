import React from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, Globe, Compass } from 'lucide-react';

const HeroBanner: React.FC = () => {
    return (
        <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
            {/* 背景装饰 - 极简几何元素 */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute top-20 left-20 w-64 h-64 bg-amber-300 rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 right-20 w-80 h-80 bg-orange-400 rounded-full blur-3xl"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-red-500 rounded-full blur-3xl"></div>
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

            <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                >
                    {/* Logo */}
                    <div className="flex justify-center mb-8">
                        <div className="relative">
                            <img
                                src="/images/jimeng-2.png"
                                alt="Timeless Trips"
                                className="w-20 h-20 md:w-24 md:h-24 rounded-2xl shadow-2xl"
                            />
                            <div className="absolute -top-2 -right-2 w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center">
                                <Globe className="w-4 h-4 text-white" />
                            </div>
                        </div>
                    </div>

                    {/* 主标题 */}
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="text-5xl md:text-7xl lg:text-8xl font-bold text-gray-800 mb-6 leading-tight"
                    >
                        <span className="block">环形世界</span>
                        <span className="block text-4xl md:text-5xl lg:text-6xl text-amber-600 mt-2">
                            Timeless Trips
                        </span>
                    </motion.h1>

                    {/* 副标题 */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.4 }}
                        className="text-xl md:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed"
                    >
                        重返20岁，致敬青春。在地图上记录每一次旅程，让世界成为你的故事。
                    </motion.p>

                    {/* 搜索框 */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.6 }}
                        className="max-w-2xl mx-auto mb-12"
                    >
                        <div className="relative">
                            <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
                            <input
                                type="text"
                                placeholder="搜索目的地、故事、回忆..."
                                className="w-full pl-16 pr-6 py-5 bg-white/90 backdrop-blur-sm border-2 border-amber-200 rounded-2xl text-gray-700 placeholder-gray-400 focus:outline-none focus:border-amber-400 focus:bg-white text-lg shadow-xl"
                            />
                            <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-amber-500 text-white px-6 py-3 rounded-xl hover:bg-amber-600 transition-colors">
                                探索
                            </button>
                        </div>
                    </motion.div>

                    {/* 快速入口 */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.8 }}
                        className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
                    >
                        <div className="group cursor-pointer">
                            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 hover:bg-white hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                                <div className="w-16 h-16 bg-amber-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-amber-200 transition-colors">
                                    <MapPin className="w-8 h-8 text-amber-600" />
                                </div>
                                <div className="text-lg font-semibold text-gray-800">世界地图</div>
                                <div className="text-sm text-gray-600 mt-1">探索足迹</div>
                            </div>
                        </div>

                        <div className="group cursor-pointer">
                            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 hover:bg-white hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                                <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-orange-200 transition-colors">
                                    <Compass className="w-8 h-8 text-orange-600" />
                                </div>
                                <div className="text-lg font-semibold text-gray-800">时间轴</div>
                                <div className="text-sm text-gray-600 mt-1">回忆故事</div>
                            </div>
                        </div>

                        <div className="group cursor-pointer">
                            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 hover:bg-white hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                                <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-red-200 transition-colors">
                                    <Globe className="w-8 h-8 text-red-600" />
                                </div>
                                <div className="text-lg font-semibold text-gray-800">相册回忆</div>
                                <div className="text-sm text-gray-600 mt-1">精彩瞬间</div>
                            </div>
                        </div>

                        <div className="group cursor-pointer">
                            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 hover:bg-white hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                                <div className="w-16 h-16 bg-amber-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-amber-200 transition-colors">
                                    <span className="text-2xl">📖</span>
                                </div>
                                <div className="text-lg font-semibold text-gray-800">旅行攻略</div>
                                <div className="text-sm text-gray-600 mt-1">经验分享</div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </div>

            {/* 滚动提示 */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1.2 }}
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            >
                <div className="flex flex-col items-center text-gray-500">
                    <span className="text-sm mb-2">开始探索</span>
                    <div className="w-6 h-10 border-2 border-gray-300 rounded-full flex justify-center">
                        <div className="w-1 h-3 bg-gray-300 rounded-full mt-2 animate-bounce"></div>
                    </div>
                </div>
            </motion.div>
        </section>
    );
};

export default HeroBanner;
