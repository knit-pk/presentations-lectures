module.exports = {
  root: false,
  parser: 'babel-eslint',
  env: {
    browser: true,
    node: true,
    es6: true
  },
  extends: ['standard'],
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // add your custom rules here
  rules: {
    'operator-linebreak': ['error', 'after']
   },
  globals: {}
}
