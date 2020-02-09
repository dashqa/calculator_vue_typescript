module.exports = {
  preset: "@vue/cli-plugin-unit-jest/presets/typescript-and-babel",
  moduleFileExtensions: [
    'js',
    'tsx',
    'vue',
    'ts'
  ],
  transform: {
    "^.+\\.tsx?$": "ts-jest"
  },
  moduleNameMapper: {
    "\\.(css)$": "identity-obj-proxy"
  },
  transformIgnorePatterns: ['<rootDir>/node_modules/']
};

