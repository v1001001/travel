import React from 'react';
import { Link } from 'react-router-dom';
import { Guide } from '../../../types';

interface GuideCardProps {
    guide: Guide;
}

const GuideCard: React.FC<GuideCardProps> = ({ guide }) => {
    return (
        <div className="card overflow-hidden group cursor-pointer">
            <div className="relative overflow-hidden">
                <img
                    src={guide.cover}
                    alt={guide.title}
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            <div className="p-6">
                <h3 className="text-xl font-bold text-primary-600 mb-2 group-hover:text-primary-400 transition-colors">
                    {guide.title}
                </h3>

                <div className="flex items-center gap-2 text-sm text-primary-400 mb-3">
                    <span>📍 {guide.destination}</span>
                    <span>•</span>
                    <span>🌤️ {guide.bestSeason}</span>
                    <span>•</span>
                    <span>📅 {guide.days}天</span>
                </div>

                <p className="text-primary-500 text-sm leading-relaxed mb-4">
                    {guide.excerpt}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                    {guide.tags.slice(0, 4).map((tag, index) => (
                        <span
                            key={index}
                            className="px-3 py-1 bg-primary-200/50 text-primary-400 text-xs rounded-full border border-primary-300/30"
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                <div className="flex items-center justify-between">
                    <Link
                        to={`/guides/${guide.id}`}
                        className="btn-primary text-sm"
                    >
                        查看详情
                    </Link>

                    <div className="text-right">
                        <div className="text-sm text-primary-400">
                            ¥{guide.budget.min.toLocaleString()} - ¥{guide.budget.max.toLocaleString()}
                        </div>
                        <div className="text-xs text-primary-500">
                            预算范围
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GuideCard;
