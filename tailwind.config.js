/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				bebas: ["Bebas Neue", "sans-serif"],
				inter: ["Inter", "sans-serif"],
			},
			colors: {
				primary: "#065f46",
				// primary: "#FAF8F1",
				secondary: "#f5f5f5",
				// secondary: "#FAEAB1",
				tersier: "#E5BA73",
				// tersier: "#E5BA73",
				dark: "#171717",
			},
			animation: {
				"zig-zag": "zig-zag 1.5s ease-in-out infinite",
			},
			keyframes: {
				"zig-zag": {
					"0%, 100%": {
						transform: "translateX(0%)",
					},
					"50%": {
						transform: "translateX(80%)",
					},
				},
			},
		},
	},
	plugins: [],
};
