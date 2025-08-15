// 旅行攻略类型
export interface Guide {
    id: string;
    title: string;
    destination: string;
    bestSeason: string;
    days: number;
    budget: {
        min: number;
        max: number;
        currency: string;
    };
    tags: string[];
    cover: string;
    excerpt: string;
    createdAt: string;
    content?: string;
    author?: string;
    route?: RoutePoint[];
}

// 目的地类型
export interface Destination {
    id: string;
    name: string;
    country: string;
    description: string;
    cover: string;
    tags: string[];
    coordinates: {
        lat: number;
        lng: number;
    };
    photos?: string[];
    guides?: string[];
}

// 照片类型
export interface Photo {
    id: string;
    src: string;
    alt: string;
    tags: string[];
    location: string;
    date: string;
    coordinates?: {
        lat: number;
        lng: number;
    };
    description?: string;
    author?: string;
}

// 路线点类型
export interface RoutePoint {
    id: string;
    name: string;
    coordinates: {
        lat: number;
        lng: number;
    };
    description?: string;
    photos?: string[];
    day?: number;
}

// 用户类型
export interface User {
    id: string;
    username: string;
    email: string;
    avatar?: string;
    bio?: string;
    joinDate: string;
    travelCount: number;
    favorites: string[];
    guides: string[];
    photos: string[];
}

// 时间轴项目类型
export interface TimelineItem {
    id: string;
    date: string;
    title: string;
    description: string;
    type: 'photo' | 'video' | 'guide';
    content: string;
    location?: string;
    coordinates?: {
        lat: number;
        lng: number;
    };
    tags: string[];
}

// 地图标记类型
export interface MapMarker {
    id: string;
    type: 'destination' | 'photo' | 'guide';
    coordinates: {
        lat: number;
        lng: number;
    };
    title: string;
    description: string;
    content: any;
}

// 筛选选项类型
export interface FilterOptions {
    tags: string[];
    dateRange: {
        start: string;
        end: string;
    };
    location: string;
    type: 'all' | 'guides' | 'photos' | 'destinations';
}

// 搜索选项类型
export interface SearchOptions {
    query: string;
    type: 'all' | 'guides' | 'photos' | 'destinations' | 'users';
    location?: string;
    tags?: string[];
}
