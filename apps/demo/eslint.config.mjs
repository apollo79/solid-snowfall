import js from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
import pluginPrettier from "eslint-plugin-prettier/recommended";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import solidPlugin from "eslint-plugin-solid/configs/recommended";
import tseslint from "typescript-eslint";

export default tseslint.config([
  { ignores: [".solid/**", ".vercel/**", ".github/**", "**/dist/**", "node_modules/**", ".env", "pnpm-lock.yaml"] },

  js.configs.recommended,
  tseslint.configs.recommended,
  pluginPrettier,
  eslintConfigPrettier,
  solidPlugin,
  {
    plugins: {
      "simple-import-sort": simpleImportSort,
    },

    languageOptions: {
      ecmaVersion: 2024,
      sourceType: "module",

      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },

    rules: {
      "simple-import-sort/imports": [
        "error",
        {
          groups: [
            ["^solid-(js|start)", "^@solidjs/"],
            ["^@?\\w"],
            ["^~/components/"],
            ["^~/utils/"],
            ["^\\u0000"],
            ["^\\.\\.(?!/?$)", "^\\.\\./?$"],
            ["^\\./(?=.*/)(?!/?$)", "^\\.(?!/?$)", "^\\./?$"],
            ["^~/types$"],
            ["^.+\\.?(s?css)$"],
          ],
        },
      ],

      "simple-import-sort/exports": "error",
    },
  },
]);
