import type { Config } from 'tailwindcss'

const config: Config = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
            },
        },
    },
    plugins: [require('@tailwindcss/typography'), require('daisyui')],

    daisyui: {
        themes: [
            {
                mytheme: {
                    primary: '#2980b9',
                    secondary: '#8e44ad',
                    accent: '#16a085',
                    neutral: '#2a323c',
                    'base-100': '#1d232a',
                    info: '#45aaf2',
                    success: '#2ecc71',
                    warning: '#f1c40f',
                    error: '#e74c3c',
                },
            },
        ],
    },
}
export default config
