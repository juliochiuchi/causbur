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
      },
    },
  },
  plugins: [],
}
