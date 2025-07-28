import containerQueries from "@tailwindcss/container-queries";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        primary: {
          DEFAULT: "rgb(var(--TW-primary-color)/1)",
          light: "rgb(var(--TW-primary-color)/0.2)",
        },
        body: "rgb(var(--TW-body-color),1)",
        dark: "rgb(var(--TW-dark-color),1)",
        text: "rgb(var(--TW-text-color),1)",
        secondary: "rgb(var(--TW-text-sec-color),1)",
        border: "rgb(var(--TW-border-color))",
        placeholder: "rgb(var(--TW-placeholder-color),1)",

        success: {
          DEFAULT: "#10b981",
          light: "#d1fae5",
        },
        danger: {
          DEFAULT: "#ef4444",
          light: "#fee2e2",
        },
        warning: {
          DEFAULT: "#f59e0b",
          light: "#fef3c7",
        },
        info: {
          DEFAULT: "#3b82f6",
          light: "#dbeafe",
        },

        // Utility colors
        transparent: "transparent",
        current: "currentColor",
        white: "#ffffff",
        black: "#000000",
      },
      fontFamily: {
        nunito: ["Nunito", "sans-serif"],
      },
      spacing: {
        4.5: "18px",
      },
      boxShadow: {
        sm: "var(--TW-shadow-sm)",
        DEFAULT: "var(--TW-shadow)",
        box: "var(--TW--box-shadow)",
        md: "var(--TW-shadow-md)",
        lg: "var(--TW-shadow-lg)",
        "3xl":
          "0 2px 2px rgb(224 230 237 / 46%), 1px 6px 7px rgb(224 230 237 / 46%)",
      },
      typography: () => ({
        DEFAULT: {
          css: {
            h1: { fontSize: "40px", marginBottom: "0.5rem", marginTop: 0 },
            h2: { fontSize: "32px", marginBottom: "0.5rem", marginTop: 0 },
            h3: { fontSize: "28px", marginBottom: "0.5rem", marginTop: 0 },
            h4: { fontSize: "24px", marginBottom: "0.5rem", marginTop: 0 },
            h5: { fontSize: "20px", marginBottom: "0.5rem", marginTop: 0 },
            h6: { fontSize: "16px", marginBottom: "0.5rem", marginTop: 0 },
            p: { marginBottom: "0.5rem" },
            li: { margin: 0 },
            img: { margin: 0 },
          },
        },
      }),
      screens: {
        xs: "400px",
      },
    },
  },
  plugins: [containerQueries],
};
