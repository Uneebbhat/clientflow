import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
        black: {
          50: "#e7e7e7",
          100: "#b3b3b3",
          200: "#8e8e8e",
          300: "#5b5b5b",
          400: "#3b3b3b",
          500: "#0a0a0a",
          600: "#090909",
          700: "#070707",
          800: "#060606",
          900: "#030303",
        },
        gray: {
          50: "#e9e9e9",
          100: "#bcbcbc",
          200: "#9b9b9b",
          300: "#6e6e6e",
          400: "#515151",
          500: "#262626",
          600: "#232323",
          700: "#1b1b1b",
          800: "#151515",
          900: "#101010",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontSize: {
        // Headings
        h1: ["2.875rem", "auto"], // 46px
        h2: ["2.313rem", "auto"], // 37px
        h3: ["1.813rem", "auto"], // 29px
        h4: ["1.438rem", "auto"], // 23px
        h5: ["1.188rem", "auto"], // 19px
        h6: ["0.938rem", "auto"], // 15px

        // Body
        large: ["1rem", "auto"], // 16px
        "large-bold": ["1rem", "auto"], // 16px bold
        medium: ["0.875rem", "auto"], // 14px
        "medium-bold": ["0.875rem", "auto"], // 14px bold
        small: ["0.75rem", "auto"], // 12px
        "small-bold": ["0.75rem", "auto"], // 12px bold
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
