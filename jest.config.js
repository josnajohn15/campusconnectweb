// jest.config.js
module.exports = {
    testEnvironment: 'jsdom',
    transformIgnorePatterns: [
      '/node_modules/(?!(axios)/)', // Let Jest transform axios
    ],
    moduleNameMapper: {
      '\\.(css|scss)$': 'identity-obj-proxy' // Optional: mock CSS
    }
  };
  