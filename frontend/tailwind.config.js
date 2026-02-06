/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ['class'],
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
  	extend: {
  		fontFamily: {
  			sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'sans-serif'],
  			mono: ['SFMono-Regular', 'Consolas', 'Liberation Mono', 'Menlo', 'monospace'],
  		},
  		animation: {
  			spotlight: 'spotlight 2s ease .75s 1 forwards',
  			'fade-in-slide': 'fadeInSlide 0.3s ease-out',
  			'slide-in-right': 'slideInRight 0.3s ease-out',
  			'fade-out': 'fadeOut 0.3s ease-out forwards',
  			'fade-in': 'fadeIn 0.2s ease-out',
  			'slide-in': 'slideIn 0.3s ease-out',
  			blink: 'blink 1s step-end infinite',
  			'dot-pulse': 'dotPulse 1.5s infinite',
  			'typing-dot': 'typingDot 1.4s infinite ease-in-out',
  			'progress-fill': 'progressFill 1.5s ease-out forwards',
  			'status-pulse': 'statusPulse 2s ease-in-out infinite',
  		},
  		keyframes: {
  			spotlight: {
  				'0%': { opacity: 0, transform: 'translate(-72%, -62%) scale(0.5)' },
  				'100%': { opacity: 1, transform: 'translate(-50%,-40%) scale(1)' },
  			},
  			fadeInSlide: {
  				'0%': { opacity: 0, transform: 'translateY(8px)' },
  				'100%': { opacity: 1, transform: 'translateY(0)' },
  			},
  			slideInRight: {
  				'0%': { transform: 'translateX(400px)', opacity: 0 },
  				'100%': { transform: 'translateX(0)', opacity: 1 },
  			},
  			fadeOut: {
  				'0%': { opacity: 1 },
  				'100%': { opacity: 0, transform: 'translateX(400px)' },
  			},
  			fadeIn: {
  				'0%': { opacity: 0 },
  				'100%': { opacity: 1 },
  			},
  			slideIn: {
  				'0%': { opacity: 0, transform: 'translateY(-20px)' },
  				'100%': { opacity: 1, transform: 'translateY(0)' },
  			},
  			blink: {
  				'0%, 100%': { opacity: 1 },
  				'50%': { opacity: 0 },
  			},
  			dotPulse: {
  				'0%, 80%, 100%': { opacity: 0.3, transform: 'scale(0.8)' },
  				'40%': { opacity: 1, transform: 'scale(1)' },
  			},
  			typingDot: {
  				'0%, 80%, 100%': { transform: 'scale(0)', opacity: 0.4 },
  				'40%': { transform: 'scale(1)', opacity: 1 },
  			},
  			progressFill: {
  				'0%': { width: '0%' },
  				'100%': { width: '100%' },
  			},
  			statusPulse: {
  				'0%, 100%': { opacity: 1 },
  				'50%': { opacity: 0.6 },
  			},
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			},
  			sidebar: {
  				DEFAULT: 'hsl(var(--sidebar-background))',
  				foreground: 'hsl(var(--sidebar-foreground))',
  				primary: 'hsl(var(--sidebar-primary))',
  				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
  				accent: 'hsl(var(--sidebar-accent))',
  				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
  				border: 'hsl(var(--sidebar-border))',
  				ring: 'hsl(var(--sidebar-ring))'
  			}
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
