# BRC Mono

A monorepo for the projects built on Argonne National Laboratory's BRC platform.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)
[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-2.1-4baaaa.svg)](code_of_conduct.md)
[![Node](https://img.shields.io/badge/node-%3E%3D18.18.0-blue.svg)](https://nodejs.org/)
[![pnpm](https://img.shields.io/badge/pnpm-%3E%3D8.0.0-blue.svg)](https://pnpm.io/)

## Project Overview

This monorepo consolidates the Bacterial and Viral Bioinformatics Resource Center, the Midwest Alliance for Applied Genomic Epidemiology, the Disease X Knowledge Base and the Low Dose Radiation Research Knowledge Base projects under a single monolithic repository.

It provides a consistent development experience with shared components and standardized tooling.

## Project Structure

```
brc-mono/
├── apps/                      # Applications
│   ├── bvbrc/                 # Bacterial and Viral Bioinformatics Resource Center
│   ├── maage/                 # Midwest Alliance for Applied Genomic Epidemiology
│   ├── dxkb/                  # Disease X Knowledge Base
│   ├── ldkb/                  # Low Dose Radiation Research Knowledge Base
│   ├── brc-docs/              # Shared & Individual project documentation
│   ├── brc-storybook/         # UI development, testing and documentation
│   ├── brc-playground/        # Developer Playground
│   ├── bvbrc-legacy/          # Legacy BV-BRC-Web application
│   └── ...
├── packages/                  # Shared packages
│   ├── ui/                    # Shared UI components
│   ├── utils/                 # Shared utility functions
│   └── ...
├── docs/                      # GitHub Pages documentation Site
├── package.json               # Root workspace package.json
├── pnpm-workspace.yaml        # pnpm workspace config
├── turbo.json                 # Turborepo config
├── ...
├── ...
├── ...
```

## Quick Start

### Prerequisites

- Node.js >= 18.18.0
- pnpm >= 8.0.0

### Setup & Development

```bash
# Clone the repository
git clone https://github.com/chris-c-thomas/brc-mono.git
cd brc-mono

# Install dependencies
pnpm install

# Start all applications in development mode
pnpm dev

# Or start a specific application
pnpm dev --filter=bvbrc
```

## Key Commands

| Command      | Description                            |
| ------------ | -------------------------------------- |
| `pnpm dev`   | Start development servers              |
| `pnpm build` | Build all applications                 |
| `pnpm lint`  | Run linting on all code                |
| `pnpm test`  | Run all tests                          |
| `pnpm clean` | Clean build artifacts and node_modules |

Add `--filter=<app-name>` to run commands for specific applications (e.g., `pnpm build --filter=bvbrc`).

## Technology Stack

- **Core**: Next.js 15.2, React 19, TypeScript 5.7+
- **Build**: Turborepo, pnpm workspaces
- **Styling**: Tailwind CSS 4
- **Quality**: ESLint, Prettier, Commitlint
- **Version Control**: Changesets

## Documentation & Wiki

### Docs

**WIP**

- [BRC Mono Workspace Guide](./docs/monorepo-workspace-guide.md)
- [BRC Mono Contributing Guide](./docs/contributing.md)
-
-
-
-
-

[GitHub Pages Site](https://chris-c-thomas.github.io/brc-mono)

[GitHub Repo /docs](https://github.com/chris-c-thomas/brc-mono/blob/main/docs/)

### Wiki

View the [BRC Mono Wiki](https://github.com/chris-c-thomas/brc-mono/wiki)

Clone the BRC Mono Wiki:

```
gh repo clone chris-c-thomas/brc-mono.wiki
```

```
git clone https://github.com/chris-c-thomas/brc-mono.wiki.git
```

## License

This project is licensed under the MIT License

Read the [LICENSE](LICENSE.txt)
