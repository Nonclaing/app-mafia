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
      // Усиленные правила Vue
      "vue/no-template-shadow": "error",
      "vue/no-v-html": "error",
      "vue/max-attributes-per-line": ["error", {
        singleline: 6,
        multiline: { max: 1 },
      }],
      "vue/singleline-html-element-content-newline": ["error", {
        ignoreWhenNoAttributes: true,
        ignoreWhenEmpty: true,
        ignores: ["pre", "textarea"],
      }],
      "vue/no-mutating-props": "error",
      "vue/no-unused-components": "error",
      "vue/no-unused-vars": "error",
      "vue/no-use-v-if-with-v-for": ["error", { allowUsingIterationVar: false }],
      "vue/require-explicit-emits": "error",
      "vue/require-v-for-key": "error",
      "vue/attribute-hyphenation": ["error", "always"],
      "vue/custom-event-name-casing": ["error", "kebab-case"],
      "vue/component-name-in-template-casing": ["error", "PascalCase", { registeredComponentsOnly: false }],
      "vue/v-on-event-hyphenation": ["error", "always"],
      "vue/no-ref-as-operand": "error",
      "vue/valid-v-slot": "error",
      "vue/padding-line-between-blocks": ["error", "always"],
      "vue/block-tag-newline": ["error", {
        singleline: "always",
        multiline: "always",
      }],
      "vue/html-self-closing": ["error", {
        html: {
          void: "always",
          normal: "never",
          component: "always",
        },
        svg: "always",
        math: "always",
      }],
      // ... existing code ...

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
        code: 240,
        template: 480,
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
      // Форматирование шаблонов и блоков SFC
      "vue/html-indent": ["error", 2, {
        attribute: 1,
        baseIndent: 1,
        closeBracket: 0,
        alignAttributesVertically: true,
      }],
      "vue/singleline-html-element-content-newline": ["error", {
        ignoreWhenNoAttributes: true,
        ignoreWhenEmpty: true,
        ignores: ["pre", "textarea"],
      }],
      "vue/script-indent": ["error", 2],
      // Чтобы не ругаться на одиночные имена Nuxt-страниц/лейаутов, правило можно смягчить:
      "vue/multi-word-component-names": ["warn", { ignores: ["index", "default", "error"] }],
    },
  },
);