module.exports = {
    "extends": "airbnb",
    "plugins": [
        "react",
        "jsx-a11y",
        "import"
    ],
    "rules": {
      "indent": ["error", 2, { "SwitchCase": 1 }],
      "no-console": "off",
      "react/prefer-es6-class": 0,
      "comma-dangle": ["error", "never"]
    }
};
