import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      'primary-blue':'#106eb0',
      "primary-orange": "#ec7000",
      'primary-gray': '#33303e',
      'secondary-gray':'#4e4b59',
      'gray-phone':'#f4f4f4',
      'text-gray':'#7a7789',
      'opacity-gray':'rgba(100,80,57,0.1)',
      'white':'#fff', 
    },
    extend: { 
      backgroundImage: {
        'img-hero': "url('../assets/bg-hero.jpg')", 
      },
    },
  },
  plugins: [],
};
export default config;
