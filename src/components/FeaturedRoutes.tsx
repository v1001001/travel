import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, DollarSign, Clock, Heart, Share2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Guide } from '../types';
import guidesData from '../data/guides.json';

const FeaturedRoutes: React.FC = () => {
    const featuredGuides = guidesData.slice(0, 2); // 只显示前2个攻略

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {featuredGuides.map((guide, index) => (
                <motion.div
                    key={guide.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.2 }}
                    viewport={{ once: true }}
                    className="group cursor-pointer"
                >
                    <Link to={`/guides/${guide.id}`}>
                        <div className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-slate-100">
                            {/* 封面图片 */}
                            <div className="relative h-80 overflow-hidden">
                                <img
                                    src={guide.cover}
                                    alt={guide.title}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                    onError={(e) => {
                                        e.currentTarget.src = "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop";
                                    }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                                
                                {/* 操作按钮 */}
                                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <button className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
                                        <Heart className="w-5 h-5 text-white" />
                                    </button>
                                    <button className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
                                        <Share2 className="w-5 h-5 text-white" />
                                    </button>
                                </div>

                                {/* 标签 */}
                                <div className="absolute bottom-4 left-4 right-4">
                                    <div className="flex flex-wrap gap-2">
                                        {guide.tags.slice(0, 3).map(tag => (
                                            <span
                                                key={tag}
                                                className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-sm rounded-full font-medium"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* 内容 */}
                            <div className="p-8">
                                <h3 className="text-2xl font-bold text-slate-800 mb-4 group-hover:text-amber-600 transition-colors">
                                    {guide.title}
                                </h3>
                                
                                <p className="text-slate-600 mb-6 leading-relaxed">
                                    {guide.excerpt}
                                </p>

                                {/* 行程信息 */}
                                <div className="space-y-3 mb-6">
                                    <div className="flex items-center text-sm text-slate-500">
                                        <MapPin className="w-4 h-4 mr-3 text-blue-500" />
                                        <span>{guide.destination}</span>
                                    </div>
                                    <div className="flex items-center text-sm text-slate-500">
                                        <Calendar className="w-4 h-4 mr-3 text-emerald-500" />
                                        <span>最佳季节：{guide.bestSeason}</span>
                                    </div>
                                    <div className="flex items-center text-sm text-slate-500">
                                        <Clock className="w-4 h-4 mr-3 text-rose-500" />
                                        <span>{guide.days}天行程</span>
                                    </div>
                                    <div className="flex items-center text-sm text-slate-500">
                                        <DollarSign className="w-4 h-4 mr-3 text-violet-500" />
                                        <span>预算：{guide.budget.min.toLocaleString()}-{guide.budget.max.toLocaleString()} {guide.budget.currency}</span>
                                    </div>
                                </div>

                                {/* 操作按钮 */}
                                <div className="flex gap-3">
                                    <button className="flex-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white py-3 px-6 rounded-2xl hover:from-amber-600 hover:to-orange-600 transition-all duration-300 font-medium shadow-lg hover:shadow-xl">
                                        查看详情
                                    </button>
                                    <button className="px-4 py-3 border-2 border-slate-200 text-slate-600 rounded-2xl hover:border-amber-400 hover:text-amber-600 transition-all duration-300">
                                        <Heart className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </Link>
                </motion.div>
            ))}
        </div>
    );
};

export default FeaturedRoutes;
