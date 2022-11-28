module.exports = {
  'env': {
    'browser': true,
    'es2021': true,
  },
  'extends': [
    'plugin:react/recommended',
    'google',
  ],
  'overrides': [
  ],
  'parserOptions': {
    'ecmaVersion': 'latest',
    'sourceType': 'module',
  },
  'plugins': [
    'react',
  ],
  'rules': {
      "indent":"off",
      'require-jsdoc':'off',
      'max-len':'off',
      'react/prop-types':'off',
      'react/display-name':'off',


    }
};
