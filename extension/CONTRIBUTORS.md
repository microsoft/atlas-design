# Contributing the Atlas VSCode extension

Current functionality of the extension is to provide autocompletable snippets for Atlas class names.

## Running the Extension Locally

1. **Clone this `atlas-design` repository locally.**
1. In the root of the `atlas-design` repository, **run `npm install` to install your dependencies.**
1. In the root of the `atlas-design` repository, **run `npm run prepare:extension`.** This will build the CSS workspace and the workspace for Atlas's documentation site, which both emit build artifacts that this extension depends on to run.
   - Alternatively, to run the sub-scripts:
     - You can run `npm run build:class-names` while editing `/css/class-names/index.js` to modify the CSS-related data structure generated for the extension to use.
     - You can run `npm run toc` while editing `/site/toc.js` to modify the data structure used to append documentation links.
1. **Open the `atlas-design` repository's `extension` directory in VS Code.**
1. **Press `F5` to run the extension in a debug mode.**
   - If you've not run the extension before, you might get a list of options for how to debug it. **Choose the option to run the extension in an Extension Host.** This will open a new instance of VS Code that's running your extension locally.
1. **In the Extension Host, open up another codebase to serve as your testing grounds.**

[Further information on running and initializing a new extension can be found at the VSCode website.](https://code.visualstudio.com/api/get-started/your-first-extension)

## Extension Modification How-Tos

### Referencing specific documentation pages in tooltips

By default, classnames' IntelliSense tooltips provide a generic link to the Atlas Design System's documentation site. However, you can set up specific classnames or classname prefixes to instead point to more specific documentation pages. Somewhat unintuitively, however, this needs to be done from within the Atlas docs site's workspace.

To ensure that the tooltips or a classname or all classnames starting with a given prefix point to a specific page on the Atlas docs site:

1. Open the `site` directory in this `atlas-design` repository.
1. Open the Markdown file for the page you'd like the tooltip to link to.
1. In the Markdown document's frontmatter, go to the `classPrefixes` property, or add one if it doesn't exist.
1. Using YAML's list syntax, add an item for each classname or class prefix you'd like to link to this page.

For instance, in the Background atomic page, we use:

```yml
classPrefixes:
  - background-image-pattern
  - background-size
```

...to match all classes that start with `background-image-pattern` or `background-size` (including exact matches).

Atlas provides classes and docs for atomics, components, and patterns. You may want to provide that extra categorization in the tooltip link. To add that context, add another frontmatter property called `classType` to the Atlas docs page, and set it to `Atomics`, `Component`, or `Pattern`.

```yml
classType: Component
classPrefixes:
  - background-image-pattern
  - background-size
```

When changing the frontmatter (or its aggregation in `/site/toc.js`), to see your changes reflected in the locally-running extension, you can run `npm run toc` to rebuild necessary TOC artifacts.

### Color and size details

Atlas's color and size utility classes provide specific values that might not be clear from the classname alone, so we've added extra documentation for them in the IntelliSense tooltip.

This extra information is first parsed by the CSS workspace in `css/class-names/index.js`, and then emitted to `css/dist/class-names.json`. If you don't see that JSON file, rebuild the CSS project with `npm run prepare:extension`. That JSON file is consumed by the extension in `extension/src/completion-item-provider.ts`.

When changing classes provided by Atlas, to see the updates in the locally-running extension, you can run `npm run build:class-names` to rebuild necessary class data artifacts.

## Publishing the Extension

- `npm run publish:extension` will publish a new version of the extension. Assuming you're authenticated to the publisher.
- `publish:extension:dryrun` will provide show what files would be published.
- [Managing our extension](https://marketplace.visualstudio.com/manage/publishers/docsmsft) (requires authentication)
- [Full documentation on publishing extensions](https://code.visualstudio.com/api/working-with-extensions/publishing-extension)
