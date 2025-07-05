import globals from "globals";
import js from "@eslint/js";

export default [
    js.configs.recommended,
    {
        languageOptions: {
            ecmaVersion: "latest",
            sourceType: "module",
            globals: {
                ...globals.node
            }
        },
        rules: {
            "arrow-parens": ["error", "as-needed"],
            "brace-style": ["error", "1tbs"],
            "comma-dangle": "error",
            "curly": ["error", "all"],
            "eqeqeq": "error",
            "guard-for-in": "error",
            "indent": ["error", 4, { SwitchCase: 1 }],
            "max-len": ["error", 160, { ignoreComments: true, ignoreUrls: true }],
            "no-console": "off",
            "no-eval": "error",
            "no-process-exit": "off",
            "no-restricted-properties": ["error",
                { property: "substring", message: "Use .slice instead of .substring." },
                { property: "substr", message: "Use .slice instead of .substr." },
                { object: "assert", property: "equal", message: "Use assert.strictEqual instead of assert.equal." },
                { object: "assert", property: "notEqual", message: "Use assert.notStrictEqual instead of assert.notEqual." },
                { object: "assert", property: "deepEqual", message: "Use assert.deepStrictEqual instead of assert.deepEqual." },
                { object: "assert", property: "notDeepEqual", message: "Use assert.notDeepStrictEqual instead of assert.notDeepEqual." }
            ],
            "no-shadow": "error",
            "no-unused-vars": ["error", {
                vars: "all",
                args: "after-used",
                caughtErrors: "all"
            }],
            "no-use-before-define": ["error", "nofunc"],
            "no-var": "error",
            "object-curly-spacing": ["error", "always"],
            "prefer-const": "error",
            "quotes": ["error", "double", { avoidEscape: true }],
            "radix": "error",
            "semi": "error",
            "space-before-function-paren": ["error", {
                anonymous: "never",
                named: "never",
                asyncArrow: "always"
            }],
            "spaced-comment": ["error", "always", { exceptions: ["-"] }]
        }
    }
];
