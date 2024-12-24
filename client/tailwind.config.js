import flowbite from 'flowbite-react/tailwind';
const { content } = flowbite;
import flowbitePlugin from 'flowbite/plugin';

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", content()],
  theme: {
    extend: {},
  },
  plugins: [
    flowbitePlugin,
    require("tailwind-scrollbar"),
    
  ],
};
