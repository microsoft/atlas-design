# Atlas Design

[![CI](https://github.com/microsoft/atlas-design/actions/workflows/main.yml/badge.svg)](https://github.com/microsoft/atlas-design/actions/workflows/main.yml)

Welcome to the Atlas Design project! This repository holds the source code backing appearance of docs.microsoft.com and Microsoft Learn.

## Development

- If contributing code, please read about using [changesets](https://github.com/atlassian/changesets) and [semantic versioning bump types](https://semver.org/).
- Clone the repostory.
- Ensure Yarn is installed (`npm i -g yarn`).
- From the root directory, run `yarn install`.

## Using Atlas CSS

The styles backing the Atlas Design system are discussed in greater detail in the [atlas-css readme](./css/README.md).

### Install Atlas CSS in your project

Use NPM or Yarn to add `@microsoft/atlas-css` to your project.

```sh
# install with NPM
npm install --save @microsoft/atlas-css
# or install with Yarn
yarn add --save @microsoft/atlas-css
```

You may access any file within the `/css` folder using the following UNPKG url. Just add the path to the file, relative to the at the end.

```sh
https://unpkg.com/browse/@microsoft/atlas-css/ # Will redirect to latest version
https://unpkg.com/browse/@microsoft/atlas-css@<version>/ # Use this pattern on your page
```

## Contributing

While this project is open source, its primary purpose is to serve Microsoft web properties through a css-only implementation of a design system. We do love contributions to both our documentation (`/site` folder) and our framework (`/css`).

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
