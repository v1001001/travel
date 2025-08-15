import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, DollarSign, Clock, Heart, Share2 } from 'lucide-react';
import { Guide } from '../types';
import guidesData from '../data/guides.json';

const FeaturedRoutes: React.FC = () => {
    const featuredGuides = guidesData.slice(0, 3); // 显示前3个攻略

    return (
        <section className="mb-12">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center mb-8"
            >
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                    精选行程推荐
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    精选东北地区最精华的自驾路线，带您领略最美的秋季风光
                </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {featuredGuides.map((guide, index) => (
                    <motion.div
                        key={guide.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: index * 0.1 }}
                        className="group cursor-pointer"
                    >
                        <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
                            {/* 封面图片 */}
                            <div className="relative h-48 overflow-hidden">
                                <img
                                    src={guide.cover}
                                    alt={guide.title}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>

                                {/* 操作按钮 */}
                                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <button className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
                                        <Heart className="w-4 h-4 text-white" />
                                    </button>
                                    <button className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
                                        <Share2 className="w-4 h-4 text-white" />
                                    </button>
                                </div>

                                {/* 标签 */}
                                <div className="absolute bottom-4 left-4 right-4">
                                    <div className="flex flex-wrap gap-2">
                                        {guide.tags.slice(0, 3).map(tag => (
                                            <span
                                                key={tag}
                                                className="px-2 py-1 bg-white/20 backdrop-blur-sm text-white text-xs rounded-full"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* 内容 */}
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-primary-600 transition-colors">
                                    {guide.title}
                                </h3>

                                <p className="text-gray-600 mb-4 line-clamp-2">
                                    {guide.excerpt}
                                </p>

                                {/* 行程信息 */}
                                <div className="space-y-2 mb-4">
                                    <div className="flex items-center text-sm text-gray-500">
                                        <MapPin className="w-4 h-4 mr-2 text-primary-500" />
                                        <span>{guide.destination}</span>
                                    </div>
                                    <div className="flex items-center text-sm text-gray-500">
                                        <Calendar className="w-4 h-4 mr-2 text-accent-500" />
                                        <span>最佳季节：{guide.bestSeason}</span>
                                    </div>
                                    <div className="flex items-center text-sm text-gray-500">
                                        <Clock className="w-4 h-4 mr-2 text-red-500" />
                                        <span>{guide.days}天行程</span>
                                    </div>
                                    <div className="flex items-center text-sm text-gray-500">
                                        <DollarSign className="w-4 h-4 mr-2 text-green-500" />
                                        <span>预算：{guide.budget.min.toLocaleString()}-{guide.budget.max.toLocaleString()} {guide.budget.currency}</span>
                                    </div>
                                </div>

                                {/* 操作按钮 */}
                                <div className="flex gap-3">
                                    <button className="flex-1 bg-primary-500 text-white py-2 px-4 rounded-xl hover:bg-primary-600 transition-colors font-medium">
                                        查看详情
                                    </button>
                                    <button className="px-4 py-2 border-2 border-gray-200 text-gray-600 rounded-xl hover:border-primary-400 hover:text-primary-600 transition-colors">
                                        ❤️
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* 查看更多按钮 */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="text-center mt-8"
            >
                <button className="bg-primary-500 text-white px-8 py-3 rounded-2xl hover:bg-primary-600 transition-colors font-medium text-lg shadow-lg hover:shadow-xl">
                    查看更多行程
                </button>
            </motion.div>
        </section>
    );
};

export default FeaturedRoutes;
