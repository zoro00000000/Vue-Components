// 统一命名规则

module.exports = {
  "rules": {
    "block-no-empty": null,
    "color-no-invalid-hex": true,
    "comment-empty-line-before": [ "always", {
        "ignore": ["stylelint-commands", "between-comments"]
    } ],
    "declaration-colon-space-after": "always",
    "indentation": 2,
    "max-empty-lines": 2,
    "rule-empty-line-before": [ "always", {
        "except": ["first-nested"],
        "ignore": ["after-comment"]
    } ],
    "unit-whitelist": ["em", "rem", "%", "s", "px", "vw", "deg"]
  }
}