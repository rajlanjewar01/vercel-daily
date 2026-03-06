// tailwind.config.ts
import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        // Brand Design System using CSS Custom Properties
        brand: {
          // Primary colors
          primary: "var(--brand-primary)",
          secondary: "var(--brand-secondary)",
          light: "var(--brand-light)",
          accent: "var(--brand-accent)",
          "accent-hover": "var(--brand-accent-hover)",

          // Background colors
          "bg-primary": "var(--brand-bg-primary)",
          "bg-secondary": "var(--brand-bg-secondary)",
          "bg-muted": "var(--brand-bg-muted)",
          
          // Border colors
          "border-light": "var(--brand-border-light)",
          "border-medium": "var(--brand-border-medium)",
          
          // Status colors
          success: "var(--brand-success)",
          warning: "var(--brand-warning)",
          error: "var(--brand-error)",
        },
        
        // Legacy apple namespace (for backward compatibility)
        apple: {
          gray: "var(--brand-secondary)",
          light: "var(--brand-light)", 
          blue: "var(--brand-accent)",
        },
      },
      
      // Typography scale using CSS Custom Properties
      fontSize: {
        'xs': ['var(--font-size-xs)', { lineHeight: 'var(--line-height-xs)', fontWeight: '500' }],
        'caption': ['var(--font-size-caption)', { lineHeight: 'var(--line-height-caption)', fontWeight: '500' }],
        'body-sm': ['var(--font-size-body-sm)', { lineHeight: 'var(--line-height-body-sm)' }],
        'body': ['var(--font-size-body)', { lineHeight: 'var(--line-height-body)' }],
        'body-lg': ['var(--font-size-body-lg)', { lineHeight: 'var(--line-height-body-lg)' }],
        'content': ['var(--font-size-content)', { lineHeight: 'var(--line-height-content)' }],
        'lead': ['var(--font-size-lead)', { lineHeight: 'var(--line-height-lead)' }],
        'title-sm': ['var(--font-size-title-sm)', { lineHeight: 'var(--line-height-title-sm)', fontWeight: '600' }],
        'title': ['var(--font-size-title)', { lineHeight: 'var(--line-height-title)', fontWeight: '700' }],
        'title-lg': ['var(--font-size-title-lg)', { lineHeight: 'var(--line-height-title-lg)', fontWeight: '700' }],
        'display': ['var(--font-size-display)', { lineHeight: 'var(--line-height-display)', fontWeight: '700' }],
      },
      
      // Spacing scale using CSS Custom Properties
      spacing: {
        '18': 'var(--spacing-18)',
        '22': 'var(--spacing-22)',
        '26': 'var(--spacing-26)',
        '30': 'var(--spacing-30)',
      },
      
      // Border radius scale using CSS Custom Properties
      borderRadius: {
        'button': 'var(--radius-button)',
        'card': 'var(--radius-card)',
        'input': 'var(--radius-input)',
        'section': 'var(--radius-section)',
      },
      
      // Shadow scale using CSS Custom Properties
      boxShadow: {
        'button': 'var(--shadow-button)',
        'card': 'var(--shadow-card)',
        'input': 'var(--shadow-input)',
      },
      
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
} satisfies Config;
