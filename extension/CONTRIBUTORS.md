# Contributing the Atlas VSCode extension

Current functionality of the extension is to provide autocompletable snippets for Atlas class names.

## Development essentials

1. Before developing locally, ensure that the **published version of the extension is disabled**.
1. Before developing locally or beginning the following step, run `npm run prepare:extension` from the root repository. This command ensure several required files are generated.
1. Press F-5 or Select "Run extension" from the VSCode debug menu. [Further information on running and initializing a new extension can be found at the VSCode website](https://code.visualstudio.com/api/get-started/your-first-extension).

## Publishing

- `npm run publish:extension` will publish a new version of the extension. Assuming you're authenticated to the publisher.
- `publish:extension:dryrun` will provide show what files would be published.
- [Managing our extension](https://marketplace.visualstudio.com/manage/publishers/docsmsft) (requires authentication)
- [Full documentation on publishing extensions](https://code.visualstudio.com/api/working-with-extensions/publishing-extension)
