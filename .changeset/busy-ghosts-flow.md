---
"bvbrc-legacy": minor
"playground": minor
"storybook": minor
"@brc-mono/utils": minor
"@brc-mono/ui": minor
"bvbrc": minor
"maage": minor
"docs": minor
"dxkb": minor
"ldkb": minor
---

This release represents the initial stable version of the BRC Mono project.

This release includes changes across 184 files with 12158 additions and 24 deletions. The changes span multiple areas of the codebase and represent the complete implementation of the base app instances.

- **packages**: add generic shared packages as examples

- update husky pre-commit script as per deprecation warnings
- update husky configuration as per deprecation warnings
- apply changes in bvbrc-legacy and tsup configurations
- **bug**: errors in files due to recent changes in new versions of multiple libraries and packages

- update workspace related docs
- add READMEs and additional repo related documents
- add new repo README.md

- update package.json to reflect file name change
- add .npmrc for project scoped package manager configurations
- modify wording
- add changeset; create script to summarize changes ad-hoc
- update typescript; install @changesets/cli; add eslint.config.js
- **deps**: update ejs; add pnpm-lock.yaml
- **deps**: added a word
- **deps**: update ports for the next.js apps

- improve summary script output

- **pnpm**: add pnpm-lock.yaml

- create(apps): add bvbrc-legacy application
- create(apps): add storybook application
- create(apps): add storybook application
- create(apps): add docs application
- create(apps): add ldkb application
- create(apps): add dxkb application
- create(apps): add maage application
- scaffold(apps): bvbrc

- **Branch:** This release merges `dev` into `main`
- **Commit Count:** 26 commits included
- **File Changes:** 184 files changed, 12158 insertions(+), 24 deletions(-)

- **Chris Thomas** (26 commits)

This changeset represents the collaborative work of multiple contributors. GitHub usernames may differ from the author information above. To see the complete list of contributors with GitHub usernames, please check the PR history and commit details.

When reviewing this release, please consider:

- Overall architecture and code organization
- Completeness of the feature set
- Documentation quality
- Test coverage
- Performance considerations
