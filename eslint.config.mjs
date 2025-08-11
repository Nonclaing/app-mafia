// @ts-check
import vue from "eslint-plugin-vue";
import tsParser from "@typescript-eslint/parser";
import vueParser from "vue-eslint-parser";
import stylistic from "@stylistic/eslint-plugin";
import withNuxt from "./.nuxt/eslint.config.mjs";

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
        window: "readonly",
        document: "readonly",
        module: "writable",
        require: "readonly",
      },
    },
    plugins: {
      vue,
      "@stylistic": stylistic,
    },
    rules: {
      "vue/no-template-shadow": "off",
      "vue/no-v-html": "off",
      "vue/max-attributes-per-line": "off",
      "vue/singleline-html-element-content-newline": "off",

      "quotes": ["error", "double"],
      "semi": ["error", "always"],
      "indent": ["error", 2],
      "max-len": ["error", {
        code: 120,
        ignoreComments: true,
        ignoreUrls: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
        ignoreRegExpLiterals: true,
        ignorePattern: "^import\\s.+\\sfrom\\s.+;$",
      }],
      "object-curly-spacing": ["error", "always"],
      "arrow-parens": ["error", "always"],
      "comma-dangle": ["error", "always-multiline"],
      "no-console": ["warn", { allow: ["error"] }],
    },
  },
  {
    files: ["**/*.vue"],
    rules: {
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
    },
  },
);
