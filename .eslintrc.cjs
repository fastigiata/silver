module.exports = {
    root: true,
    env: {browser: true, es2020: true},
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react-hooks/recommended',
    ],
    ignorePatterns: ['dist', '.eslintrc.cjs', '*.d.ts'],
    parser: '@typescript-eslint/parser',
    plugins: ['react-refresh'],
    rules: {
        "@typescript-eslint/consistent-type-imports": "warn",
        'react-refresh/only-export-components': [
            'warn',
            {allowConstantExport: true},
        ],
        "accessor-pairs": "warn",
        "array-bracket-spacing": [
            "error",
            "always"
        ],
        "object-curly-spacing": [
            "error",
            "always"
        ],
        "arrow-spacing": [
            "error",
            {
                "before": true,
                "after": true
            }
        ],
        "block-spacing": [
            "error",
            "always"
        ],
        "brace-style": [
            "error",
            "1tbs",
            {
                "allowSingleLine": true
            }
        ],
        "camelcase": "off",
        "comma-dangle": [
            "off",
            "always"
        ],
        "semi": [
            "error",
            "never"
        ],
        "comma-spacing": [
            "error",
            {
                "before": false,
                "after": true
            }
        ],
        "consistent-return": "warn",
        "constructor-super": "error",
        "curly": [
            "error",
            "multi-line"
        ],
        "default-case": "error",
        "dot-location": [
            "error",
            "property"
        ],
        "eqeqeq": "warn",
        "func-names": "off",
        "func-style": "off",
        "generator-star-spacing": [
            "error",
            {
                "before": false,
                "after": true
            }
        ],
        "quotes": [
            "error",
            "single",
            "avoid-escape"
        ],
        "indent": [
            "warn",
            4,
            {
                "SwitchCase": 1
            }
        ],
        "no-var": "error",
        "no-unused-expressions": "error",
        "no-extra-boolean-cast": "off",
        "no-extra-semi": "error",
        "complexity": [
            "warn",
            {
                "max": 10
            }
        ],
        "space-before-blocks": [
            "error",
            "always"
        ],
        "spaced-comment": [
            "error",
            "always"
        ],
    },
}
