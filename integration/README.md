# Atlas Integration Testing

This folder provides the basis for all integration testing against Atlas. Atlas is primarily a CSS framework, and we are not seeking to test CSS itself. We use two methods of integration testing here.

1. PR visual comparisons against the built documentation site. [See workflow](../.github/workflows/visual-diff.yml) and [entry point](./tasks/visual-diff.mjs).
2. Assertion style testing of interactions (integration-tests) for elements and behaviors in the `atlas-js` package. [See config](./visual-diff.config.ts) and [example](./integration-tests/popover.spec.ts).

## Installation

You must [install Playwright and its dependencies on your machine](https://playwright.dev/docs/intro#manually) before using any commands.

```sh
npx playwright install
```

## Using Playwright

Both of the above use [`@playwright/test`](https://playwright.dev/). Their documentaton should be the primary source of information on how to write tests here. Because of our monorepo setup, we've taken the approach of referencing playwright commands via npm. The primary commands available at the root of the project are:

| Command                     | Referent                                                                                   | Description                                                                                                 |
| --------------------------- | ------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------- |
| `npm run integration`       | `playwright test --config=integration-tests.config.ts`                                     | Runs all tests in the `/integration-tests` folder.                                                          |
| `npm run integration:debug` | `playwright test --debug --config=integration-tests.config.ts`                             | The same as above but in Playwright debug mode.                                                             |
| `npm run codegen`           | `playwright codegen localhost:1111`                                                        | Runs Playwright codegen for integration-tests. Must have local server running on port 1111 before starting. |
| `screenshots:light`         | `playwright test --config=visual-diff.config.ts`                                           | Take screenshots of images on light theme. Primarily for use on Github Actions.                             |
| `screenshots:all`           | `cross-env THEMES=light,dark,high-contrast playwright test --config=visual-diff.config.ts` | Take screenshots of images on light, dark, and high-contrast themes.                                        |

## PR visual reports

The **Visual diff** workflow builds the exact PR base and proposed merge, then compares
them using the same Chromium instance and installed fonts on one Ubuntu runner. There
are no committed baseline images and no comparisons against the moving live site.

The capture list is discovered from both builds: the homepage and all HTML pages under
`components`, `atomics`, and `patterns`. Every page is captured in light, dark, and
high-contrast themes at 390px and 1280px widths. Captures include the full page, not just
the initial viewport. New and removed pages are reported explicitly.

Each capture starts in a fresh browser context with fixed locale, timezone, color
scheme, and reduced motion. External requests are blocked, native media controls are
hidden, CSS animations are disabled, range controls are reset to their declared defaults
after initial layout, and captures must stabilize before comparison.
External embeds, remote images, and native media controls are therefore not visual
coverage. Navigation, script, stylesheet, and stabilization failures fail the job;
actual visual differences are advisory.

The report shows **before**, **after**, and **difference** images for changed captures.
Images open at full resolution. Unchanged captures are counted but their images are
not retained.

### Browsable reports

The **Publish documentation and visual reports** workflow is the sole Pages deployer.
It assembles the latest successful default-branch documentation artifact and the latest
report for each open PR's current head into a single deployment:

- Documentation: <https://microsoft.github.io/atlas-design/>
- Report index: <https://microsoft.github.io/atlas-design/visual-diff/>
- Per-PR report: `https://microsoft.github.io/atlas-design/visual-diff/pr-<number>/`

After deployment, the publisher creates or updates one bot comment containing the
report link and capture counts. It never changes the PR description. Pending, failed,
and expired reports are labeled in the index rather than linking an older PR head as
current. The report records the base and proposed merge SHAs used for that run; update
the PR branch to compare against a newer base.

All deployments share one concurrency group and reconstruct the complete site, so a
PR report cannot replace the documentation or another report. Closing a PR triggers a
new deployment without its report. Documentation artifacts are retained for 90 days;
PR artifacts for 30 days. Rerun an expired build to restore its report. No deployment
branch or long-lived publishing secret is required.

The publisher always checks out the default branch and never executes PR code. PR
artifacts are treated as untrusted data: manifests and image paths are validated, only
referenced PNGs are copied, and HTML is regenerated by the trusted publisher with
escaped labels and a restrictive content security policy.

**First deployment:** these workflow changes must land on the default branch before
automatic publishing can run. Its successful documentation build supplies the first
`atlas-site` artifact. Existing open PRs need a new Visual diff run to supply report
data. The existing `github-pages` environment must continue allowing deployments from
`main`. You can rerun the publisher with `workflow_dispatch`.

### Local comparison and tooling tests

Build both revisions in separate directories with `npm ci`, `npm run build:css`, and
`npm run build:site`, then run from the repository root:

```powershell
npx playwright install chromium
node integration\tasks\visual-diff.mjs C:\path\to\base\site\dist C:\path\to\merge\site\dist C:\path\to\report
npm run test:visual-diff -w @microsoft/atlas-integration
```

Serve the report directory with a local static HTTP server to inspect `index.html`.
The tests cover real Chromium comparisons (including below-fold changes), added and
removed pages, report validation, and combined-site assembly.

The older `screenshots:*` and `visual-diff:local` commands remain available for manual
use; the PR workflow does not use their branch-switching or baseline-download logic.

## Accessibility testing with Axe and Playwright

Although we must rely primarily on careful functional testing and code review to ensure a high standard of accessibility, we've also adopted automated accessibility with [Playwright and AXE](https://playwright.dev/docs/accessibility-testing) testing in pipelines to ensure we don't forget to write accessible components and documentation examples.

Some major things to remember are:

- We keep our list of pages on which we run accessibility checks in [accessibility.spec.ts](https://github.com/microsoft/atlas-design/tree/main/integration/tests/accessibility.spec.ts). If you've added a new documentation page, please ensure it is added to the list
- If you've written anything that injects new elements into the DOM, you should write a separate test case for that case and pass in the specific element with the `include` method (documented in Playwright and AXE link above).
- In your test descriptor, add the `@accessibility` tag.
