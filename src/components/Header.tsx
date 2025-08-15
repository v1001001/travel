import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Menu, X, User, Globe } from 'lucide-react';

const Header: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const location = useLocation();

    const navigationItems = [
        { path: '/', label: '首页', icon: '🏠' },
        { path: '/map', label: '世界地图', icon: '🗺️' },
        { path: '/timeline', label: '时间轴', icon: '📅' },
        { path: '/photos', label: '相册回忆', icon: '📸' },
        { path: '/guides', label: '旅行攻略', icon: '📖' },
        { path: '/destinations', label: '目的地', icon: '📍' }
    ];

    const isActive = (path: string) => {
        if (path === '/') {
            return location.pathname === '/';
        }
        return location.pathname.startsWith(path);
    };

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200/50">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-3 group">
                        <div className="relative">
                            <img
                                src="/images/jimeng-2.png"
                                alt="无尽之旅"
                                className="w-8 h-8 rounded-lg shadow-sm group-hover:shadow-md transition-shadow duration-300"
                            />
                            <div className="absolute -top-1 -right-1 w-4 h-4 bg-amber-500 rounded-full flex items-center justify-center">
                                <Globe className="w-2 h-2 text-white" />
                            </div>
                        </div>
                        <div className="hidden sm:block">
                            <div className="text-lg font-bold text-gray-800 group-hover:text-amber-600 transition-colors">
                                无尽之旅
                            </div>
                            <div className="text-xs text-gray-500">Timeless Trips</div>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-1">
                        {navigationItems.map(item => (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${isActive(item.path)
                                    ? 'bg-primary-500 text-white shadow-lg'
                                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800'
                                    }`}
                            >
                                <span className="text-base">{item.icon}</span>
                                <span>{item.label}</span>
                            </Link>
                        ))}
                    </nav>

                    {/* Right-side functional area */}
                    <div className="flex items-center gap-4">
                        {/* Search box */}
                        <div className="relative hidden sm:block">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <input
                                type="text"
                                placeholder="搜索..."
                                className="pl-10 pr-4 py-2 bg-gray-100 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent w-48 transition-all duration-300"
                            />
                        </div>

                        {/* User menu button */}
                        <button className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-800 transition-all duration-300">
                            <User className="w-4 h-4" />
                            <span>登录</span>
                        </button>

                        {/* Mobile menu button */}
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="md:hidden p-2 rounded-xl text-gray-600 hover:bg-gray-100 hover:text-gray-800 transition-all duration-300"
                        >
                            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                        </button>
                    </div>
                </div>

                {/* Mobile menu */}
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="md:hidden border-t border-gray-200 bg-white"
                    >
                        {/* Mobile search box */}
                        <div className="p-4 border-b border-gray-100">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                <input
                                    type="text"
                                    placeholder="搜索..."
                                    className="w-full pl-10 pr-4 py-2 bg-gray-100 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                />
                            </div>
                        </div>

                        {/* Mobile navigation */}
                        <nav className="p-4">
                            <div className="space-y-2">
                                {navigationItems.map(item => (
                                    <Link
                                        key={item.path}
                                        to={item.path}
                                        onClick={() => setIsMenuOpen(false)}
                                        className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${isActive(item.path)
                                            ? 'bg-primary-500 text-white'
                                            : 'text-gray-600 hover:bg-gray-100'
                                            }`}
                                    >
                                        <span className="text-lg">{item.icon}</span>
                                        <span>{item.label}</span>
                                    </Link>
                                ))}
                            </div>
                        </nav>

                        {/* Mobile user menu */}
                        <div className="p-4 border-t border-gray-100">
                            <button className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-100 transition-all duration-300 w-full">
                                <User className="w-4 h-4" />
                                <span>登录</span>
                            </button>
                        </div>
                    </motion.div>
                )}
            </div>
        </header>
    );
};

export default Header;
