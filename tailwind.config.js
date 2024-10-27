// tailwind.config.js
const colors = require('tailwindcss/colors');
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
    content: [
        './app/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}'
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['var(--font-inter)', ...defaultTheme.fontFamily.sans],
            },
            backgroundImage: {
                'grid-pattern': "linear-gradient(to bottom, theme('colors.neutral.950 / 0%'), theme('colors.neutral.950 / 100%')), url('/images/noise.png')"
            },
            colors: {
                neutral: colors.neutral
            },
            animation: {
                blob: "blob 7s infinite",
                'fade-in': 'fadeIn 0.5s ease-in-out',
                'slide-up': 'slideUp 0.5s ease-out',
                'gradient': 'gradient 8s linear infinite',
                'gradient-slow': 'gradient 12s linear infinite',
                'float': 'float 3s ease-in-out infinite',
                'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            },
            keyframes: {
                blob: {
                    "0%": {
                        transform: "translate(0px, 0px) scale(1)",
                    },
                    "33%": {
                        transform: "translate(30px, -50px) scale(1.1)",
                    },
                    "66%": {
                        transform: "translate(-20px, 20px) scale(0.9)",
                    },
                    "100%": {
                        transform: "translate(0px, 0px) scale(1)",
                    },
                },
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideUp: {
                    '0%': { transform: 'translateY(20px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
                gradient: {
                    '0%, 100%': { 
                        'background-position': '0% 50%',
                        'background-size': '200% 200%'
                    },
                    '50%': { 
                        'background-position': '100% 50%',
                        'background-size': '200% 200%'
                    },
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-10px)' },
                },
            },
            backgroundSize: {
                'size-200': '200% 200%',
            },
            // Adiciona delays de animação personalizados
            transitionDelay: {
                '2000': '2000ms',
                '3000': '3000ms',
                '4000': '4000ms',
            },
            // Adiciona duração de transição personalizada
            transitionDuration: {
                '2000': '2000ms',
                '3000': '3000ms',
                '4000': '4000ms',
            },
            // Adiciona classes de backdrop blur personalizadas
            backdropBlur: {
                xs: '2px',
            },
        },
    },
    plugins: [require('daisyui')],
    daisyui: {
        themes: [
            {
                lofi: {
                    ...require('daisyui/src/theming/themes')['lofi'],
                    primary: '#FF80B5',
                    'primary-content': '#ffffff',
                    secondary: '#9333EA',
                    'secondary-content': '#ffffff',
                    accent: '#F3D4E4',
                    'accent-content': '#331B35',
                    neutral: '#2A2A2A',
                    'neutral-content': '#ffffff',
                    'base-100': '#FFFFFF',
                    'base-200': '#F9FAFB',
                    'base-300': '#F3F4F6',
                    'base-content': '#1F2937',
                    '--rounded-box': '1rem',
                    '--rounded-btn': '0.5rem',
                    '--rounded-badge': '1.9rem',
                    '--animation-btn': '0.25s',
                    '--animation-input': '0.2s',
                    '--btn-focus-scale': '0.95',
                    '--border-btn': '1px',
                    '--tab-border': '1px',
                    '--tab-radius': '0.5rem',
                }
            }
        ]
    }
};