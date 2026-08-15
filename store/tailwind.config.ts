import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: { vah: { cream:'#f4f0e8', ink:'#171715', stone:'#ded8cb' } },
      fontFamily: { sans:['DM Sans','sans-serif'], serif:['Playfair Display','serif'] },
    },
  },
  plugins: [],
};
export default config;
