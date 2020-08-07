// eslint-disable-next-line no-undef
module.exports = {
    root: true,
    parser: "@typescript-eslint/parser",
    plugins: [
        "@typescript-eslint",
    ],
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
    ],
    env: {
        "browser": true,
        "amd": true
    },
    globals: {
        "dojo": "readonly",
        "dijit": "readonly",
        "dojoConfig": "readonly",
        "debugConfig": "readonly",
        "Promise": "readonly"
    },
    rules: {
        "no-redeclare": "off",
        "no-empty": "off",
        "no-empty-pattern": "off",
        "no-constant-condition": "off",
        "no-case-declarations": "off",
        "no-prototype-builtins": "off",
        "no-unused-vars": "off",
        "no-useless-escape": "off",
        "no-unexpected-multiline": "off",
        "no-extra-boolean-cast": "off",
        "no-self-assign": "off",
        "no-multiple-empty-lines": [
            "warn", {
                max: 1
            }],

        "prefer-rest-params": "off",
        "prefer-spread": "off",

        "semi": ["warn", "always"],
        "quotes": ["warn", "double"],

        "@typescript-eslint/explicit-module-boundary-types": "off",
        "@typescript-eslint/no-unused-vars": "off",
        "@typescript-eslint/ban-ts-comment": "off",
        "@typescript-eslint/no-inferrable-types": "off",
        "@typescript-eslint/no-empty-function": "off",
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/no-empty-interface": "off",
        "@typescript-eslint/no-this-alias": [
            "error",
            {
                "allowDestructuring": true, // Allow `const { props, state } = this`; false by default
                "allowedNames": ["context"] // Allow `const self = this`; `[]` by default
            }
        ],
        "@typescript-eslint/ban-types": [
            "error",
            {
                "types": {
                    // add a custom message, AND tell the plugin how to fix it
                    "String": {
                        "message": "Use string instead",
                        "fixWith": "string"
                    },

                    "{}": {
                        "message": "Use object instead",
                        "fixWith": "object"
                    },

                    "object": false
                }
            }
        ],
        "@typescript-eslint/no-non-null-assertion": "off",
        "@typescript-eslint/no-namespace": "off",
        "@typescript-eslint/no-var-require": "off"
    }
};
