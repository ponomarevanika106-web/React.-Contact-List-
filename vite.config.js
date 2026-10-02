import js from "@eslint/js";
import { defineConfig, globalIgnores } from "eslint/config";
import globals from "globals";

export default defineConfig([
  globalIgnores(["dist", "node_modules"]),

  {
    files: ["**/*.{js,jsx}"],

    languageOptions: {
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
      },
    },

    plugins: {},

    rules: {
      ...js.configs.recommended.rules,

      "no-unused-vars": "warn",
      "no-undef": "error",
      "no-console": "warn",
      "eqeqeq": "error",
      "prefer-const": "warn",
      "no-var": "error",
      "object-shorthand": "error",
    },
  },
]);
