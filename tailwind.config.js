/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class', '[data-theme="dark"]'], // hỗ trợ dark mode từ attribute data-theme
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        /* ===== Brand ===== */
        brand: {
          DEFAULT: '#00bcd4', // var(--brand-color)
          hover: '#0085cc',
          light: '#3355ff',
        },

        /* ===== Light & Dark Mode (sử dụng bằng bg-primary, text-secondary, v.v) ===== */
        bg: {
          primary: 'var(--bg-primary)',
          secondary: 'var(--bg-secondary)',
          tertiary: 'var(--bg-tertiary)',
        },

        text: {
          primary: 'var(--text-primary)',
          secondary: 'var(--text-secondary)',
          muted: 'var(--text-muted)',
        },

        border: {
          DEFAULT: 'var(--border-color)',
        },

        badge: {
          bg: 'var(--badge-bg)',
          text: 'var(--badge-text)',
        },

        input: {
          bg: 'var(--input-bg)',
          border: 'var(--input-border)',
          focus: 'var(--input-focus)',
        },

        success: '#10b981',
        error: '#ef4444',
        warning: '#f59e0b',
      },

      boxShadow: {
        sm: '0 1px 2px 0 var(--shadow-sm)',
        md: '0 4px 6px -1px var(--shadow-md)',
        lg: '0 10px 15px -3px var(--shadow-lg)',
      },

      backgroundImage: {
        'announcement-gradient': 'linear-gradient(135deg, var(--brand-color), #0050ff)',
        'announcement-dark': 'linear-gradient(135deg, #1a2744, var(--brand-color))',
        shimmer: 'var(--bg-shimmer)',
        hero: 'var(--bg-image)',
      },
      keyframes: {
        cardSlideInUp: {
          '0%': { opacity: '0', transform: 'translateY(40px) scale(0.95)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
        badgeSlideIn: {
          '0%': { opacity: '0', transform: 'translateX(50px) rotateZ(45deg)' },
          '100': { opacity: '1', transform: 'translateX(0) rotateZ(0deg)' }
        },
        imageSlideIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        textSlideLeft: {
          '0': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' }
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        scan: {
          '0%': { top: '0', opacity: '0' },
          '10%': { opacity: '1' },
          '90%': { opacity: 1 },
          '100%': { top: '100%', opacity: 0 }
        },
        progress: {
          '0%': { width: '0%' },
          '100%': { width: '100%' }
        },
      },
      animation: {
        cardSlideInUp: 'cardSlideInUp 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
        badgeSlideIn: 'badgeSlideIn 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
        imageSlideIn: 'imageSlideIn 0.7s ease-out 0.15s forwards',
        textSlideLeft: 'textSlideLeft 0.6s ease-out 0.35s forwards',
        fadeInUp: 'fadeInUp 0.6s ease-out 0.4s forwards',
        fadeInDown: 'fadeInDown 0.6s ease-out 0.4s forwards',
        scan: 'scan 2s ease-in-out infinite',
        progress: 'progress 2.5s ease-out forwards'
      },
    },
  },
  plugins: [],
};
