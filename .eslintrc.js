module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
    node: true
  },
  parserOptions: {
    ecmaVersion: 9,
    sourceType: "module"
  },
  extends: ["eslint:recommended"],
  rules: {
    "array-bracket-spacing": ["error", "never"],
    "arrow-parens": ["error", "as-needed"],
    "arrow-spacing": ["error"],
    "block-spacing": ["error", "always"],
    "comma-dangle": ["error", {arrays: "never", objects: "never"}],
    "comma-spacing": ["error"],
    "computed-property-spacing": ["error", "never"],
    "eol-last": ["error"],
    "func-call-spacing": ["error", "never"],
    indent: ["error", 2, {SwitchCase: 1}],
    "key-spacing": ["error"],
    "keyword-spacing": ["error", {before: true, after: true}],
    "linebreak-style": ["error", "unix"],
    "max-len": ["error", {code: 100}],
    "no-alert": ["off"], //TODO
    "no-console": ["error", {allow: ["debug", "info", "warn", "error"]}],
    "no-debugger": ["error"],
    "no-multiple-empty-lines": ["error", {max: 1}],
    "no-multi-spaces": ["error", {ignoreEOLComments: true}],
    "no-trailing-spaces": ["error"],
    "object-curly-spacing": ["error", "never"],
    "rest-spread-spacing": ["error", "never"],
    semi: ["error", "never"],
    "semi-spacing": ["error", {before: false, after: true}],
    "space-before-blocks": ["error"],
    "space-before-function-paren": [
      "error",
      {
        anonymous: "never",
        named: "never",
        asyncArrow: "always"
      }
    ],
    "space-in-parens": ["error", "never"],
    "space-infix-ops": ["error", {int32Hint: true}],
    "space-unary-ops": ["error", {words: true, nonwords: false}],
    "switch-colon-spacing": ["error", {after: true, before: false}],
    "template-curly-spacing": ["error", "never"],
    "template-tag-spacing": ["error", "never"]
  }
}
