# Atlas Integration Testing

https://playwright.dev/docs/intro

Inside that directory, you can run several commands:

npx playwright test
Runs the end-to-end tests.

npx playwright test --project=chromium
Runs the tests only on Desktop Chrome.

npx playwright test tests\example.spec.ts
Runs the tests of a specific file.

npx playwright test --debug
Runs the tests in debug mode.

We suggest that you begin by typing:

npx playwright test

And check out the following files:

- .\tests\example.spec.ts - Example end-to-end test
- .\playwright.config.ts - Playwright Test configuration
