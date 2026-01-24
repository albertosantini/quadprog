import globals from "globals";
import js from "@eslint/js";
import eslintConfigEslint from "eslint-config-eslint";

export default [
    js.configs.recommended,
    ...eslintConfigEslint,
    {
        languageOptions: {
            globals: {
                ...globals.node
            },
            ecmaVersion: "latest",
            sourceType: "module"
        },
        rules: {
            "no-console": "off",
            "jsdoc/require-jsdoc": "off",
            "jsdoc/require-description": "off",
            "jsdoc/require-param-description": "off",
            "jsdoc/require-param-type": "off",
            "jsdoc/require-returns": "off",
            "camelcase": ["error", { "allow": ["unconstrained_solution"] }],
            "func-style": "off",
            "n/no-unsupported-features/node-builtins": "off"
        }
    },
    {
        files: ["eslint.config.js"],
        rules: {
            "n/no-unpublished-import": "off"
        }
    }
];
