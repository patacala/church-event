/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        // Azules navy (reemplaza negro)
        'navy-dark': '#0f1642',
        'navy-main': '#1a2570',
        'navy-light': '#2a3580',

        // Gradientes dorados premium
        'gold-dark': '#C9A961',
        'gold-main': '#D4AF37',
        'gold-light': '#F4E0A6',
        'gold-shine': '#FFE8A3',

        // Colores legacy (mantener compatibilidad)
        'victoria-black': '#1a2570', // Ahora apunta a navy-main
        'victoria-gold': '#D4AF37',
      },
      fontFamily: {
        'display': ['Playfair Display', 'Georgia', 'serif'],
        'heading': ['Montserrat', 'system-ui', 'sans-serif'],
        'body': ['Inter', 'system-ui', 'sans-serif'],
        'sans': ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-navy': 'linear-gradient(180deg, #0f1642 0%, #1a2570 50%, #0f1642 100%)',
        'gradient-gold': 'linear-gradient(135deg, #C9A961 0%, #F4E0A6 25%, #D4AF37 50%, #F4E0A6 75%, #C9A961 100%)',
        'gradient-gold-simple': 'linear-gradient(135deg, #F4E0A6, #D4AF37)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-in': 'slideIn 0.6s ease-out',
        'shimmer': 'shimmer 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glowPulse: {
          '0%, 100%': {
            boxShadow: '0 0 20px rgba(212, 175, 55, 0.4), 0 0 40px rgba(212, 175, 55, 0.2)'
          },
          '50%': {
            boxShadow: '0 0 30px rgba(212, 175, 55, 0.6), 0 0 60px rgba(212, 175, 55, 0.3)'
          },
        },
      },
    },
  },
  plugins: [],
};
