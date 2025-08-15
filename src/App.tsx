import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import TravelMap from './modules/TravelMap/components/TravelMap';
import Timeline from './modules/Timeline/components/Timeline';
import PhotoGallery from './modules/PhotoMemories/components/PhotoGallery';
import GuidesList from './modules/TravelGuides/pages/GuidesList';
import GuideDetail from './modules/TravelGuides/pages/GuideDetail';

function App() {
    return (
        <Router>
            <div className="min-h-screen bg-gray-50">
                <Header />

                {/* 为固定导航栏添加间距 */}
                <div className="pt-16">
                    <Routes>
                        {/* 首页 */}
                        <Route path="/" element={<Home />} />

                        {/* 旅行地图 */}
                        <Route path="/map" element={<TravelMap />} />

                        {/* 时间轴 */}
                        <Route path="/timeline" element={<Timeline />} />

                        {/* 相册回忆 */}
                        <Route path="/photos" element={<PhotoGallery />} />

                        {/* 旅行攻略 */}
                        <Route path="/guides" element={<GuidesList />} />
                        <Route path="/guides/:id" element={<GuideDetail />} />

                        {/* 目的地探索 */}
                        <Route path="/destinations" element={
                            <div className="max-w-7xl mx-auto px-6 py-12">
                                <div className="text-center">
                                    <div className="text-6xl mb-4">📍</div>
                                    <h2 className="text-3xl font-bold text-gray-800 mb-4">
                                        目的地探索
                                    </h2>
                                    <p className="text-gray-600 text-lg">
                                        探索世界各地的精彩目的地，发现更多旅行灵感
                                    </p>
                                </div>
                            </div>
                        } />

                        {/* 404页面 */}
                        <Route path="*" element={
                            <div className="max-w-7xl mx-auto px-6 py-12">
                                <div className="text-center">
                                    <div className="text-6xl mb-4">404</div>
                                    <h2 className="text-3xl font-bold text-gray-800 mb-4">
                                        页面未找到
                                    </h2>
                                    <p className="text-gray-600 text-lg">
                                        抱歉，您访问的页面不存在
                                    </p>
                                </div>
                            </div>
                        } />
                    </Routes>
                </div>

                <Footer />
            </div>
        </Router>
    );
}

export default App;
