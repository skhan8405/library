module.exports = {
  projects: ["<rootDir>/setupTest.js"],
  roots: [
    "./__tests__"
  ],
  coverageReporters: ["text", "lcov", "json", "text", "clover", "cobertura"],
  collectCoverage: true
};