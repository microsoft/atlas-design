# Contribution Guidelines for Engineering

This post provides some contribution guidelines for CSS/Scss in Atlas.

## When making a code change

- be careful and purposeful.
- test your code change locally using the site.
- ask yourself, does this change need to be documented?
  - if so, and the change is to our styles, please ensure that you make a documentation change in the same pull request.
  - if so, and the change is to our development environment, please make sure the appropriate readme file is updated/created.
- fill out a **changeset** using the [changeset cli](https://github.com/atlassian/changesets/blob/main/docs/intro-to-using-changesets.md).
  - if the change is to styles (`/css`) or scripts (`/js`), you must fill out a changeset.
  - `npx changeset add` will get you started.
  - if the change is to the site's infrastructure, you should fill out a changeset. _Note: we do not need semver for the site, but changesets will also provide a nicely organized changelog for improvements across the site._
  - semver primer -> major = "breaking change", minor = "new functionality," patch = "fix" to existing functionality.
- make a pull request and whenever possible...
  - include a work item number.
  - include a preview link to PR version of the site for easier functional reviewing of your code. (`preview-<pr-number>` or `<origin>/pulls/<pr-number>/path/to/page/`).
- avoid making breaking changes, unless you really, really have to.
- if you don't know what might constitute a breaking change ask a team member or start a discussion.
- checkout the readme of the folder you're working in. Each folder should have a readme detailing the purpose of the folder and guidelines for contributing.

## When writing new Scss

- ensure signoff from the design systems team has been reached before you begin work.
- not sure if signoff has been reached? Ask in a new/existing discussion!

## When updating existing Scss

- try using [`npm link`](https://docs.npmjs.com/cli/v7/commands/npm-link) to view the impact on existing systems that import Atlas.

## Changesets GitHub App

The release workflow uses the
[`atlas-design-changeset-bot`](https://github.com/apps/atlas-design-changeset-bot) GitHub App
instead of a personal access token. The App is installed only on `microsoft/atlas-design` and
has write access to repository contents and pull requests.

The repository Actions configuration contains:

- Variable `ATLAS_CHANGESETS_APP_CLIENT_ID`
- Secret `ATLAS_CHANGESETS_APP_PRIVATE_KEY`

If App authentication fails:

1. Verify the App is still installed on `microsoft/atlas-design`.
1. Verify the Actions variable and secret are configured.
1. If the private key must be rotated, an App Manager should generate a replacement key, update
   `ATLAS_CHANGESETS_APP_PRIVATE_KEY`, validate the release workflow, and then delete the old key.
