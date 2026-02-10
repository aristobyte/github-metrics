import nextJest from "next/jest";

const createJestConfig = nextJest({
  dir: "./"
});

const customJestConfig = {
  testEnvironment: "jsdom",
  moduleDirectories: ["node_modules", "<rootDir>/"],
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  snapshotResolver: "<rootDir>/jest.snapshot-resolver.cjs",
  watchman: false
};

export default createJestConfig(customJestConfig);
