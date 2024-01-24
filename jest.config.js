const { pathsToModuleNameMapper } = require("ts-jest");

module.exports = {
    preset: "ts-jest",
    testEnvironment: "node",
    roots: ["<rootDir>/src"],
    moduleNameMapper: pathsToModuleNameMapper(
    {
        "@tests/*": ["src/tests/*"],
        "@shared/*": ["src/modules/shared/*"],
        "@user/*": ["src/modules/user/*"],
        "@student/*": ["src/modules/student/*"],
    }, 
    { 
        prefix: "<rootDir>" 
    }),
    modulePaths: ["./",],
    // "setupFilesAfterEnv": ["<rootDir>/__tests__/setup.ts"],
}