module.exports = {
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  collectCoverageFrom: ['src/**/*.{js,ts,tsx,jsx}'],
  coverageReporters: ['lcov'],
  testPathIgnorePatterns: [
    '<rootDir>[/\\\\](build|docs|node_modules|scripts)[/\\\\]',
    '\\.d\\.ts$'
  ],
  testURL: 'http://localhost:3000',
  transform: {
    '^.+\\.js$': '<rootDir>/node_modules/babel-jest',
    '^.+\\.jsx$': '<rootDir>/node_modules/babel-jest'
  },
  transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.(js|jsx)$'],
  moduleDirectories: ['<rootDir>/src', 'node_modules'],
  testRegex: '\\.spec\\.(js|ts|jsx|tsx)$'
};
