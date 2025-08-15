import React, { useState, useEffect } from 'react';
import GuideCard from '../components/GuideCard';
import { Guide } from '../../../types';
import guidesData from '../../../data/guides.json';

const GuidesList: React.FC = () => {
    const [guides, setGuides] = useState<Guide[]>([]);
    const [filteredGuides, setFilteredGuides] = useState<Guide[]>([]);
    const [selectedTag, setSelectedTag] = useState<string>('all');

    useEffect(() => {
        setGuides(guidesData);
        setFilteredGuides(guidesData);
    }, []);

    useEffect(() => {
        if (selectedTag === 'all') {
            setFilteredGuides(guides);
        } else {
            setFilteredGuides(guides.filter(guide => guide.tags.includes(selectedTag)));
        }
    }, [selectedTag, guides]);

    const allTags = Array.from(new Set(guides.flatMap(guide => guide.tags)));

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* 统计信息 */}
            <div className="card mb-8 p-8">
                <h2 className="text-2xl font-bold text-primary-600 mb-6 text-center">
                    📊 东北旅行概览
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div className="text-center">
                        <div className="text-3xl font-bold text-primary-400 mb-2">
                            {guides.length}
                        </div>
                        <div className="text-primary-500">精选路线</div>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl font-bold text-primary-400 mb-2">
                            20+
                        </div>
                        <div className="text-primary-500">核心景点</div>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl font-bold text-primary-400 mb-2">
                            8500+
                        </div>
                        <div className="text-primary-500">总里程(公里)</div>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl font-bold text-primary-400 mb-2">
                            9-10月
                        </div>
                        <div className="text-primary-500">最佳季节</div>
                    </div>
                </div>
            </div>

            {/* 标签筛选 */}
            <div className="mb-8">
                <div className="flex flex-wrap gap-3">
                    <button
                        onClick={() => setSelectedTag('all')}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${selectedTag === 'all'
                                ? 'bg-primary-400 text-white'
                                : 'bg-primary-100 text-primary-400 hover:bg-primary-200'
                            }`}
                    >
                        全部
                    </button>
                    {allTags.map(tag => (
                        <button
                            key={tag}
                            onClick={() => setSelectedTag(tag)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${selectedTag === tag
                                    ? 'bg-primary-400 text-white'
                                    : 'bg-primary-100 text-primary-400 hover:bg-primary-200'
                                }`}
                        >
                            {tag}
                        </button>
                    ))}
                </div>
            </div>

            {/* 攻略列表 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredGuides.map(guide => (
                    <GuideCard key={guide.id} guide={guide} />
                ))}
            </div>

            {filteredGuides.length === 0 && (
                <div className="text-center py-12">
                    <div className="text-6xl mb-4">🔍</div>
                    <h3 className="text-xl font-medium text-primary-600 mb-2">
                        暂无相关攻略
                    </h3>
                    <p className="text-primary-500">
                        请尝试选择其他标签或稍后再来查看
                    </p>
                </div>
            )}
        </div>
    );
};

export default GuidesList;
