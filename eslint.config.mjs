import { FlatCompat } from "@eslint/eslintrc";
// @ts-ignore -- no types for this plugin
import drizzle from "eslint-plugin-drizzle";
import eslintReactHooks from "eslint-plugin-react-hooks";
import nextPlugin from "@next/eslint-plugin-next";
import tseslint from "typescript-eslint";

const compat = new FlatCompat({
	baseDirectory: import.meta.dirname,
});

export default tseslint.config(
	{
		ignores: [".next", "src/components/ui/**"],
	},
	...compat.extends("next/core-web-vitals"),
	{
		files: ["**/*.ts", "**/*.tsx"],
		plugins: {
			drizzle,
			"react-hooks": eslintReactHooks,
			next: nextPlugin,
		},
		extends: [
			...tseslint.configs.recommended,
			...tseslint.configs.recommendedTypeChecked,
			...tseslint.configs.stylisticTypeChecked,
		],
		rules: {
			"@typescript-eslint/array-type": "off",
			"@typescript-eslint/consistent-type-definitions": "off",
			"@typescript-eslint/consistent-type-imports": [
				"warn",
				{ prefer: "type-imports", fixStyle: "inline-type-imports" },
			],
			"@typescript-eslint/no-unused-vars": [
				"warn",
				{ argsIgnorePattern: "^_" },
			],
			"@typescript-eslint/require-await": "off",
			"@typescript-eslint/prefer-nullish-coalescing": "off",
			"@typescript-eslint/no-unsafe-member-access": "off",
			"@typescript-eslint/no-unsafe-call": "off",
			"@typescript-eslint/no-unsafe-assignment": "off",
			"@typescript-eslint/no-misused-promises": [
				"error",
				{ checksVoidReturn: { attributes: false } },
			],
			"drizzle/enforce-delete-with-where": [
				"error",
				{ drizzleObjectName: ["db", "ctx.db"] },
			],
			"drizzle/enforce-update-with-where": [
				"error",
				{ drizzleObjectName: ["db", "ctx.db"] },
			],
			"react-hooks/rules-of-hooks": "error",
			"react-hooks/exhaustive-deps": "warn",
			"next/no-html-link-for-pages": "error",
			"next/no-img-element": "warn",
			"next/no-unwanted-polyfillio": "warn",
			"next/no-duplicate-head": "error",
		},
	},
	{
		linterOptions: {
			reportUnusedDisableDirectives: true,
		},
		languageOptions: {
			parserOptions: {
				projectService: true,
			},
		},
	}
);
