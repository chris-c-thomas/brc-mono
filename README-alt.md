# BRC Mono

A comprehensive monorepo for ANL (Argonne National Laboratory) BRC Projects, containing multiple Next.js applications with shared packages.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)
[![pnpm](https://img.shields.io/badge/pnpm-8.14.0-blue.svg)](https://pnpm.io/)
[![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg)](https://nodejs.org/)
[![Contributor Covenant](https://img.shields.io/badge/Contributor)

## Project Overview

This monorepo consolidates all BRC (Bioinformatics Resource Centers) projects under a single repository, providing a consistent development experience, shared components, and standardized tooling.

### Main Applications

- **BVBRC** (`apps/bvbrc`): BV-BRC (Bacterial and Viral Bioinformatics Resource Center) Application
- **MAAGE** (`apps/maage`): MAAGE Application
- **DXKB** (`apps/dxkb`): DXKB Application
- **LDKB** (`apps/ldkb`): LDKB Application

[View the full project structure](#project-structure)

## Quick Start

### Prerequisites

- Node.js >= 18.0.0
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

## Project Structure

```
brc-mono/
├── apps/                      # Application packages
│   ├── bvbrc/                 # BV-BRC Application
│   ├── maage/                 # MAAGE Application
│   ├── dxkb/                  # DXKB Application
│   ├── ldkb/                  # LDKB Application
│   ├── brc-docs/              # Documentation site
│   ├── brc-storybook/         # Component library showcase
│   ├── brc-playground/        # Development playground
│   └── bvbrc-legacy/          # Legacy Express.js application
├── packages/                  # Shared packages
│   ├── ui/                    # Shared UI components
│   └── utils/                 # Shared utility functions
├── docs/                      # Additional documentation
├── package.json               # Root package configuration
├── pnpm-workspace.yaml        # pnpm workspace configuration
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
