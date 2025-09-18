## Branch Naming Instructions for Copilot

All branches created by Copilot must use the prefix `copilot/`.
Examples:

- copilot/feature-xyz
- copilot/bugfix-123

Do not create branches without the `copilot/` prefix.

## Branch Protection Instructions for Copilot

**Copilot must never:**

- Add files to the 'main' branch
- Commit changes to the 'main' branch
- Push to the 'main' branch

All code changes, additions, and commits must be made on a non-main branch. Before creating a pull request, always confirm you are on a branch that is not 'main'.
