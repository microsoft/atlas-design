# Contribution Guidelines for Engineering

This post provides some contribution guidelines for CSS/Scss in Atlas.

## When making a code change

- be careful and purposeful.
- test your code change locally using the site.
- ask yourself, does this change need to be documented?
  - if so, and the change is to our styles, please ensure that you make a documentation change in the same pull request.
  - if so, and the change is to our development environment, please make sure the appropriate readme file is updated/created.
- fill out a **changeset** using the [changeset cli](https://github.com/atlassian/changesets/blob/main/docs/intro-to-using-changesets.md).
  - if the change is to styles, you must fill out a changeset.
  - if the change is to the site's infrastructure, you should fill out a changeset. _Note: we do not need semver for the site, but changesets will also provide a nicely organized changelog for improvements across the site._
- make a pull request and whenever possible...
  - include a work item number.
  - include a preview link to PR version of the site for easier functional reviewing of your code. (`preview-<pr-number>` or `<origin>/pulls/<pr-number>/path/to/page/`).
- avoid making breaking changes, unless you really, really have to.
- if you don't know what might constitute a breaking change ask a team member or start a discussion.
- checkout the readme of the folder you're working in. Each folder should have a readme detailing the purpose of the folder and guidelines for contributing.

## When writing new Scss

- ensure signoff from the design systems team has been reached before you begin work.

## When updating existing Scss

- try using [`npm link`](https://docs.npmjs.com/cli/v7/commands/npm-link) to view the impact on existing that import Atlas systems.
