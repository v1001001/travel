import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Guide } from '../../../types';
import guidesData from '../../../data/guides.json';

const GuideDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [guide, setGuide] = useState<Guide | null>(null);

    useEffect(() => {
        const foundGuide = guidesData.find(g => g.id === id);
        setGuide(foundGuide || null);
    }, [id]);

    if (!guide) {
        return (
            <div className="max-w-4xl mx-auto px-4 py-12 text-center">
                <div className="text-6xl mb-4">😵</div>
                <h1 className="text-2xl font-bold text-primary-600 mb-4">
                    攻略未找到
                </h1>
                <p className="text-primary-500 mb-6">
                    抱歉，您查找的攻略不存在或已被移除
                </p>
                <Link to="/guides" className="btn-primary">
                    返回攻略列表
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            {/* 返回按钮 */}
            <Link
                to="/guides"
                className="inline-flex items-center gap-2 text-primary-400 hover:text-primary-600 mb-6 transition-colors"
            >
                ← 返回攻略列表
            </Link>

            {/* 攻略头部 */}
            <div className="card overflow-hidden mb-8">
                <div className="relative h-64 md:h-80">
                    <img
                        src={guide.cover}
                        alt={guide.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    <div className="absolute bottom-6 left-6 right-6 text-white">
                        <h1 className="text-3xl md:text-4xl font-bold mb-2">
                            {guide.title}
                        </h1>
                        <p className="text-lg opacity-90">
                            {guide.destination}
                        </p>
                    </div>
                </div>
            </div>

            {/* 攻略信息 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                {/* 基本信息 */}
                <div className="card p-6">
                    <h2 className="text-xl font-bold text-primary-600 mb-4">
                        📋 基本信息
                    </h2>
                    <div className="space-y-3">
                        <div className="flex justify-between">
                            <span className="text-primary-500">目的地：</span>
                            <span className="text-primary-600 font-medium">{guide.destination}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-primary-500">最佳季节：</span>
                            <span className="text-primary-600 font-medium">{guide.bestSeason}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-primary-500">行程天数：</span>
                            <span className="text-primary-600 font-medium">{guide.days}天</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-primary-500">预算范围：</span>
                            <span className="text-primary-600 font-medium">
                                ¥{guide.budget.min.toLocaleString()} - ¥{guide.budget.max.toLocaleString()}
                            </span>
                        </div>
                    </div>
                </div>

                {/* 标签 */}
                <div className="card p-6">
                    <h2 className="text-xl font-bold text-primary-600 mb-4">
                        🏷️ 特色标签
                    </h2>
                    <div className="flex flex-wrap gap-2">
                        {guide.tags.map((tag, index) => (
                            <span
                                key={index}
                                className="px-3 py-2 bg-primary-200/50 text-primary-400 text-sm rounded-full border border-primary-300/30"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            {/* 攻略内容 */}
            <div className="card p-6 mb-8">
                <h2 className="text-xl font-bold text-primary-600 mb-4">
                    📝 攻略详情
                </h2>
                <div className="prose prose-primary max-w-none">
                    <p className="text-primary-500 leading-relaxed text-lg">
                        {guide.excerpt}
                    </p>

                    {/* TODO: 这里可以添加更详细的攻略内容 */}
                    <div className="mt-6 p-4 bg-primary-50 rounded-lg border border-primary-200/30">
                        <p className="text-primary-500 text-sm">
                            🚧 详细攻略内容正在编写中，敬请期待...
                        </p>
                    </div>
                </div>
            </div>

            {/* 相关推荐 */}
            <div className="card p-6">
                <h2 className="text-xl font-bold text-primary-600 mb-4">
                    🔗 相关推荐
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {guidesData
                        .filter(g => g.id !== guide.id)
                        .slice(0, 2)
                        .map(relatedGuide => (
                            <Link
                                key={relatedGuide.id}
                                to={`/guides/${relatedGuide.id}`}
                                className="block p-4 bg-primary-50 rounded-lg border border-primary-200/30 hover:bg-primary-100 transition-colors"
                            >
                                <h3 className="font-medium text-primary-600 mb-2">
                                    {relatedGuide.title}
                                </h3>
                                <p className="text-sm text-primary-500">
                                    {relatedGuide.excerpt.substring(0, 60)}...
                                </p>
                            </Link>
                        ))}
                </div>
            </div>
        </div>
    );
};

export default GuideDetail;

