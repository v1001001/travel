# TimelessTrips 网站开发需求说明

## 一、项目概述
TimelessTrips 是一个以“环形中国”“环游世界”“重返20岁，致敬青春”等主题为核心的旅行体验分享平台。目标是让用户通过地图、时间轴、相册、游记等形式，记录并探索世界各地的旅行故事。

网站分为 **PC 端** 和 **移动端**（响应式设计），支持多语言（初期：中文、英文）。

---

## 二、功能规划

### 1. 首页
- 主题横幅：展示核心主题与精选旅行照片
- 精选行程卡片（带封面、目的地、简要描述）
- 按时间/地点筛选功能
- 搜索框（支持模糊搜索目的地/作者/主题）
- 地图入口（跳转到地图浏览页面）

### 2. 旅行地图
- 基于地图组件（Mapbox / Leaflet）展示旅行足迹
- 支持按年份、地点筛选
- 地图标点点击可查看照片、游记摘要
- 旅行线路连线（如环形路线可闭合）

### 3. 时间轴
- 以年份、月份为轴展示旅行记录
- 支持瀑布流照片与短视频（视频可内嵌播放）
- 时间轴项点击可跳转到游记详情页

### 4. 游记与相册
- 游记详情页：标题、作者、旅行时间、正文（支持富文本和图片）
- 照片相册：支持全屏查看、左右滑动、放大缩小
- 照片标签与地理定位

### 5. 用户中心（基础版）
- 登录注册（支持邮箱 / 第三方 OAuth，如 Google/微信）
- 个人主页：头像、简介、旅行次数统计、地图展示
- 用户发布/编辑游记与照片
- 用户收藏与点赞功能

### 6. 管理后台（基础版）
- 游记/照片管理（增删改查）
- 用户管理（禁用、封号）
- 评论管理
- 数据统计（访问量、互动数据）

---

## 三、技术要求

### 前端
- 框架：Next.js 14 / React 18
- 样式：Tailwind CSS + shadcn/ui 组件库
- 动画：Framer Motion
- 地图：Mapbox GL JS 或 Leaflet.js
- 国际化：next-i18next
- 图片优化：Next.js Image
- 状态管理：Zustand 或 Redux Toolkit
- 响应式设计（移动优先）

### 后端
- 框架：Node.js + Express / NestJS
- 数据库：MySQL / PostgreSQL（存储游记、用户信息）
- 对象存储：阿里云 OSS / AWS S3（存储图片与视频）
- 鉴权：JWT + OAuth2.0
- API 接口：RESTful 风格（可预留 GraphQL 接口）

### 部署
- 前端：Vercel / 阿里云 ECS
- 后端：阿里云 ECS + Docker
- 数据库：RDS（MySQL/PostgreSQL）
- 对象存储：阿里云 OSS
- CDN 加速：阿里云 CDN

---

## 四、项目结构（建议）
my-travel-site/
├── app/                        # Next.js App Router 目录
│   ├── layout.tsx              # 全局布局
│   ├── page.tsx                # 首页
│   ├── routes/                 # 路线页面
│   │   └── page.tsx
│   ├── destinations/           # 景点详情页面
│   │   └── [id]/page.tsx
│   └── about/page.tsx          # 关于我们页面
├── components/                 # 可复用组件
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── HeroBanner.tsx
│   ├── RouteCard.tsx
│   ├── DestinationCard.tsx
│   └── ImageCarousel.tsx
├── public/                     # 静态资源（图片等）
│   ├── images/
│   └── icons/
├── styles/
│   └── globals.css             # 全局样式
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── README.md


---

## 五、开发优先级（迭代建议）
1. **第一阶段（MVP）**
   - 首页 + 游记详情页
   - 地图展示（静态数据）
   - 用户注册登录
   - 后台管理游记
2. **第二阶段**
   - 时间轴功能
   - 游记发布与编辑
   - 地图动态数据
   - 收藏与点赞
3. **第三阶段**
   - 多语言支持
   - 视频支持
   - 高级搜索与筛选
   - 数据统计与分析

---

## 六、设计风格建议
- 极简 + 旅行感，浅色背景、留白多
- 照片展示为主，文字次之
- 交互动效柔和（Framer Motion）
- 参考风格：Airbnb、Lonely Planet
