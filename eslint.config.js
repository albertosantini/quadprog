"use strict";

const globals = require("globals");
const js = require("@eslint/js");

module.exports = [
    js.configs.recommended,
    {
        languageOptions: {
            globals: {
                ...globals.builtin,
                ...globals.node
            },
            sourceType: "commonjs"
        },
        rules: {
            "array-bracket-spacing": "error",
            "array-callback-return": "error",
            "arrow-body-style": ["error", "as-needed"],
            "arrow-parens": ["error", "as-needed"],
            "arrow-spacing": "error",
            indent: ["error", 4, { SwitchCase: 1 }],
            "block-spacing": "error",
            "brace-style": ["error", "1tbs"],
            camelcase: "error",
            "class-methods-use-this": "error",
            "comma-dangle": "error",
            "comma-spacing": "error",
            "comma-style": ["error", "last"],
            "computed-property-spacing": "error",
            "consistent-return": "error",
            curly: ["error", "all"],
            "default-case": "error",
            "default-case-last": "error",
            "default-param-last": "error",
            "dot-location": ["error", "property"],
            "dot-notation": [
                "error",
                { allowKeywords: true }
            ],
            "eol-last": "error",
            eqeqeq: "error",
            "func-call-spacing": "error",
            "func-style": ["error", "declaration"],
            "function-call-argument-newline": ["error", "consistent"],
            "function-paren-newline": ["error", "consistent"],
            "generator-star-spacing": "error",
            "grouped-accessor-pairs": "error",
            "guard-for-in": "error",
            "key-spacing": ["error", { beforeColon: false, afterColon: true }],
            "keyword-spacing": "error",
            "lines-around-comment": ["error",
                {
                    beforeBlockComment: true,
                    afterBlockComment: false,
                    beforeLineComment: true,
                    afterLineComment: false
                }
            ],
            "max-len": ["error", 160,
                {
                    ignoreComments: true,
                    ignoreUrls: true,
                    ignoreStrings: true,
                    ignoreTemplateLiterals: true,
                    ignoreRegExpLiterals: true
                }
            ],
            "max-statements-per-line": "error",
            "new-cap": "error",
            "new-parens": "error",
            "no-alert": "error",
            "no-array-constructor": "error",
            "no-caller": "error",
            "no-confusing-arrow": "error",
            "no-console": "off",
            "no-constant-binary-expression": "error",
            "no-constructor-return": "error",
            "no-else-return": ["error", { allowElseIf: false }
            ],
            "no-eval": "error",
            "no-extend-native": "error",
            "no-extra-bind": "error",
            "no-extra-semi": "error",
            "no-floating-decimal": "error",
            "no-implied-eval": "error",
            "no-inner-declarations": "error",
            "no-invalid-this": "error",
            "no-iterator": "error",
            "no-label-var": "error",
            "no-labels": "error",
            "no-lone-blocks": "error",
            "no-loop-func": "error",
            "no-mixed-spaces-and-tabs": ["error", false],
            "no-multi-spaces": "error",
            "no-multi-str": "error",
            "no-multiple-empty-lines": [
                "error",
                {
                    max: 2,
                    maxBOF: 0,
                    maxEOF: 0
                }
            ],
            "no-nested-ternary": "error",
            "no-new": "error",
            "no-new-func": "error",
            "no-new-object": "error",
            "no-new-wrappers": "error",
            "no-octal-escape": "error",
            "no-param-reassign": "error",
            "no-proto": "error",
            "no-process-exit": "off",
            "no-restricted-properties": ["error",
                {
                    property: "substring",
                    message: "Use .slice instead of .substring."
                },
                {
                    property: "substr",
                    message: "Use .slice instead of .substr."
                },
                {
                    object: "assert",
                    property: "equal",
                    message: "Use assert.strictEqual instead of assert.equal."
                },
                {
                    object: "assert",
                    property: "notEqual",
                    message: "Use assert.notStrictEqual instead of assert.notEqual."
                },
                {
                    object: "assert",
                    property: "deepEqual",
                    message: "Use assert.deepStrictEqual instead of assert.deepEqual."
                },
                {
                    object: "assert",
                    property: "notDeepEqual",
                    message: "Use assert.notDeepStrictEqual instead of assert.notDeepEqual."
                }
            ],
            "no-return-assign": "error",
            "no-script-url": "error",
            "no-self-compare": "error",
            "no-sequences": "error",
            "no-shadow": "error",
            "no-tabs": "error",
            "no-throw-literal": "error",
            "no-trailing-spaces": "error",
            "no-undef": ["error", { typeof: true }],
            "no-undef-init": "error",
            "no-undefined": "error",
            "no-underscore-dangle": ["error", { allowAfterThis: true }
            ],
            "no-unmodified-loop-condition": "error",
            "no-unneeded-ternary": "error",
            "no-unreachable-loop": "error",
            "no-unused-expressions": "error",
            "no-unused-vars": ["error", {
                vars: "all",
                args: "after-used",
                caughtErrors: "all"
            }
            ],
            "no-use-before-define": ["error", "nofunc"],
            "no-useless-assignment": "error",
            "no-useless-call": "error",
            "no-useless-computed-key": "error",
            "no-useless-concat": "error",
            "no-useless-constructor": "error",
            "no-useless-rename": "error",
            "no-useless-return": "error",
            "no-whitespace-before-property": "error",
            "no-var": "error",
            "object-curly-newline": ["error",
                {
                    consistent: true,
                    multiline: true
                }
            ],
            "object-curly-spacing": ["error", "always"],
            "object-property-newline": ["error",
                {
                    allowAllPropertiesOnSameLine: true
                }
            ],
            "object-shorthand": ["error",
                "always",
                {
                    avoidExplicitReturnArrows: true
                }
            ],
            "one-var-declaration-per-line": "error",
            "operator-assignment": "error",
            "operator-linebreak": "error",
            "padding-line-between-statements": ["error",
                {
                    blankLine: "always",
                    prev: ["const", "let", "var"],
                    next: "*"
                },
                {
                    blankLine: "any",
                    prev: ["const", "let", "var"],
                    next: ["const", "let", "var"]
                }
            ],
            "prefer-arrow-callback": "error",
            "prefer-const": "error",
            "prefer-exponentiation-operator": "error",
            "prefer-numeric-literals": "error",
            "prefer-object-has-own": "error",
            "prefer-promise-reject-errors": "error",
            "prefer-regex-literals": "error",
            "prefer-rest-params": "error",
            "prefer-spread": "error",
            "prefer-template": "error",
            quotes: ["error", "double", { avoidEscape: true }],
            "quote-props": ["error", "as-needed"],
            radix: "error",
            "require-unicode-regexp": "error",
            "rest-spread-spacing": "error",
            semi: "error",
            "semi-spacing": ["error",
                {
                    before: false,
                    after: true
                }
            ],
            "semi-style": "error",
            "space-before-blocks": "error",
            "space-before-function-paren": ["error",
                {
                    anonymous: "never",
                    named: "never",
                    asyncArrow: "always"
                }
            ],
            "space-in-parens": "error",
            "space-infix-ops": "error",
            "space-unary-ops": ["error",
                {
                    words: true,
                    nonwords: false
                }
            ],
            "spaced-comment": ["error",
                "always",
                {
                    exceptions: ["-"]
                }
            ],
            strict: ["error", "global"],
            "switch-colon-spacing": "error",
            "symbol-description": "error",
            "template-curly-spacing": ["error", "never"],
            "template-tag-spacing": "error",
            "unicode-bom": "error",
            "wrap-iife": "error",
            "yield-star-spacing": "error",
            yoda: ["error", "never", { exceptRange: true }]
        }
    }
];
