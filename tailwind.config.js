/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                // Wanderlust + Explorer 温暖色调
                primary: {
                    50: '#fefce8',   // 浅黄色
                    100: '#fef9c3',  // 浅黄色
                    200: '#fef08a',  // 黄色
                    300: '#fde047',  // 黄色
                    400: '#facc15',  // 黄色
                    500: '#eab308',  // 琥珀色
                    600: '#ca8a04',  // 琥珀色
                    700: '#a16207',  // 琥珀色
                    800: '#854d0e',  // 琥珀色
                    900: '#713f12',  // 琥珀色
                },
                // 辅助色彩
                accent: {
                    50: '#fff7ed',   // 浅橙色
                    100: '#ffedd5',  // 浅橙色
                    200: '#fed7aa',  // 橙色
                    300: '#fdba74',  // 橙色
                    400: '#fb923c',  // 橙色
                    500: '#f97316',  // 橙色
                    600: '#ea580c',  // 橙色
                    700: '#c2410c',  // 橙色
                    800: '#9a3412',  // 橙色
                    900: '#7c2d12',  // 橙色
                },
                // 中性色
                neutral: {
                    50: '#fafaf9',   // 浅灰色
                    100: '#f5f5f4',  // 浅灰色
                    200: '#e7e5e4',  // 灰色
                    300: '#d6d3d1',  // 灰色
                    400: '#a8a29e',  // 灰色
                    500: '#78716c',  // 灰色
                    600: '#57534e',  // 灰色
                    700: '#44403c',  // 灰色
                    800: '#292524',  // 深灰色
                    900: '#1c1917',  // 深灰色
                }
            },
            fontFamily: {
                'sans': ['Inter', 'system-ui', 'sans-serif'],
                'serif': ['Playfair Display', 'Georgia', 'serif'],
                'display': ['Playfair Display', 'serif'],
            },
            animation: {
                'float': 'float 6s ease-in-out infinite',
                'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-20px)' },
                }
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
            },
        },
    },
    plugins: [],
}
