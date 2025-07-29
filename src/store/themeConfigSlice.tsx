import { createSlice } from "@reduxjs/toolkit";
import i18next from "i18next";
import themeConfig from "../theme.config";
import { applyCustomColorsToCSS, getCurrentThemeColorsFromCSS } from "@/utils/themeHelpers";

// Helpers
const resetCustomColors = () => {
  const root = document.documentElement;
  const vars = [
    "--TW-primary-color",
    "--TW-light-primary-color",
    "--TW-body-color",
    "--TW-dark-color",
    "--TW-text-color",
  ];
  vars.forEach((v) => root.style.removeProperty(v));
};

const initialThemeSource = localStorage.getItem("theme") || themeConfig.theme;
const isSystemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

const actualTheme =
  initialThemeSource === "system"
    ? isSystemDark
      ? "dark"
      : "light"
    : initialThemeSource;

// Don't apply custom colors here, just load them into state
const savedCustomColors = localStorage.getItem("customColors");
const defaultCustomColors = savedCustomColors
  ? JSON.parse(savedCustomColors)
  : getCurrentThemeColorsFromCSS();

// Initial state
const initialState = {
  themeSource: initialThemeSource,
  theme: actualTheme,
  isDarkMode: actualTheme === "dark",
  menu: localStorage.getItem("menu") || themeConfig.menu,
  layout: localStorage.getItem("layout") || themeConfig.layout,
  rtlClass: localStorage.getItem("rtlClass") || themeConfig.rtlClass,
  animation: localStorage.getItem("animation") || themeConfig.animation,
  navbar: localStorage.getItem("navbar") || themeConfig.navbar,
  locale: localStorage.getItem("i18nextLng") || themeConfig.locale,
  sidebar: localStorage.getItem("sidebar") === "true",
  semidark: localStorage.getItem("semidark") === "true",
  languageList: [
    { code: "en", name: "English" },
    { code: "ar", name: "Arabic" },
  ],
  customColors: defaultCustomColors,
};

// Slice
const themeConfigSlice = createSlice({
  name: "themeConfig",
  initialState,
  reducers: {
    toggleTheme(state, { payload }) {
      const themeType =
        typeof payload === "string" ? payload : payload?.type || state.theme;
      const customColors = payload?.customColors;

      state.themeSource = themeType;

      if (themeType === "light" || themeType === "dark") {
        state.theme = themeType;
        state.isDarkMode = themeType === "dark";
        resetCustomColors();
        // localStorage.removeItem("customColors");
      } else if (themeType === "system") {
        const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        state.theme = isDark ? "dark" : "light";
        state.isDarkMode = isDark;
        resetCustomColors();
        // localStorage.removeItem("customColors");
      } else if (themeType === "custom") {
        if (customColors) {
          state.customColors = customColors;
          applyCustomColorsToCSS(customColors);
          localStorage.setItem("customColors", JSON.stringify(customColors));
          const isDark = customColors.bodyColor.includes("36, 43, 51");
          state.isDarkMode = isDark;
          state.theme = isDark ? "dark" : "light";
        } else {
          // just apply saved
          applyCustomColorsToCSS(state.customColors);
          const isDark = state.customColors.bodyColor.includes("36, 43, 51");
          state.isDarkMode = isDark;
          state.theme = isDark ? "dark" : "light";
        }
      }

      localStorage.setItem("theme", themeType);
      document.body.classList.toggle("dark", state.isDarkMode);
    },

    toggleMenu(state, { payload }) {
      payload = payload || state.menu;
      state.sidebar = false;
      localStorage.setItem("menu", payload);
      state.menu = payload;
    },

    toggleLayout(state, { payload }) {
      payload = payload || state.layout;
      localStorage.setItem("layout", payload);
      state.layout = payload;
    },

    toggleRTL(state, { payload }) {
      payload = payload || state.rtlClass;
      localStorage.setItem("rtlClass", payload);
      state.rtlClass = payload;
      document.querySelector("html")?.setAttribute("dir", payload || "rtl");
    },

    toggleAnimation(state, { payload }) {
      payload = payload || state.animation;
      const clean = payload.trim();
      localStorage.setItem("animation", clean);
      state.animation = clean;
    },

    toggleNavbar(state, { payload }) {
      payload = payload || state.navbar;
      localStorage.setItem("navbar", payload);
      state.navbar = payload;
    },

    toggleSemidark(state, { payload }) {
      const val = payload === true || payload === "true";
      localStorage.setItem("semidark", val.toString());
      state.semidark = val;
    },

    toggleLocale(state, { payload }) {
      payload = payload || state.locale;
      i18next.changeLanguage(payload);
      state.locale = payload;
    },

    toggleSidebar(state) {
      state.sidebar = !state.sidebar;
    },

    setPageTitle(state, { payload }) {
      document.title = `${payload} | ${i18next.t("sidebar.dashboard")}`;
    },
  },
});

export const {
  toggleTheme,
  toggleMenu,
  toggleLayout,
  toggleRTL,
  toggleAnimation,
  toggleNavbar,
  toggleSemidark,
  toggleLocale,
  toggleSidebar,
  setPageTitle,
} = themeConfigSlice.actions;

export default themeConfigSlice.reducer;
