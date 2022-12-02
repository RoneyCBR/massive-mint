/* eslint-disable no-undef */
module.exports = {
  'env': {
    'browser': true,
    'es2021': true,
  },
  'extends': [
    'eslint:recommended',
    'plugin:react/recommended',
  ],
  'settings': {
    'react': {
      'version': '17.0.2',
    },
  },
  'parserOptions': {
    'ecmaFeatures': {
      'jsx': true,
    },
    'ecmaVersion': 12,
    'sourceType': 'module',
  },
  'plugins': [
    'react',
  ],
  'rules': {  
    'comma-dangle': [
      'error',
      'only-multiline',
    ],
  },
};
