// @ts-check
import vue from "eslint-plugin-vue";
import tsParser from "@typescript-eslint/parser";
import vueParser from "vue-eslint-parser";
import stylistic from "@stylistic/eslint-plugin";
// ... existing code ...
import withNuxt from "@nuxt/eslint-config/flat";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import globals from "globals";

// ... existing code ...

export default withNuxt(
  {
    files: ["**/*.js", "**/*.ts", "**/*.vue"],
    ignores: [
      "node_modules/**",
      "dist/**",
      ".nuxt/**",
      ".api/**",
      ".output/**",
      "phpstorm.config.js",
    ],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: tsParser,
        ecmaVersion: "latest",
        sourceType: "module",
        extraFileExtensions: [".vue"],
      },
      globals: {
        ...globals.browser,
      },
    },
    plugins: {
      vue,
      "@stylistic": stylistic,
      "@typescript-eslint": tsPlugin,
    },
    rules: {
      "vue/no-template-shadow": "off",
      "vue/no-v-html": "off",
      "vue/max-attributes-per-line": "off",
      "vue/singleline-html-element-content-newline": "off",

      // Стилевые правила
      "@stylistic/quotes": ["error", "double"],
      "@stylistic/semi": ["error", "always"],
      "indent": "off",
      "@stylistic/indent": ["error", 2],
      "@stylistic/max-len": ["error", {
        code: 120,
        ignoreComments: true,
        ignoreUrls: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
        ignoreRegExpLiterals: true,
        ignorePattern: "^import\\s.+\\sfrom\\s.+;$",
      }],
      "@stylistic/object-curly-spacing": ["error", "always"],
      "@stylistic/arrow-parens": ["error", "always"],
      "@stylistic/comma-dangle": ["error", "always-multiline"],

      // Консоль
      "no-console": ["warn", { allow: ["error"] }],

      // TS-специфика
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": ["error", {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
        caughtErrorsIgnorePattern: "^_",
      }],
    },
  },
  {
    files: ["**/*.vue"],
    rules: {
      "indent": "off",
      "max-len": "off",
      "vue/max-len": ["error", {
        code: 120,
        template: 240,
        tabWidth: 2,
        comments: 240,
        ignoreComments: true,
        ignoreTrailingComments: true,
        ignoreUrls: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
        ignoreRegExpLiterals: true,
        ignorePattern: "^import\\s.+\\sfrom\\s.+;$", // игнорировать длинные импорты
      }],
      "vue/html-indent": ["error", 2, {
        attribute: 1,
        baseIndent: 1,
        closeBracket: 0,
        alignAttributesVertically: true,
      }],
    },
  },
);