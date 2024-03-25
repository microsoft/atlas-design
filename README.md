![Atlas Logo](./atlas-light.svg)

# Atlas Design System

Welcome to the Atlas Design project! This repository holds the source code backing the Atlas Design System.

## Our mission

The Atlas Design System strives to empower designers, PMs, and developers to build accessible, high quality, and consistent experiences at scale across the Microsoft Skilling web properties. Atlas powers [Microsoft Learn](https://learn.microsoft.com) 🤓!

Looking for information about the Atlas CSS framework? Start in `/css`!

## What we do

- We care deeply about accessibility. Microsoft Learn is one of the very few large Grade B websites.
- We are a low-level design system that focuses on CSS and only uses zero-dependency JS when required for good interactions or accessibility.
- We are compatible with right-to-left reading direction thanks to our use of logical properties.
- We are themeable, with three themes right out of the box (Light, Dark, and High Contrast), and we support an unlimited number of themes.
- We provide example markup. Our website is spartan compared to many design system websites. Its main purpose is for atomic/component documentation and to provide accessible code snippets.
- We have atomics for flexibility and components for consistency.
- We have a VSCode extension that provides helpful IntelliSense and class completion in the IDE.
- We publish to NPM.

## Version and status

| Name                     | Status                                                                                                                                                                   |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **@microsoft/atlas-css** | [![@microsoft/atlas-css npm version](https://badge.fury.io/js/%40microsoft%2Fatlas-css.svg)](https://badge.fury.io/js/%40microsoft%2Fatlas-css)                          |
| **@microsoft/atlas-js**  | [![@microsoft/atlas-js npm version](https://badge.fury.io/js/%40microsoft%2Fatlas-js.svg)](https://badge.fury.io/js/%40microsoft%2Fatlas-js)                             |
| **Release Pipeline**     | [![Release](https://github.com/microsoft/atlas-design/actions/workflows/release.yml/badge.svg)](https://github.com/microsoft/atlas-design/actions/workflows/release.yml) |
| **PR Builds**            | [![CI](https://github.com/microsoft/atlas-design/actions/workflows/main.yml/badge.svg?event=push)](https://github.com/microsoft/atlas-design/actions/workflows/main.yml) |

## Development

- Ensure [git](https://git-scm.com/) is installed.
- Ensure that have downloaded and installed a version of [NodeJS](https://nodejs.org/en/download/releases/) that supports monorepos. It's currently recommended you download NodeJS version 18.12.1 and use with NPM at a greater version than 8.19.2.
- Alternatively, you can install NPM with NVM: [mac](https://github.com/nvm-sh/nvm) | [windows](https://github.com/coreybutler/nvm-windows).
- If contributing code, please read about using [changesets](https://github.com/atlassian/changesets) and [semantic versioning bump types](https://semver.org/).
- Clone the repostory.
- From the root directory, run `npm install`.

## Using Atlas CSS

The styles backing the Atlas Design system are discussed in greater detail in `/css`.

### Install Atlas CSS in your project

Use NPM to add `@microsoft/atlas-css` to your project.

```sh
# install with NPM
npm install --save @microsoft/atlas-css
```

You may access any file within the `/css` folder using the following UNPKG url. Just add the path to the file, relative to the `@` sign or version the end.

```sh
https://unpkg.com/browse/@microsoft/atlas-css/ # Will redirect to latest version
https://unpkg.com/browse/@microsoft/atlas-css@<version>/ # Use this pattern on your page
```

### Install Atlas JS in your project

Behaviors and elements beyond the scope of CSS are found in the `/js` folder.

```sh
# install with NPM
npm install --save @microsoft/atlas-js
```

## Contributing

While this project is open source, its primary purpose is to serve Microsoft web properties through a CSS-first implementation of a design system. We do appreciate contributions to our documentation (`/site` folder), our framework (`/css`), and its companion scripts (`/js`).

This project welcomes contributions and suggestions. Most contributions require you to agree to a
Contributor License Agreement (CLA) declaring that you have the right to, and actually do, grant us
the rights to use your contribution. For details, visit https://cla.opensource.microsoft.com.

When you submit a pull request, a CLA bot will automatically determine whether you need to provide
a CLA and decorate the PR appropriately (e.g., status check, comment). Simply follow the instructions
provided by the bot. You will only need to do this once across all repos using our CLA.

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/).
For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or
contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.

## Trademarks

This project may contain trademarks or logos for projects, products, or services. Authorized use of Microsoft
trademarks or logos is subject to and must follow
[Microsoft's Trademark & Brand Guidelines](https://www.microsoft.com/en-us/legal/intellectualproperty/trademarks/usage/general).
Use of Microsoft trademarks or logos in modified versions of this project must not cause confusion or imply Microsoft sponsorship.
Any use of third-party trademarks or logos are subject to those third-party's policies.

## Updating dependencies

The following commands can be used to update broadly update dependencies. (Note: we omit major updates to husky because of major api changes and a general preference for version 4.x)

```sh
npm exec --package npm-check-updates --workspaces --include-workspace-root -- npm-check-updates --upgrade --reject husky
npm exec --package npm-check-updates --workspaces --include-workspace-root -- npm-check-updates --upgrade --target minor
rm package-lock.json
npm i
```
