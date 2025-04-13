/**
 * @prettier
 */
module.exports = {
  printWidth: 200,
  tabWidth: 2,
  useTabs: false,
  semi: true,
  singleQuote: true,
  jsxSingleQuote: true,
  trailingComma: 'es5',
  arrowParens: 'avoid',
  requirePragma: false,
  bracketSpacing: true,
  quoteProps: 'consistent',
  parser: 'typescript',
  //   overrides: [
  //       {
  //           files: 'src/i18n/*.js',
  //           options: {
  //               printWidth: 20,
  //           },
  //       },
  //       {
  //           files: 'src/i18n/translate.js',
  //           options: {
  //               printWidth: 200,
  //           },
  //       },
  //   ],
  importOrder: ['<THIRD_PARTY_MODULES>', '^rootpath$', '^(scripts/.*)$', '(^src/.*)$', '^(test/.*)$'],
  importOrderSeparation: false,
  importOrderSortSpecifiers: true,
  importOrderBuiltinModulesToTop: true,
  importOrderMergeDuplicateImports: true,
  importOrderCombineTypeAndValueImports: true,
};
