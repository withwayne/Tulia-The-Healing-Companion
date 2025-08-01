import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px'
      }
    },
    extend: {
      colors: {
        border: '#E8E8E8',
        input: '#E8E8E8',
        ring: '#FF6B6B',
        background: '#FDFDFD',
        foreground: '#2E2E2E',

        primary: {
          DEFAULT: '#FF6B6B',
          foreground: '#FDFDFD'
        },
        secondary: {
          DEFAULT: '#4ECDC4',
          foreground: '#2E2E2E'
        },
        destructive: {
          DEFAULT: '#FF6B6B',
          foreground: '#FDFDFD'
        },
        muted: {
          DEFAULT: '#E8E8E8',
          foreground: '#2E2E2E'
        },
        accent: {
          DEFAULT: '#FFE66D',
          foreground: '#2E2E2E'
        },
        popover: {
          DEFAULT: '#FDFDFD',
          foreground: '#2E2E2E'
        },
        card: {
          DEFAULT: '#FDFDFD',
          foreground: '#2E2E2E'
        },
        'sky-blue': {
          DEFAULT: '#54A0FF',
          foreground: '#FDFDFD'
        },
        'peach-blossom': {
          DEFAULT: '#FF9F80',
          foreground: '#2E2E2E'
        },
        'lavender-mist': {
          DEFAULT: '#B497D6',
          foreground: '#FDFDFD'
        },
        sidebar: {
          DEFAULT: '#FDFDFD',
          foreground: '#2E2E2E',
          primary: '#FF6B6B',
          'primary-foreground': '#FDFDFD',
          accent: '#4ECDC4',
          'accent-foreground': '#2E2E2E',
          border: '#E8E8E8',
          ring: '#FF6B6B'
        }
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0'
          },
          to: {
            height: 'var(--radix-accordion-content-height)'
          }
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)'
          },
          to: {
            height: '0'
          }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out'
      }
    }
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

