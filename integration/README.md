# Atlas Integration Testing

This folder provides the basis for all integration testing against Atlas. Atlas is primarily a CSS framework, and we are not seeking to test CSS itself. We use two methods of integration testing here.

1. Visual regression testing (visual diff) against our site's component pages - a work in progress. [See config](./visual-diff.config.ts) and [entry point](./visual-diff/visual-diff.spec.ts).
2. Assertion style testing of interactions (flows) for elements and behaviors in the `atlas-js` package. [See config](./visual-diff.config.ts) and [example](./flows/popover.spec.ts).

## Installation

You must [install Playwright and its dependencies on your machine](https://playwright.dev/docs/intro#manually) before using any commands.

```sh
npx playwright install
```

## Using Playwright

Both of the above use [`@playwright/test`](https://playwright.dev/). Their documentaton for should be the primary source of information on how to write tests here. Because of our monorepo setup, we've taken the approach of referencing playwright commands via npm. The primary commands available at the root of the project are:

| Command               | Referant                                                                  | Description                                                                                               |
| --------------------- | ------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| `npm run flows`       | `playwright test --config=flows.config.ts`                                | Runs all tests in the `/flows` folder.                                                                    |
| `npm run flows:debug` | `playwright test --debug --config=flows.config.ts`                        | The same as above but in Playwright debug mode.                                                           |
| `npm run codegen`     | `playwright codegen localhost:1111`                                       | Runs Playwright codegen for flows. Must have local server running on port 1111 before starting.           |
| `screenshots:light`   | `playwright test --config=visual-diff.config.ts`                          | Take screenshots of images on light theme. Primarily for use on Github Actions.                           |
| `screenshots:all`     | `cross-env FULL_DIFF=true playwright test --config=visual-diff.config.ts` | Take screenshots of images on light, dark, and high-contrast themes. Primarily for use on Github Actions. |
