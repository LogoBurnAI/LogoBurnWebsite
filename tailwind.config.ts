import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        accent: '#e94560',
        accent2: '#f5a623',
        surface: '#12121e',
        surface2: '#1a1a2e',
      },
    },
  },
  plugins: [],
}
export default config
