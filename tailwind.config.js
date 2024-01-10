/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'outfit': ['Outfit', 'sans-serif'],
        'roboto': ['Roboto', 'sans-serif']
      },
      colors: {
        'vivvi': '#264B44',
        'caribbean': '#306762',
        'jet': '#323232',
        'anti-flash': '#F4F5F6',
        'platinum': '#D6DADC',
        'sunset': '#F4CE9B',
        'dorado': '#EBC991',
        'honeydew': '#DFEFDC',
        'light-blue': '#BDD9DF',
        'snow': '#F8F1F2',
        "timberwolf": "#D0D3D4"
        
      }
    },
  },
  plugins: [],
}

