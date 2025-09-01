import React from 'react';
import { motion } from 'framer-motion';
import HeroBanner from '../components/HeroBanner';
import FeaturedRoutes from '../components/FeaturedRoutes';

const Home: React.FC = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
            <HeroBanner />

            {/* 精选攻略区域 */}
            <section className="py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
                            精选攻略
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                            发现最精彩的旅行路线，让每一次旅程都成为难忘的回忆
                        </p>
                    </motion.div>

                    <FeaturedRoutes />
                </div>
            </section>
        </div>
    );
};

export default Home;
