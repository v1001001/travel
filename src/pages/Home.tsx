import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import HeroBanner from '../components/HeroBanner';
import FeaturedRoutes from '../components/FeaturedRoutes';

const Home: React.FC = () => {
    return (
        <div className="min-h-screen">
            <HeroBanner />
            <FeaturedRoutes />

            {/* 测试链接 */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="bg-white rounded-2xl shadow-lg p-8">
                    <h2 className="text-2xl font-bold text-primary-600 mb-6 text-center">
                        🧪 测试链接
                    </h2>
                    <div className="flex flex-wrap gap-4 justify-center">
                        <Link
                            to="/guides/northeast-hulunbeier"
                            className="px-6 py-3 bg-primary-500 text-white rounded-xl hover:bg-primary-600 transition-colors"
                        >
                            查看东北+呼伦贝尔攻略详情
                        </Link>
                        <Link
                            to="/guides/dongbei-hulunbeier-loop"
                            className="px-6 py-3 bg-accent-500 text-white rounded-xl hover:bg-accent-600 transition-colors"
                        >
                            查看东三省环线攻略详情
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
