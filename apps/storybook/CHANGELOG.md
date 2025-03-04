# brc-storybook

## 0.3.0

### Minor Changes

- 391ffc8: Initial release of BRC Mono v0.1.0.

  Applications:

  - BVBRC: Bacterial and Viral Bioinformatics Resource Center
  - MAAGE: Midwest Alliance for Applied Genomic Epidemiology
  - DXKB: Disease X Knowledge Base
  - LDKB: Low Dose Radiation Research Knowledge Base
  - BVBRC-LEGACY: the BV-BRC-Web "Legacy" application

  This release establishes the foundation for a unified design system and shared code architecture across all applications sharing the platform.

  This release includes changes across 196 files with 12877 additions and 24 deletions. The changes span multiple areas of the codebase and represent the complete implementation of the base app instances.

  - **packages**: add generic shared packages as examples
  - update husky pre-commit script as per deprecation warnings
  - update husky configuration as per deprecation warnings
  - apply changes in bvbrc-legacy and tsup configurations
  - **bug**: errors in files due to recent changes in new versions of multiple libraries and packages
  - add .github/workflows/ directory for CI/CD templates
  - add CI/CD workflow templates for future implementation
  - update workspace related docs
  - add READMEs and additional repo related documents
  - add new repo README.md
  - version packages for release v0.1.0
  - add changeset for initial v0.1.0
  - add changeset for initial v0.1.0
  - update app names to prevent namespace conflicts
  - add changeset for initial v0.1.0
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
  - **Commit Count:** 33 commits included
  - **File Changes:** 196 files changed, 12877 insertions(+), 24 deletions(-)
  - **Chris Thomas** / @chris-c-thomas - (33 commits)

  This changeset represents the collaborative work of multiple contributors. GitHub usernames may differ from the author information above. To see the complete list of contributors with GitHub usernames, please check the PR history and commit details.

  When reviewing this release, please consider:

  - Overall architecture and code organization
  - Completeness of the feature set
  - Documentation quality
  - Test coverage
  - Performance considerations

## 0.2.0

### Minor Changes

---

"brc-mono": minor
"bvbrc": minor
"bvbrc-legacy": minor
"dxkb": minor
"ldkb": minor
"maage": minor
"@brc-mono/ui": minor
"@brc-mono/utils": minor

---

This release represents the initial stable version of the BRC Mono project.

This release includes changes across 187 files with 12346 additions and 24 deletions. The changes span multiple areas of the codebase and represent the complete implementation of the base app instances.

- **packages**: add generic shared packages as examples

- update husky pre-commit script as per deprecation warnings
- update husky configuration as per deprecation warnings
- apply changes in bvbrc-legacy and tsup configurations
- **bug**: errors in files due to recent changes in new versions of multiple libraries and packages

- update workspace related docs
- add READMEs and additional repo related documents
- add new repo README.md

- update app names to prevent namespace conflicts
- add changeset for initial v0.1.0
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
- **Commit Count:** 28 commits included
- **File Changes:** 187 files changed, 12346 insertions(+), 24 deletions(-)

- **Chris Thomas** (28 commits)

This changeset represents the collaborative work of multiple contributors. GitHub usernames may differ from the author information above. To see the complete list of contributors with GitHub usernames, please check the PR history and commit details.

When reviewing this release, please consider:

- Overall architecture and code organization
- Completeness of the feature set
- Documentation quality
- Test coverage
- Performance considerations
