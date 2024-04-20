const nextJest = require("next/jest")
const dotenv = require("dotenv")
dotenv.config({ path: ".env.local" })

const createJestConfig = nextJest({
  dir: "./",
})

const customJestConfig = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  testEnvironment: "node",
  modulePathIgnorePatterns: ["<rootDir>/dist/"],
  testPathIgnorePatterns: ["<rootDir>/src/e2e"],
}

module.exports = createJestConfig(customJestConfig)
