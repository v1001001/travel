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
    // 新增详细内容字段
    detailedContent?: {
        overview?: string;
        routeDescription?: string;
        timeline?: DayDetail[];
        highlights?: Highlight[];
        tips?: TravelTip[];
        budgetDetails?: BudgetDetail;
        photoGuide?: PhotoGuide;
        emergencyInfo?: EmergencyInfo;
        packingList?: PackingItem[];
        // 新增字段
        transportationOptions?: TransportationOptions;
        weatherCities?: WeatherCity[];
        routeMap?: RouteMap;
        coreAreas?: CoreArea[];
    };
}

// 每日行程详情
export interface DayDetail {
    day: number;
    title: string;
    start: string;
    end: string;
    distance: number;
    hours: number;
    plan: string[];
    cityMetro: string;
    alt: string;
    stay: string;
    photoTip: string;
    notice: string;
    food: string;
    ticket: string;
    bestTime: string;
}

// 行程亮点
export interface Highlight {
    icon: string;
    title: string;
    description: string;
}

// 旅行贴士
export interface TravelTip {
    category: string;
    title: string;
    items: string[];
}

// 预算详情
export interface BudgetDetail {
    economic: BudgetOption;
    standard: BudgetOption;
    luxury: BudgetOption;
    moneySavingTips: string[];
}

export interface BudgetOption {
    type: string;
    amount: number;
    description: string;
    items: string[];
    suitableFor: string;
}

// 摄影指导
export interface PhotoGuide {
    locations: PhotoLocation[];
    timeline: PhotoTimeSlot[];
}

export interface PhotoLocation {
    name: string;
    bestTime: string;
    tips: string;
    equipment: string;
}

export interface PhotoTimeSlot {
    time: string;
    location: string;
    description: string;
}

// 应急信息
export interface EmergencyInfo {
    importantReminders: string[];
    emergencyPlan: EmergencyCategory[];
}

export interface EmergencyCategory {
    type: string;
    title: string;
    items: string[];
}

// 装备清单
export interface PackingItem {
    category: string;
    title: string;
    items: string[];
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

// 新增类型定义
export interface TransportationOptions {
    currentPlan: TransportationPlan;
    alternativePlan: TransportationPlan;
}

export interface TransportationPlan {
    title: string;
    description: string;
    advantages: string[];
    considerations: string[];
}

export interface WeatherCity {
    name: string;
    color: string;
    coordinates?: {
        lat: number;
        lng: number;
    };
}

export interface RouteMap {
    title: string;
    currentSection: string;
    fullRoute: string;
    mapImage: string;
    videoThumbnail: string;
    videoUrl?: string;
    tip: string;
}

export interface CoreArea {
    id: number;
    name: string;
    title: string;
    description: string;
    attractions: CoreAreaAttraction[];
}

export interface CoreAreaAttraction {
    name: string;
    description: string;
    location: string;
    suggestedDuration: string;
    image: string;
    bestTime: string;
    features: string[];
    photoTips: string;
}
