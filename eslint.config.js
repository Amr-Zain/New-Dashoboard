// import globals from "globals";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import pluginReactHooks from "eslint-plugin-react-hooks";
import pluginReactRefresh from "eslint-plugin-react-refresh";
import js from "@eslint/js";

export default tseslint.config(
  {
    ignores: ["dist", "vite.config.d.ts", "postcss.config.cjs"],
  },
  js.configs.recommended,
  {
    files: ["**/*.{ts,tsx}", "!vite.config.d.ts", "!**/*.cjs"],
    extends: [...tseslint.configs.recommended],
    plugins: {
      react: pluginReact,
      "react-hooks": pluginReactHooks,
      "react-refresh": pluginReactRefresh,
    },
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: true,
        tsconfigRootDir: import.meta.dirname,
      },
      globals: {
        ...globals.browser,
      },
    },
    rules: {
      ...pluginReact.configs.recommended.rules,
      ...pluginReactHooks.configs.recommended.rules,
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "no-unused-vars": "off",
      "react/react-in-jsx-scope": "off",
      "react/jsx-no-constructed-context-values": "warn",
      "react/jsx-no-undef": "error",
      "react/jsx-key": "warn",
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
  
);