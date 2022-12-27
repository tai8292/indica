module.exports = {
  preset: 'react-native',
  setupFiles: ['./node_modules/react-native-gesture-handler/jestSetup.js'],
  setupFilesAfterEnv: ['./__mocks__/globalMock.ts', '@testing-library/jest-native/extend-expect'],
  transformIgnorePatterns: ['node_modules/(?!@react-native|react-native|@react-navigation)'],
  moduleDirectories: ['node_modules', 'src'],
  resetMocks: true,
  clearMocks: true,
};
