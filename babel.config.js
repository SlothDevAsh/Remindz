module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        extensions: [
          '.js',
          '.jsx',
          '.ts',
          '.tsx',
          '.android.js',
          '.android.tsx',
          '.ios.js',
          '.ios.tsx',
        ],
        root: ['./src'],
        alias: {
          '@assets': './assets',
          '@components': './src/components',
          '@service': './src/service',
          '@navigation': './src/navigation',
          '@screens': './src/screens',
          '@type': './src/types',
          '@utils': './src/utils',
        },
      },
    ],
  ],
};
