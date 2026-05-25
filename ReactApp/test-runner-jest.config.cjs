// Extends @storybook/test-runner's default jest config.
// .cjs because the parent package.json has "type": "module" — keeps require()
// working without rewriting as ESM.
const { getJestConfig } = require('@storybook/test-runner');

const baseConfig = getJestConfig();

module.exports = {
  ...baseConfig,

  // Default 15s isn't enough for stories that exercise a real EPICS PV
  // roundtrip (PV connect + write + broadcast back can take a few seconds).
  testTimeout: 60_000,

  // test-runner reads its Playwright launch/context config from jest's
  // testEnvironmentOptions["jest-playwright"] (see test-environment.js
  // _jestPlaywrightConfig). Setting ignoreHTTPSErrors lets the browser accept
  // the self-signed cert that nginx serves at https://localhost:6060 in the
  // dev compose, so tests can run through the same nginx route a real user
  // would (where /pvServer is correctly proxied to the unsecure pvServer).
  testEnvironmentOptions: {
    ...(baseConfig.testEnvironmentOptions ?? {}),
    'jest-playwright': {
      ...(baseConfig.testEnvironmentOptions?.['jest-playwright'] ?? {}),
      contextOptions: {
        ...(baseConfig.testEnvironmentOptions?.['jest-playwright']?.contextOptions ?? {}),
        ignoreHTTPSErrors: true,
      },
    },
  },
};
