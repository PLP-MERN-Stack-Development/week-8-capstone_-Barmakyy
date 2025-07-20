module.exports = {
    testEnvironment: "jsdom",
    moduleNameMapper: {
      "\\.(css|less|scss|sass)$": "identity-obj-proxy",
      "\\.(jpg|jpeg|png|gif|svg)$": "<rootDir>/__mocks__/fileMock.js"
    },
    setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
    transform: {
      "^.+\\.[jt]sx?$": "babel-jest"
    },
    moduleFileExtensions: ["js", "jsx", "json", "node"]
  };