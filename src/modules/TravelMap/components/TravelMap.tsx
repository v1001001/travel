import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import { motion } from 'framer-motion';
import { Filter, Layers } from 'lucide-react';
import { Guide, MapMarker } from '../../../types';
import destinationsData from '../../../data/destinations.json';
import guidesData from '../../../data/guides.json';
import 'leaflet/dist/leaflet.css';

// 修复Leaflet默认图标问题
import * as L from 'leaflet';
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const TravelMap: React.FC = () => {
    const [selectedType, setSelectedType] = useState<'all' | 'destinations' | 'guides'>('all');
    const [selectedYear, setSelectedYear] = useState<string>('all');
    const [mapMarkers, setMapMarkers] = useState<MapMarker[]>([]);

    // 东北地区中心坐标
    const centerPosition: [number, number] = [45.0, 125.0];

    useEffect(() => {
        // 生成地图标记
        const markers: MapMarker[] = [];

        // 添加目的地标记
        if (selectedType === 'all' || selectedType === 'destinations') {
            destinationsData.forEach((destination: any) => {
                markers.push({
                    id: destination.id,
                    type: 'destination',
                    coordinates: destination.coordinates,
                    title: destination.name,
                    description: destination.description,
                    content: destination
                });
            });
        }

        // 添加攻略路线标记
        if (selectedType === 'all' || selectedType === 'guides') {
            guidesData.forEach((guide: any) => {
                // 这里可以根据攻略数据生成路线点
                // 暂时使用目的地的第一个坐标作为示例
                if (destinationsData.length > 0) {
                    markers.push({
                        id: guide.id,
                        type: 'guide',
                        coordinates: destinationsData[0].coordinates,
                        title: guide.title,
                        description: guide.excerpt,
                        content: guide
                    });
                }
            });
        }

        setMapMarkers(markers);
    }, [selectedType, selectedYear]);

    // 生成路线坐标（示例数据）
    const generateRouteCoordinates = (): [number, number][] => {
        return [
            [41.9942, 128.0615], // 长白山
            [49.2153, 119.7589], // 呼伦贝尔
            [51.6720, 124.1960], // 大兴安岭
            [47.1770, 119.9430], // 阿尔山
            [52.9721, 122.5370], // 漠河
        ];
    };

    const routeCoordinates = generateRouteCoordinates();

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
                        🗺️ 无尽之旅地图
                    </h1>
                    <p className="text-lg text-primary-500 max-w-2xl mx-auto">
                        在地图上探索旅行足迹，查看路线轨迹和目的地信息
                    </p>
                </div>
            </motion.div>

            {/* 地图控制面板 */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="bg-white rounded-2xl shadow-lg p-6 mb-8"
            >
                <div className="flex flex-wrap items-center gap-4">
                    <div className="flex items-center gap-2">
                        <Filter className="w-5 h-5 text-primary-500" />
                        <span className="text-primary-600 font-medium">筛选：</span>
                    </div>

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
                            onClick={() => setSelectedType('destinations')}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${selectedType === 'destinations'
                                ? 'bg-primary-500 text-white'
                                : 'bg-primary-100 text-primary-600 hover:bg-primary-200'
                                }`}
                        >
                            目的地
                        </button>
                        <button
                            onClick={() => setSelectedType('guides')}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${selectedType === 'guides'
                                ? 'bg-primary-500 text-white'
                                : 'bg-primary-100 text-primary-600 hover:bg-primary-200'
                                }`}
                        >
                            攻略路线
                        </button>
                    </div>

                    <div className="flex items-center gap-2 ml-auto">
                        <Layers className="w-5 h-5 text-primary-500" />
                        <span className="text-primary-600 font-medium">图层：</span>
                        <select
                            value={selectedYear}
                            onChange={(e) => setSelectedYear(e.target.value)}
                            className="px-3 py-2 border border-primary-200 rounded-lg text-primary-600 focus:outline-none focus:border-primary-400"
                        >
                            <option value="all">全部时间</option>
                            <option value="2024">2024年</option>
                            <option value="2023">2023年</option>
                            <option value="2022">2022年</option>
                        </select>
                    </div>
                </div>
            </motion.div>

            {/* 地图容器 */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden"
                style={{ height: '600px' }}
            >
                <MapContainer
                    center={centerPosition}
                    zoom={6}
                    style={{ height: '100%', width: '100%' }}
                >
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />

                    {/* 路线连线 */}
                    <Polyline
                        positions={routeCoordinates}
                        color="#3B82F6"
                        weight={4}
                        opacity={0.8}
                    />

                    {/* 地图标记 */}
                    {mapMarkers.map((marker) => (
                        <Marker
                            key={marker.id}
                            position={[marker.coordinates.lat, marker.coordinates.lng]}
                        >
                            <Popup>
                                <div className="p-2">
                                    <h3 className="font-bold text-primary-600 mb-2">
                                        {marker.title}
                                    </h3>
                                    <p className="text-sm text-primary-500 mb-2">
                                        {marker.description}
                                    </p>
                                    <div className="flex gap-2">
                                        <button className="px-3 py-1 bg-primary-500 text-white text-xs rounded hover:bg-primary-600 transition-colors">
                                            查看详情
                                        </button>
                                        <button className="px-3 py-1 border border-primary-300 text-primary-600 text-xs rounded hover:bg-primary-50 transition-colors">
                                            ❤️
                                        </button>
                                    </div>
                                </div>
                            </Popup>
                        </Marker>
                    ))}
                </MapContainer>
            </motion.div>

            {/* 地图统计信息 */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="mt-8 bg-white rounded-2xl shadow-lg p-6"
            >
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div className="text-center">
                        <div className="text-2xl font-bold text-primary-500 mb-1">
                            {mapMarkers.length}
                        </div>
                        <div className="text-primary-400 text-sm">地图标记</div>
                    </div>
                    <div className="text-center">
                        <div className="text-2xl font-bold text-primary-500 mb-1">
                            {routeCoordinates.length - 1}
                        </div>
                        <div className="text-primary-400 text-sm">路线段数</div>
                    </div>
                    <div className="text-center">
                        <div className="text-2xl font-bold text-primary-500 mb-1">
                            5000+
                        </div>
                        <div className="text-primary-400 text-sm">总里程(km)</div>
                    </div>
                    <div className="text-center">
                        <div className="text-2xl font-bold text-primary-500 mb-1">
                            5
                        </div>
                        <div className="text-primary-400 text-sm">核心区域</div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default TravelMap;
