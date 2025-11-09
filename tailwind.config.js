/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
			colors: {
				primary: "#212121",
				light: {
					100: "#fffcfc", // light
					200: "#b3b3b3", // light selected
					300: "#a4a4a4", // light no selected
				},
				dark: {
					100: "#a7a7a7", // off
					200: "#262626", // dark selected
					300: "#2d2d2d", // dark no selected
				},
				user: "#dadada",
				ai: "#999999",
				side: "#a0a0a0"
			},
			fontFamily: {
				fregular: ["LibreCaslonText-Regular"],
				fitalic: ["LibreCaslonText-Italic"],
				fbold: ["LibreCaslonText-Bold"]
			}
		},
  },
  plugins: [],
}

