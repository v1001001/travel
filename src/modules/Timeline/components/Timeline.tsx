import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Camera, Play, Heart, Share2 } from 'lucide-react';
import { TimelineItem } from '../../../types';
import { format, parseISO } from 'date-fns';
import { zhCN } from 'date-fns/locale';

// 模拟时间轴数据
const timelineData: TimelineItem[] = [
    {
        id: '1',
        date: '2024-10-15',
        title: '长白山天池秋色',
        description: '长白山天池的秋季色彩如画，湖水倒映着金黄色的山峦',
        type: 'photo',
        content: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
        location: '长白山',
        coordinates: { lat: 41.9942, lng: 128.0615 },
        tags: ['长白山', '天池', '秋季', '摄影']
    },
    {
        id: '2',
        date: '2024-10-20',
        title: '呼伦贝尔草原日落',
        description: '呼伦贝尔草原的日落时分，金色的阳光洒在无边的草原上',
        type: 'video',
        content: '/videos/831_1755086568.mp4',
        location: '呼伦贝尔',
        coordinates: { lat: 49.2153, lng: 119.7589 },
        tags: ['呼伦贝尔', '草原', '日落', '视频']
    },
    {
        id: '3',
        date: '2024-10-25',
        title: '大兴安岭白桦林',
        description: '大兴安岭的白桦林在秋季呈现出绚丽的色彩',
        type: 'photo',
        content: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop',
        location: '大兴安岭',
        coordinates: { lat: 51.6720, lng: 124.1960 },
        tags: ['大兴安岭', '白桦林', '秋季', '森林']
    },
    {
        id: '4',
        date: '2024-10-30',
        title: '阿尔山火山地貌',
        description: '阿尔山国家森林公园的火山地貌和秋季色彩',
        type: 'photo',
        content: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
        location: '阿尔山',
        coordinates: { lat: 47.1770, lng: 119.9430 },
        tags: ['阿尔山', '火山', '秋季', '森林公园']
    },
    {
        id: '5',
        date: '2024-11-05',
        title: '漠河北极村极光',
        description: '漠河北极村的极光观测，中国最北端的极地风光',
        type: 'video',
        content: '/videos/831_1755086568.mp4',
        location: '漠河',
        coordinates: { lat: 52.9721, lng: 122.5370 },
        tags: ['漠河', '北极村', '极光', '极地']
    }
];

const Timeline: React.FC = () => {
    const [selectedYear, setSelectedYear] = useState<string>('2024');
    const [selectedMonth, setSelectedMonth] = useState<string>('all');
    const [selectedType, setSelectedType] = useState<'all' | 'photo' | 'video' | 'guide'>('all');
    const [filteredItems, setFilteredItems] = useState<TimelineItem[]>([]);

    useEffect(() => {
        let filtered = timelineData;

        // 按年份筛选
        if (selectedYear !== 'all') {
            filtered = filtered.filter(item =>
                format(parseISO(item.date), 'yyyy') === selectedYear
            );
        }

        // 按月份筛选
        if (selectedMonth !== 'all') {
            filtered = filtered.filter(item =>
                format(parseISO(item.date), 'MM') === selectedMonth
            );
        }

        // 按类型筛选
        if (selectedType !== 'all') {
            filtered = filtered.filter(item => item.type === selectedType);
        }

        setFilteredItems(filtered);
    }, [selectedYear, selectedMonth, selectedType]);

    // 获取年份列表
    const years = Array.from(new Set(timelineData.map(item =>
        format(parseISO(item.date), 'yyyy')
    ))).sort().reverse();

    // 获取月份列表
    const months = [
        { value: 'all', label: '全部月份' },
        { value: '01', label: '1月' },
        { value: '02', label: '2月' },
        { value: '03', label: '3月' },
        { value: '04', label: '4月' },
        { value: '05', label: '5月' },
        { value: '06', label: '6月' },
        { value: '07', label: '7月' },
        { value: '08', label: '8月' },
        { value: '09', label: '9月' },
        { value: '10', label: '10月' },
        { value: '11', label: '11月' },
        { value: '12', label: '12月' }
    ];

    const renderTimelineItem = (item: TimelineItem, index: number) => (
        <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="relative"
        >
            {/* 时间轴连接线 */}
            {index < filteredItems.length - 1 && (
                <div className="absolute left-6 top-16 w-0.5 h-8 bg-primary-200"></div>
            )}

            <div className="flex gap-6">
                {/* 时间点 */}
                <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                        {format(parseISO(item.date), 'dd')}
                    </div>
                </div>

                {/* 内容卡片 */}
                <div className="flex-1 bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                    {/* 媒体内容 */}
                    <div className="relative h-48 overflow-hidden">
                        {item.type === 'video' ? (
                            <video
                                src={item.content}
                                className="w-full h-full object-cover"
                                poster="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop"
                            />
                        ) : (
                            <img
                                src={item.content}
                                alt={item.title}
                                className="w-full h-full object-cover"
                            />
                        )}

                        {/* 类型标识 */}
                        <div className="absolute top-4 left-4">
                            {item.type === 'video' ? (
                                <div className="w-10 h-10 bg-black/50 rounded-full flex items-center justify-center">
                                    <Play className="w-5 h-5 text-white" />
                                </div>
                            ) : (
                                <div className="w-10 h-10 bg-black/50 rounded-full flex items-center justify-center">
                                    <Camera className="w-5 h-5 text-white" />
                                </div>
                            )}
                        </div>

                        {/* 操作按钮 */}
                        <div className="absolute top-4 right-4 flex gap-2">
                            <button className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
                                <Heart className="w-4 h-4 text-white" />
                            </button>
                            <button className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
                                <Share2 className="w-4 h-4 text-white" />
                            </button>
                        </div>
                    </div>

                    {/* 内容信息 */}
                    <div className="p-6">
                        <div className="flex items-center gap-2 text-sm text-primary-400 mb-2">
                            <Calendar className="w-4 h-4" />
                            <span>{format(parseISO(item.date), 'yyyy年MM月dd日', { locale: zhCN })}</span>
                            <MapPin className="w-4 h-4 ml-2" />
                            <span>{item.location}</span>
                        </div>

                        <h3 className="text-xl font-bold text-primary-600 mb-2">
                            {item.title}
                        </h3>

                        <p className="text-primary-500 mb-4">
                            {item.description}
                        </p>

                        {/* 标签 */}
                        <div className="flex flex-wrap gap-2 mb-4">
                            {item.tags.map(tag => (
                                <span
                                    key={tag}
                                    className="px-3 py-1 bg-primary-100 text-primary-600 text-xs rounded-full"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>

                        {/* 操作按钮 */}
                        <div className="flex gap-3">
                            <button className="flex-1 bg-primary-500 text-white py-2 px-4 rounded-xl hover:bg-primary-600 transition-colors font-medium">
                                查看详情
                            </button>
                            <button className="px-4 py-2 border-2 border-primary-200 text-primary-500 rounded-xl hover:border-primary-400 hover:text-primary-600 transition-colors">
                                在地图中查看
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="mb-8"
            >
                <div className="text-center">
                    <h1 className="text-3xl md:text-4xl font-bold text-primary-600 mb-4">
                        📅 旅行时间轴
                    </h1>
                    <p className="text-lg text-primary-500 max-w-2xl mx-auto">
                        按时间顺序回顾您的旅行回忆，重温每一个精彩瞬间
                    </p>
                </div>
            </motion.div>

            {/* 筛选控制面板 */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="bg-white rounded-2xl shadow-lg p-6 mb-8"
            >
                <div className="flex flex-wrap items-center gap-6">
                    {/* 年份筛选 */}
                    <div className="flex items-center gap-3">
                        <span className="text-primary-600 font-medium">年份：</span>
                        <div className="flex gap-2">
                            {years.map(year => (
                                <button
                                    key={year}
                                    onClick={() => setSelectedYear(year)}
                                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${selectedYear === year
                                            ? 'bg-primary-500 text-white'
                                            : 'bg-primary-100 text-primary-600 hover:bg-primary-200'
                                        }`}
                                >
                                    {year}年
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* 月份筛选 */}
                    <div className="flex items-center gap-3">
                        <span className="text-primary-600 font-medium">月份：</span>
                        <select
                            value={selectedMonth}
                            onChange={(e) => setSelectedMonth(e.target.value)}
                            className="px-4 py-2 border border-primary-200 rounded-lg text-primary-600 focus:outline-none focus:border-primary-400"
                        >
                            {months.map(month => (
                                <option key={month.value} value={month.value}>
                                    {month.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* 类型筛选 */}
                    <div className="flex items-center gap-3">
                        <span className="text-primary-600 font-medium">类型：</span>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setSelectedType('all')}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${selectedType === 'all'
                                        ? 'bg-primary-500 text-white'
                                        : 'bg-primary-100 text-primary-600 hover:bg-primary-200'
                                    }`}
                            >
                                全部
                            </button>
                            <button
                                onClick={() => setSelectedType('photo')}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${selectedType === 'photo'
                                        ? 'bg-primary-500 text-white'
                                        : 'bg-primary-100 text-primary-600 hover:bg-primary-200'
                                    }`}
                            >
                                照片
                            </button>
                            <button
                                onClick={() => setSelectedType('video')}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${selectedType === 'video'
                                        ? 'bg-primary-500 text-white'
                                        : 'bg-primary-100 text-primary-600 hover:bg-primary-200'
                                    }`}
                            >
                                视频
                            </button>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* 时间轴内容 */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="space-y-8"
            >
                {filteredItems.length > 0 ? (
                    filteredItems.map((item, index) => renderTimelineItem(item, index))
                ) : (
                    <div className="text-center py-12">
                        <div className="text-6xl mb-4">📅</div>
                        <h3 className="text-xl font-medium text-primary-600 mb-2">
                            暂无相关记录
                        </h3>
                        <p className="text-primary-500">
                            请尝试选择其他筛选条件或稍后再来查看
                        </p>
                    </div>
                )}
            </motion.div>
        </div>
    );
};

export default Timeline;
