/**
 * SwipePay design tokens — single source of truth.
 * Mirrors tailwind.config.js / design.md. Import for inline styles;
 * prefer Tailwind classes (semantic tokens) in JSX.
 */

export const colors = {
  surface: {
    base: "#0B0E14",
    raised: "#141824",
    muted: "#1A1F2E",
    strong: "#7C5CFC",
    overlay: "#0B0E14CC",
  },
  text: {
    primary: "#F5F3FF",
    secondary: "#8B8FA3",
    tertiary: "#5A5F73",
    inverse: "#0B0E14",
  },
  border: {
    subtle: "#2A2F3E",
    strong: "#3A3F52",
  },
  brand: {
    primary: "#7C5CFC",
    primaryHover: "#8B6DFF",
    primaryPressed: "#6A4DED",
    success: "#3DDC97",
    danger: "#FF5C5C",
    warning: "#FFB547",
    info: "#4DA8FF",
  },
} as const;

export const radius = {
  xs: 4,
  sm: 8,
  md: 14,
  lg: 16,
  xl: 20,
  "2xl": 24,
  full: 9999,
} as const;

export const space = {
  1: 4,
  2: 5,
  3: 8,
  4: 10,
  5: 12,
  6: 16,
  7: 18,
  8: 20,
  9: 24,
  10: 32,
  11: 40,
  12: 48,
} as const;

export const motion = {
  duration: {
    instant: 150,
    fast: 200,
    normal: 350,
    slow: 500,
  },
} as const;

export type ColorToken = typeof colors;
