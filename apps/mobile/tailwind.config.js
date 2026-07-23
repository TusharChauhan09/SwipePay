const { fontFamily } = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        // Surface scale (dark theme)
        surface: {
          base: "#0B0E14",
          raised: "#141824",
          muted: "#1A1F2E",
          strong: "#7C5CFC",
          overlay: "#0B0E14CC",
        },
        // Text scale
        text: {
          primary: "#F5F3FF",
          secondary: "#8B8FA3",
          tertiary: "#5A5F73",
          inverse: "#0B0E14",
        },
        // Borders
        border: {
          subtle: "#2A2F3E",
          strong: "#3A3F52",
        },
        // Brand / semantic
        brand: {
          primary: "#7C5CFC",
          primaryHover: "#8B6DFF",
          primaryPressed: "#6A4DED",
          success: "#3DDC97",
          danger: "#FF5C5C",
          warning: "#FFB547",
          info: "#4DA8FF",
        },
      },
      fontFamily: {
        sans: ["Inter_400Regular", ...fontFamily.sans],
        "sans-medium": ["Inter_500Medium"],
        "sans-semibold": ["Inter_600SemiBold"],
        "sans-bold": ["Inter_700Bold"],
        "sans-black": ["Inter_900Black"],
        mono: ["Inter_500Medium", ...fontFamily.mono],
      },
      fontSize: {
        xs: ["10px", { lineHeight: "14px" }],
        sm: ["13px", { lineHeight: "18px" }],
        md: ["14px", { lineHeight: "20px" }],
        lg: ["16px", { lineHeight: "24px" }],
        xl: ["18px", { lineHeight: "26px" }],
        "2xl": ["20px", { lineHeight: "28px" }],
        "3xl": ["22px", { lineHeight: "30px" }],
        "4xl": ["24px", { lineHeight: "32px" }],
        "5xl": ["30px", { lineHeight: "36px" }],
        "6xl": ["36px", { lineHeight: "40px" }],
      },
      fontWeight: {
        regular: "400",
        medium: "500",
        semibold: "600",
        bold: "700",
        black: "900",
      },
      spacing: {
        1: "4px",
        2: "5px",
        3: "8px",
        4: "10px",
        5: "12px",
        6: "16px",
        7: "18px",
        8: "20px",
        9: "24px",
        10: "32px",
        11: "40px",
        12: "48px",
      },
      borderRadius: {
        xs: "4px",
        sm: "8px",
        md: "14px",
        lg: "16px",
        xl: "20px",
        "2xl": "24px",
      },
      boxShadow: {
        "1": "rgba(0,0,0,0.4) 0px 1px 2px 0px",
        "2": "rgba(0,0,0,0.5) 0px 2px 6px 0px",
        "glow-primary": "rgba(124,92,252,0.25) 0px 0px 24px 0px",
        "glow-success": "rgba(61,220,151,0.25) 0px 0px 24px 0px",
      },
      transitionDuration: {
        instant: "150ms",
        fast: "200ms",
        normal: "350ms",
        slow: "500ms",
      },
      transitionTimingFunction: {
        standard: "cubic-bezier(0.4, 0, 0.2, 1)",
        entrance: "cubic-bezier(0, 0, 0.2, 1)",
        exit: "cubic-bezier(0.4, 0, 1, 1)",
      },
    },
  },
  plugins: [],
};
