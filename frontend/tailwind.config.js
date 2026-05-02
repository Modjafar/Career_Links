/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,jsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: '#0F172A',
                secondary: '#1E293B',
                accent: '#3B82F6',
                'accent-hover': '#2563EB',
            },
            backgroundImage: {
                'gradient-primary': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                'gradient-secondary': 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            },
            animation: {
                'fade-in': 'fadeIn 0.3s ease-in',
                'slide-up': 'slideUp 0.5s ease-out',
                'pulse-slow': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideUp: {
                    '0%': { transform: 'translateY(20px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
            },
        },
    },
    darkMode: 'class',
    plugins: [],
}
