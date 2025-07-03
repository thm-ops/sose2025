import ts from "typescript-eslint";
import cspellRecommended from "@cspell/eslint-plugin/recommended";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
    baseDirectory: __dirname,
});

const eslintConfig = [
    ...ts.configs.recommendedTypeChecked,
    {
        languageOptions: {
            parserOptions: {
                projectService: true,
                tsconfigRootDir: __dirname,
            },
        },
    },
    cspellRecommended,
    ...compat.extends("next/core-web-vitals", "next/typescript"),
    {
        rules: {
            "linebreak-style": ["error", "unix"],
            "@typescript-eslint/no-explicit-any": "error",
            camelcase: "error",
            "@cspell/spellchecker": [
                "error",
                {
                    cspell: {
                        import: ["@cspell/dict-de-de/cspell-ext.json"],
                        language: "en-US,de-DE",
                        words: ["Gurkistan", "picsum", "unsplash", "PAYPAL", "paypal", "dicebear"],
                    },
                },
            ],
        },
    },
];

export default eslintConfig;
