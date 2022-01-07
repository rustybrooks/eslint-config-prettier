const prettier = {
  "arrowParens": "avoid",
  "singleQuote": true,
  "semi": true,
  "trailingComma": "all",
  "printWidth": 140,
  "overrides": [
    {
      "files": ["*.ts", "*.tsx"],
        "options": {
          "parser": "typescript"
        }
      },
  ],
}

module.exports = prettier
