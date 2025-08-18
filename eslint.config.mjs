import { createConfigForNuxt } from "@nuxt/eslint-config";
import withNuxt from "./.nuxt/eslint.config.mjs";

const config = createConfigForNuxt({
	features: {
		stylistic: {
			quotes: "double",
			indent: "tab",
			semi: true,
			arrowParens: "always",
			commaDangle: "always-multiline",
			blockSpacing: "always",
		},
	},
});

config.append({
	rules: {
		"no-console": "off",
		"vue/no-v-html": "off",
		"vue/no-template-shadow": "off",
		"vue/max-attributes-per-line": "off",
		"@stylistic/max-len": ["error", {
			code: 240,
			ignoreComments: true,
			ignoreUrls: true,
			ignoreStrings: true,
			ignoreTemplateLiterals: true,
		}],
	},
});

export default withNuxt(config);
