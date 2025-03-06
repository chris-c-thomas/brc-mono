# BRC Mono

***This is an ongoing work in progress***

## Projects

- [BV-BRC](https://www.bv-brc.org) - Bacterial and Viral Bioinformatics Resource Center
- [MAAGE](https://www.maage-brc.org) - Midwest Alliance for Applied Genomic Epidemiology
- [DXKB](https://www.dxkb.org) - Disease X Knowledge Base
- [LDKB](https://www.ldkb.org) - Low Dose Radiation Research Knowledge Base

## Directory Structure

```
brc-mono/
├── apps/                      # Applications
│   ├── bvbrc/                 # Bacterial and Viral Bioinformatics Resource Center
│   ├── maage/                 # Midwest Alliance for Applied Genomic Epidemiology
│   ├── dxkb/                  # Disease X Knowledge Base
│   ├── ldkb/                  # Low Dose Radiation Research Knowledge Base
│   ├── brc-docs/              # Shared & individual project documentation
│   ├── brc-storybook/         # UI component library, testing environment, and documentation
│   ├── brc-playground/        # Developer playground
│   └── bvbrc-legacy/          # BV-BRC-Web legacy application
├── packages/                  # Shared packages
│   ├── ui/                    # Shared UI components
│   ├── utils/                 # Shared utility functions
│   └── ...
└── ... Configuration files
```

## Technology

***Work in progress***

- **Core**: Next.js 15.2, React 19, TypeScript 5.7+
- **Build**: Turborepo, pnpm workspaces
- **Styling**: Tailwind CSS 4
- **Quality**: ESLint, Prettier, Commitlint
- **Versioning**: Changesets

## Prerequisites

***Likely to Change***

- Node.js >= 18.18.0
- pnpm >= 8.0.0

## Getting Started

1. Clone:
   ```bash
   git clone https://github.com/chris-c-thomas/brc-mono.git
   cd brc-mono
   ```

2. Install:
   ```bash
   pnpm install
   ```

3. Build:
   ```bash
   pnpm build
   ```

## Development

### Dev Servers

For all applications:
```bash
pnpm dev
```

For a specific application:
```bash
pnpm dev --filter=bvbrc  # Start only the BVBRC application
```

### Running Linting, Tests, and Builds

```bash
# Run linting
pnpm lint
pnpm lint --filter=bvbrc  # Lint specific workspace

# Run tests
pnpm test
pnpm test --filter=@brc-mono/ui  # Test specific workspace

# Build for production
pnpm build
pnpm build --filter=bvbrc  # Build specific workspace
```

## Purpose
***Work in Progress***

1. **Code Sharing**: Common components, utilities, and configurations shared across applications
2. **Atomic Changes**: Multiple packages can be modified, tested, and released together
3. **Simplified Dependencies**: Project-wide dependency management with a single lockfile
4. **Coordinated Versioning**: Synchronized versioning across packages using changesets
5. **Build Optimization**: Intelligent caching and parallel execution for faster builds

## Contributing

***TODO: CONTRIBUTING.md***
<!-- This project follows conventional commits standards and uses changesets for version management. See the [Contributing Guidelines](./docs/CONTRIBUTING.md) for more details. -->

## Security

***TODO: SECURITY.md***
<!-- Security vulnerabilities should be reported to [admin@maage-brc.org](mailto:admin@maage-brc.org). For more information, see our [Security Policy](./docs/SECURITY.md). -->

## Code of Conduct

***TODO: CODE_OF_CONDUCT.md***
<!-- We are committed to providing a welcoming and inclusive environment. Please read our [Code of Conduct](./docs/CODE_OF_CONDUCT.md) for details. -->

## Privacy

***TODO: PRIVACY.md***
<!-- For information about how we collect and use data, see our [Privacy Policy](./docs/privacy.md). -->

## License

This project is licensed under the MIT [License](LICENSE.txt)