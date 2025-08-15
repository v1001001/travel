import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, MapPin, Calendar, Heart, Share2, X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from 'lucide-react';
import { Photo } from '../../../types';
import photosData from '../../../data/photos.json';
import { format, parseISO } from 'date-fns';
import { zhCN } from 'date-fns/locale';

const PhotoGallery: React.FC = () => {
    const [photos, setPhotos] = useState<Photo[]>([]);
    const [filteredPhotos, setFilteredPhotos] = useState<Photo[]>([]);
    const [selectedTag, setSelectedTag] = useState<string>('all');
    const [selectedLocation, setSelectedLocation] = useState<string>('all');
    const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [zoom, setZoom] = useState(1);

    useEffect(() => {
        setPhotos(photosData);
        setFilteredPhotos(photosData);
    }, []);

    useEffect(() => {
        let filtered = photos;

        // 按标签筛选
        if (selectedTag !== 'all') {
            filtered = filtered.filter(photo => photo.tags.includes(selectedTag));
        }

        // 按地点筛选
        if (selectedLocation !== 'all') {
            filtered = filtered.filter(photo => photo.location === selectedLocation);
        }

        setFilteredPhotos(filtered);
    }, [selectedTag, selectedLocation, photos]);

    // 获取所有标签和地点
    const allTags = Array.from(new Set(photos.flatMap(photo => photo.tags)));
    const allLocations = Array.from(new Set(photos.map(photo => photo.location)));

    const openFullscreen = (photo: Photo, index: number) => {
        setSelectedPhoto(photo);
        setCurrentIndex(index);
        setIsFullscreen(true);
        setZoom(1);
    };

    const closeFullscreen = () => {
        setIsFullscreen(false);
        setSelectedPhoto(null);
        setZoom(1);
    };

    const nextPhoto = () => {
        if (currentIndex < filteredPhotos.length - 1) {
            setCurrentIndex(currentIndex + 1);
            setSelectedPhoto(filteredPhotos[currentIndex + 1]);
            setZoom(1);
        }
    };

    const prevPhoto = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
            setSelectedPhoto(filteredPhotos[currentIndex - 1]);
            setZoom(1);
        }
    };

    const handleZoomIn = () => {
        setZoom(Math.min(zoom + 0.5, 3));
    };

    const handleZoomOut = () => {
        setZoom(Math.max(zoom - 0.5, 0.5));
    };

    const handleKeyDown = (e: KeyboardEvent) => {
        if (!isFullscreen) return;

        switch (e.key) {
            case 'Escape':
                closeFullscreen();
                break;
            case 'ArrowRight':
                nextPhoto();
                break;
            case 'ArrowLeft':
                prevPhoto();
                break;
            case '+':
            case '=':
                handleZoomIn();
                break;
            case '-':
                handleZoomOut();
                break;
        }
    };

    useEffect(() => {
        if (isFullscreen) {
            document.addEventListener('keydown', handleKeyDown);
            return () => document.removeEventListener('keydown', handleKeyDown);
        }
    }, [isFullscreen, currentIndex, zoom]);

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
                        📸 相册回忆
                    </h1>
                    <p className="text-lg text-primary-500 max-w-2xl mx-auto">
                        瀑布流展示您的旅行照片，重温每一个精彩瞬间
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
                    {/* 标签筛选 */}
                    <div className="flex items-center gap-3">
                        <span className="text-primary-600 font-medium">标签：</span>
                        <div className="flex flex-wrap gap-2">
                            <button
                                onClick={() => setSelectedTag('all')}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${selectedTag === 'all'
                                        ? 'bg-primary-500 text-white'
                                        : 'bg-primary-100 text-primary-600 hover:bg-primary-200'
                                    }`}
                            >
                                全部
                            </button>
                            {allTags.map(tag => (
                                <button
                                    key={tag}
                                    onClick={() => setSelectedTag(tag)}
                                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${selectedTag === tag
                                            ? 'bg-primary-500 text-white'
                                            : 'bg-primary-100 text-primary-600 hover:bg-primary-200'
                                        }`}
                                >
                                    {tag}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* 地点筛选 */}
                    <div className="flex items-center gap-3">
                        <span className="text-primary-600 font-medium">地点：</span>
                        <select
                            value={selectedLocation}
                            onChange={(e) => setSelectedLocation(e.target.value)}
                            className="px-4 py-2 border border-primary-200 rounded-lg text-primary-600 focus:outline-none focus:border-primary-400"
                        >
                            <option value="all">全部地点</option>
                            {allLocations.map(location => (
                                <option key={location} value={location}>
                                    {location}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </motion.div>

            {/* 照片统计 */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="bg-white rounded-2xl shadow-lg p-6 mb-8"
            >
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div className="text-center">
                        <div className="text-3xl font-bold text-primary-500 mb-2">
                            {filteredPhotos.length}
                        </div>
                        <div className="text-primary-400 text-sm">照片数量</div>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl font-bold text-primary-500 mb-2">
                            {allTags.length}
                        </div>
                        <div className="text-primary-400 text-sm">标签种类</div>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl font-bold text-primary-500 mb-2">
                            {allLocations.length}
                        </div>
                        <div className="text-primary-400 text-sm">拍摄地点</div>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl font-bold text-primary-500 mb-2">
                            2024
                        </div>
                        <div className="text-primary-400 text-sm">拍摄年份</div>
                    </div>
                </div>
            </motion.div>

            {/* 瀑布流照片展示 */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-4"
            >
                {filteredPhotos.map((photo, index) => (
                    <motion.div
                        key={photo.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: index * 0.05 }}
                        className="break-inside-avoid mb-4 group cursor-pointer"
                        onClick={() => openFullscreen(photo, index)}
                    >
                        <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                            <div className="relative overflow-hidden">
                                <img
                                    src={photo.src}
                                    alt={photo.alt}
                                    className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                                />

                                {/* 悬停遮罩 */}
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <Camera className="w-8 h-8 text-white" />
                                    </div>
                                </div>

                                {/* 操作按钮 */}
                                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <button className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
                                        <Heart className="w-4 h-4 text-white" />
                                    </button>
                                    <button className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
                                        <Share2 className="w-4 h-4 text-white" />
                                    </button>
                                </div>
                            </div>

                            {/* 照片信息 */}
                            <div className="p-4">
                                <div className="flex items-center gap-2 text-sm text-primary-400 mb-2">
                                    <Calendar className="w-4 h-4" />
                                    <span>{format(parseISO(photo.date), 'yyyy年MM月dd日', { locale: zhCN })}</span>
                                    <MapPin className="w-4 h-4 ml-2" />
                                    <span>{photo.location}</span>
                                </div>

                                <h3 className="text-lg font-bold text-primary-600 mb-2">
                                    {photo.alt}
                                </h3>

                                {/* 标签 */}
                                <div className="flex flex-wrap gap-1">
                                    {photo.tags.slice(0, 3).map(tag => (
                                        <span
                                            key={tag}
                                            className="px-2 py-1 bg-primary-100 text-primary-600 text-xs rounded-full"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </motion.div>

            {/* 全屏查看模态框 */}
            <AnimatePresence>
                {isFullscreen && selectedPhoto && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
                        onClick={closeFullscreen}
                    >
                        <div className="relative w-full h-full flex items-center justify-center p-4">
                            {/* 关闭按钮 */}
                            <button
                                onClick={closeFullscreen}
                                className="absolute top-4 right-4 z-10 w-12 h-12 bg-black/50 rounded-full flex items-center justify-center hover:bg-black/70 transition-colors"
                            >
                                <X className="w-6 h-6 text-white" />
                            </button>

                            {/* 缩放控制 */}
                            <div className="absolute top-4 left-4 z-10 flex gap-2">
                                <button
                                    onClick={handleZoomOut}
                                    className="w-12 h-12 bg-black/50 rounded-full flex items-center justify-center hover:bg-black/70 transition-colors"
                                >
                                    <ZoomOut className="w-6 h-6 text-white" />
                                </button>
                                <button
                                    onClick={handleZoomIn}
                                    className="w-12 h-12 bg-black/50 rounded-full flex items-center justify-center hover:bg-black/70 transition-colors"
                                >
                                    <ZoomIn className="w-6 h-6 text-white" />
                                </button>
                            </div>

                            {/* 导航按钮 */}
                            {currentIndex > 0 && (
                                <button
                                    onClick={prevPhoto}
                                    className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-black/50 rounded-full flex items-center justify-center hover:bg-black/70 transition-colors"
                                >
                                    <ChevronLeft className="w-6 h-6 text-white" />
                                </button>
                            )}

                            {currentIndex < filteredPhotos.length - 1 && (
                                <button
                                    onClick={nextPhoto}
                                    className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-black/50 rounded-full flex items-center justify-center hover:bg-black/70 transition-colors"
                                >
                                    <ChevronRight className="w-6 h-6 text-white" />
                                </button>
                            )}

                            {/* 照片内容 */}
                            <div
                                className="max-w-full max-h-full overflow-auto"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <img
                                    src={selectedPhoto.src}
                                    alt={selectedPhoto.alt}
                                    className="max-w-full max-h-full object-contain"
                                    style={{ transform: `scale(${zoom})` }}
                                />
                            </div>

                            {/* 照片信息 */}
                            <div className="absolute bottom-4 left-4 right-4 z-10 bg-black/50 backdrop-blur-sm rounded-2xl p-4 text-white">
                                <div className="flex items-center gap-4 mb-2">
                                    <div className="flex items-center gap-2">
                                        <Calendar className="w-4 h-4" />
                                        <span>{format(parseISO(selectedPhoto.date), 'yyyy年MM月dd日', { locale: zhCN })}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <MapPin className="w-4 h-4" />
                                        <span>{selectedPhoto.location}</span>
                                    </div>
                                </div>

                                <h3 className="text-xl font-bold mb-2">
                                    {selectedPhoto.alt}
                                </h3>

                                <div className="flex flex-wrap gap-2">
                                    {selectedPhoto.tags.map(tag => (
                                        <span
                                            key={tag}
                                            className="px-3 py-1 bg-white/20 rounded-full text-sm"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* 计数器 */}
                            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10 bg-black/50 backdrop-blur-sm rounded-full px-4 py-2 text-white">
                                {currentIndex + 1} / {filteredPhotos.length}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default PhotoGallery;
