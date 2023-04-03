# Atlas Integration Testing

This folder provides the basis for all integration testing against Atlas. Atlas is primarily a CSS framework, and we are not seeking to test CSS itself. We use two methods of integration testing here.

1. Visual regression testing (visual diff) against our site's component pages - a work in progress. [See config](./visual-diff.config.ts) and [entry point](./visual-diff/visual-diff.spec.ts).
2. Assertion style testing of interactions (integration-tests) for elements and behaviors in the `atlas-js` package. [See config](./visual-diff.config.ts) and [example](./integration-tests/popover.spec.ts).

## Installation

You must [install Playwright and its dependencies on your machine](https://playwright.dev/docs/intro#manually) before using any commands.

```sh
npx playwright install
```

## Using Playwright

Both of the above use [`@playwright/test`](https://playwright.dev/). Their documentaton should be the primary source of information on how to write tests here. Because of our monorepo setup, we've taken the approach of referencing playwright commands via npm. The primary commands available at the root of the project are:

| Command                     | Referent                                                                  | Description                                                                                                 |
| --------------------------- | ------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| `npm run integration`       | `playwright test --config=integration-tests.config.ts`                    | Runs all tests in the `/integration-tests` folder.                                                          |
| `npm run integration:debug` | `playwright test --debug --config=integration-tests.config.ts`            | The same as above but in Playwright debug mode.                                                             |
| `npm run codegen`           | `playwright codegen localhost:1111`                                       | Runs Playwright codegen for integration-tests. Must have local server running on port 1111 before starting. |
| `screenshots:light`         | `playwright test --config=visual-diff.config.ts`                          | Take screenshots of images on light theme. Primarily for use on Github Actions.                             |
| `screenshots:all`           | `cross-env FULL_DIFF=true playwright test --config=visual-diff.config.ts` | Take screenshots of images on light, dark, and high-contrast themes. Primarily for use on Github Actions.   |

## Accessibility testing with Axe and Playwright

Although we must rely primarily on careful functional testing and code review to ensure a high standard of accessibilty, we've also adopted automated accessibilty with [Playwright and AXE](https://playwright.dev/docs/accessibility-testing) testing in pipelines to ensure we don't forget to write accessible components and documentation examples.

Some major things to remember are:

- We keep our list of pages on which we run accessibility checks in [accessibility.spec.ts](https://github.com/microsoft/atlas-design/tree/main/integration/tests/accessibility.spec.ts). If you've added a new documentation page, please to ensure it is added to the list
- If you've written anything that injects new elements into the DOM, you should write a separate test case for that case and pass in the specific element with the `include` method (documented in Playwright and AXE link above).
- In your test descriptor, add the `@accessibility` tag.
