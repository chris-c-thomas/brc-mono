# BRC Mono

A comprehensive monorepo for ANL (Argonne National Laboratory) BRC Projects, containing multiple Next.js applications with shared packages.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)
[![pnpm](https://img.shields.io/badge/pnpm-8.14.0-blue.svg)](https://pnpm.io/)
[![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg)](https://nodejs.org/)

## Project Overview

This monorepo consolidates all BRC (Bioinformatics Resource Centers) projects under a single repository, providing a consistent development experience, shared components, and standardized tooling.

### Main Apps

- **BVBRC** (`apps/bvbrc`)
- **MAAGE** (`apps/maage`)
- **DXKB** (`apps/dxkb`)
- **LDKB** (`apps/ldkb`)

### Legacy App

- **BV-BRC Legacy** (`apps/bvbrc-legacy`)

### Other Apps

- **Docs** (`apps/docs`)
- **Storybook** (`apps/storybook`)
- **Playground** (`apps/playground`)

[View the full project structure](#project-structure)

## Quick Start

### Prerequisites

- Node.js >= 18.0.0
- pnpm >= 8.0.0

### Setup & Development

```bash
# Clone the repository
gh repo clone chris-c-thomas/brc-mono
cd brc-mono

# Install dependencies
pnpm install

# Start all applications in development mode
pnpm dev

# Or start a specific application
pnpm dev --filter=bvbrc

pnpm dev --filter=maage

... etc
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

## Project Structure

```
brc-mono/
├── apps/                      # Applications
│   ├── bvbrc/                 # BV-BRC
│   ├── maage/                 # MAAGE
│   ├── dxkb/                  # DXKB
│   ├── ldkb/                  # LDKB
│   ├── bvbrc-legacy/          # Legacy
│   ├── docs/                  # Docs (for the apps)
│   ├── storybook/             # Component Stories
│   └── playground/            # Dev Playground

├── packages/                  # Shared packages
│   ├── ui/                    #
│   └── utils/                 #
├── docs/                      # Docs (for the monorepo)
├── package.json               # Root package.json
├── pnpm-workspace.yaml        # PNPM
├── turbo.json                 # Turborepo configuration
└── README.md                  # This file
```

## Technology Stack

- **Core**: Next.js 15.2, React 19, TypeScript 5.7+
- **Build**: Turborepo, pnpm workspaces
- **Styling**: Tailwind CSS 4
- **Quality**: ESLint, Prettier, Commitlint
- **Version Control**: Changesets

## Documentation

- [Contributing Guidelines](./docs/CONTRIBUTING.md)
- [License Information](./docs/LICENSE.md)
- [Privacy Policy](./docs/PRIVACY.md)
- [Workspace Management](./docs/WORKSPACE.md)
- [Version Management](./docs/VERSIONING.md)

## License

This project is licensed under the MIT License - see the [LICENSE.md](./docs/LICENSE.md) file for details.

## Contact

- **Chris Thomas** - [ccthomas@anl.gov](mailto:ccthomas@anl.gov)
