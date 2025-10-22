/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/app/**/*.{js,jsx,ts,tsx}", "./src/components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        heading: "Inter_600SemiBold",
        subtitle: "Inter_500Medium",
        body: "Inter_400Regular",
        bold: "Inter_700Bold",
      },
      colors: {
        "causbur-background-screen": "#0f172a",
        "causbur-border-divider": "#334155",
        "causbur-text-title-header": "#ffffff",
        "causbur-background-bag": "#bef264",
        "causbur-text-bag": "#0f172a",
        "causbur-background-button-category": "#1e293b",
        "causbur-border-activate-button-category": "#bef264",
        "causbur-text-button-category": "#f1f5f9",
        "causbur-text-price-item": "#a3e635",
        "causbur-text-description-item": "#94a3b8",
        "causbur-text-title-item": "#f1f5f9",
        "causbur-border-button-back": "#bef264",
        "causbur-text-button-back": "#cbd5e1",
        "causbur-background-button-add": "#a3e635",
        "causbur-text-button-add": "#000",
        "causbur-text-category-name": "#fff"
      },
    },
  },
  plugins: [],
}
