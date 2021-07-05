module.exports = {
    "env": {
        "browser": true,
        "es2021": true,
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended",
    ],
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true,
        },
        "ecmaVersion": 12,
        "sourceType": "module",
    },
    "plugins": [
        "react",
    ],
    "settings": {
        "sharedData": "Hello",
        "react": {
            "createClass": "createReactClass",
            "pragma": "React",
            "fragment": "Fragment",
            "version": "detect",
        },
    },
    "rules": {},
};
