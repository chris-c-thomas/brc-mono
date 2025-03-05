# Managing the BRC Mono Workspace

This document provides comprehensive technical guidance for managing the BRC Mono workspace. It details instructions for package management, dependency resolution, workspace operations, and other related tasks.

## Table of Contents

- [Introduction](#introduction)
- [Workspace Architecture](#workspace-architecture)
- [PNPM Workspace Configuration](#pnpm-workspace-configuration)
- [Environment Setup](#environment-setup)
- [Package Management](#package-management)
  - [Adding Dependencies](#adding-dependencies)
  - [Removing Dependencies](#removing-dependencies)
  - [Updating Dependencies](#updating-dependencies)
  - [Managing Peer Dependencies](#managing-peer-dependencies)
- [Working with Shared Packages](#working-with-shared-packages)
  - [Creating New Shared Packages](#creating-new-shared-packages)
  - [Publishing Shared Packages](#publishing-shared-packages)
  - [Importing Shared Packages](#importing-shared-packages)
- [Workspace Scripts](#workspace-scripts)
- [Turborepo Pipeline Configuration](#turborepo-pipeline-configuration)
- [Version Control Integration](#version-control-integration)
  - [Commit Guidelines](#commit-guidelines)
  - [Changesets](#changesets)
- [CI/CD Integration](#cicd-integration)
- [Common Issues and Troubleshooting](#common-issues-and-troubleshooting)

## Introduction

BRC Mono is a monorepo built for the group of BRC related projects at Argonne National Laboratory, and is designed to house multiple applications and shared packages within a single repository.

This structure allows code reuse, consistent versioning, and coordinated development while maintaining each application's distinct features, direction and primary objectives for their respective project teams.

## Workspace Architecture

The BRC Mono repository utilizes a monorepo architecture powered by [pnpm](https://pnpm.io) workspaces and [Turborepo](https://turbo.build) by Vercel. This structure delivers the following benefits:

1. **Shared Code**: Common components and utilities can be shared across applications, reducing duplication and ensuring consistency.
2. **Dependency Deduplication**: Dependencies are installed once and efficiently shared across packages, reducing disk space usage and installation time.
3. **Atomic Commits**: Changes across multiple packages can be committed together, maintaining version synchronicity.
4. **Coordinated Versioning**: Package versions can be managed in coordination, simplifying dependency relationships.
5. **Optimized Builds**: Turborepo enables intelligent caching and parallel execution, significantly reducing build times.

The workspace is organized into two primary directories:

- **`/apps`**: Contains standalone applications

  - `bvbrc`: Bacterial and Viral Bioinformatics Resource Center
  - `maage`: Midwest Alliance for Applied Genomic Epidemiology
  - `dxkb`: Disease X Knowledge Base
  - `ldkb`: Low Dose Radiation Research Knowledge Base
  - `brc-docs`: Documentation site for `bvbrc`, `maage`, `dxkb`, and `ldkb`
  - `brc-storybook`: Storybook Library for UI component docs and testing
  - `brc-playground`: Playground developer application
  - `bvbrc-legacy`: [BV-BRC-Web](https://github.com/BV-BRC/BV-BRC-Web)

- **`/packages`**: Contains shared libraries used by applications
  - Shared UI components
  - Utility functions
  - Type definitions
  - API clients
  - ... other reusable modules

## PNPM Workspace Configuration

The workspace configuration is defined in `pnpm-workspace.yaml`:

```yaml
packages:
  # main next.js apps
  - "apps/bvbrc"
  - "apps/maage"
  - "apps/dxkb"
  - "apps/ldkb"
  # other next.js apps
  - "apps/brc-docs"
  - "apps/brc-storybook"
  - "apps/brc-playground"
  # legacy node.js app
  - "apps/bvbrc-legacy"
  # shared packages
  - "packages/*"
```

This configuration specifies which directories are included in the PNPM workspace:

- Each application is individually listed under `apps/`
- All directories within the `packages/` folder are included via the glob pattern `packages/*`

PNPM uses this configuration to:

1. Establish symlinks between workspace packages
2. Hoist compatible dependencies to a single location
3. Maintain isolated node_modules for each package when needed
4. Enable workspace-aware commands via the PNPM CLI

## Environment Setup

Before working with the BRC Mono repository, ensure your development environment meets these requirements:

1. **Node.js**: Version 18.0.0 or newer (as specified in package.json)

   ```bash
   node --version
   ```

2. **PNPM**: Version 8.0.0 or newer (8.14.0 recommended)

   ```bash
   # Install PNPM globally
   npm install -g pnpm@8.14.0

   # Verify installation
   pnpm --version
   ```

   **NOTE:** it is highly recommend to use Volta to manage your Node.js runtimes and package managers (NPM, Yarn, pnpm, etc).

3. **Clone the repository**:

   ```bash
   git clone https://github.com/chris-c-thomas/brc-mono.git
   cd brc-mono
   ```

4. **Install dependencies**:

   ```bash
   pnpm install
   ```

   This command:

   - Reads the workspace configuration
   - Installs all dependencies for all packages
   - Establishes necessary symlinks between workspace packages
   - Sets up Git hooks via Husky

5. **Verify setup**:
   ```bash
   pnpm turbo run build
   ```
   This builds all packages and applications in the correct dependency order.

## Package Management

### Adding Dependencies

Dependencies can be added at three different levels: workspace root, specific workspace, or as a development dependency.

#### Adding to Workspace Root

Dependencies that should be available to all workspaces or are used by workspace-level scripts should be added to the root:

```bash
# Add dependency to the root package.json
pnpm add -w <package-name>

# Add development dependency to the root package.json
pnpm add -w -D <package-name>
```

Example:

```bash
# Add TypeScript to the root as a dev dependency
pnpm add -w -D typescript

# Add a build tool like esbuild to the root
pnpm add -w esbuild
```

#### Adding to Specific Workspace

To add a dependency to a specific application or package:

```bash
# Add dependency to a specific workspace
pnpm add <package-name> --filter <workspace-name>

# Add development dependency to a specific workspace
pnpm add -D <package-name> --filter <workspace-name>
```

Examples:

```bash
# Add axios to the BVBRC application
pnpm add axios --filter bvbrc

# Add jest as a development dependency to the UI package
pnpm add -D jest --filter @brc-mono/ui

# Add multiple packages at once
pnpm add react react-dom --filter maage
```

The `--filter` flag accepts:

- Full package names from package.json (e.g., `bvbrc` or `@brc-mono/ui`)
- Directory paths relative to the root (e.g., `./apps/bvbrc`)
- Glob patterns (e.g., `./apps/*` to target all apps)

#### Adding with Specific Version

To add a dependency with a specific version:

```bash
pnpm add <package-name>@<version> --filter <workspace-name>
```

Examples:

```bash
# Add specific version of React
pnpm add react@18.2.0 --filter bvbrc

# Add a version range
pnpm add lodash@^4.17.21 --filter @brc-mono/utils
```

#### Adding Workspace Packages as Dependencies

To add one workspace package as a dependency of another:

```bash
pnpm add @brc-mono/ui --filter bvbrc
```

This creates a symlink between the packages, allowing real-time updates during development.

### Removing Dependencies

To remove dependencies from the workspace:

```bash
# Remove from workspace root
pnpm remove -w <package-name>

# Remove from specific workspace
pnpm remove <package-name> --filter <workspace-name>

# Remove multiple packages
pnpm remove <package1> <package2> --filter <workspace-name>
```

Examples:

```bash
# Remove lodash from the root
pnpm remove -w lodash

# Remove axios from the BVBRC application
pnpm remove axios --filter bvbrc
```

### Updating Dependencies

PNPM provides several commands for updating dependencies across workspaces:

#### Update All Dependencies

To update all dependencies across all workspaces to their latest versions according to their version ranges:

```bash
pnpm update -r
```

The `-r` (or `--recursive`) flag ensures the command applies to all workspaces.

#### Update in Specific Workspace

To update dependencies in a specific workspace:

```bash
pnpm update --filter <workspace-name>
```

Example:

```bash
pnpm update --filter bvbrc
```

#### Update Specific Package Everywhere

To update a specific package across all workspaces where it's used:

```bash
pnpm update -r <package-name>
```

Example:

```bash
pnpm update -r react
```

#### Update to Latest Version (Ignoring Range)

To update a package to its latest version, even if outside the specified version range:

```bash
pnpm update -r <package-name> --latest
```

Example:

```bash
pnpm update -r typescript --latest
```

### Managing Peer Dependencies

In shared packages, peer dependencies should be used for frameworks like React that should not be bundled with the package. This prevents duplicate instances of these libraries when consuming the package.

Configure peer dependencies in the package's `package.json`:

```json
{
  "name": "@brc-mono/ui",
  "version": "0.1.0",
  "peerDependencies": {
    "react": "^18.0.0",
    "react-dom": "^18.0.0"
  },
  "devDependencies": {
    "react": "^18.0.0",
    "react-dom": "^18.0.0"
  }
}
```

Key points about peer dependencies:

1. List them under `peerDependencies` with the acceptable version range
2. Also include them under `devDependencies` for development and testing
3. The consuming application must provide the peer dependencies
4. PNPM will issue warnings if peer dependency requirements are not met

## Working with Shared Packages

### Creating New Shared Packages

Follow these steps to create a new shared package:

1. Create a new directory in the `packages` folder:

```bash
mkdir -p packages/new-package/src
cd packages/new-package
```

2. Initialize the package with a properly configured `package.json`:

```bash
pnpm init
```

3. Edit the `package.json` to include necessary configuration:

```json
{
  "name": "@brc-mono/new-package",
  "version": "0.1.0",
  "main": "dist/index.js",
  "module": "dist/index.mjs",
  "types": "dist/index.d.ts",
  "sideEffects": false,
  "files": ["dist"],
  "scripts": {
    "build": "tsup src/index.ts --format cjs,esm --dts",
    "dev": "tsup src/index.ts --format cjs,esm --dts --watch",
    "lint": "eslint src --ext .ts,.tsx",
    "test": "jest",
    "clean": "rm -rf dist node_modules"
  },
  "dependencies": {
    // Runtime dependencies
  },
  "devDependencies": {
    "tsup": "^7.2.0",
    "typescript": "^5.7.3"
    // Other dev dependencies
  },
  "peerDependencies": {
    // Peer dependencies if applicable
  }
}
```

4. Create a TypeScript configuration file `tsconfig.json`:

```json
{
  "extends": "../../tsconfig.json",
  "compilerOptions": {
    "outDir": "./dist",
    "rootDir": "./src"
  },
  "include": ["src"],
  "exclude": ["dist", "node_modules", "**/*.test.ts"]
}
```

5. Create the initial source file:

```bash
touch src/index.ts
```

6. Add the package to the workspace by installing dependencies:

```bash
pnpm install
```

7. Implement your functionality in the `src` directory.

8. Build the package to verify it works:

```bash
pnpm build --filter @brc-mono/new-package
```

### Publishing Shared Packages

In the BRC Mono repository, shared packages are primarily consumed internally via workspace links. However, if you need to publish packages externally, use the following process:

1. Ensure the package is properly configured with a unique name, appropriate version, and complete metadata.

2. Create a changeset to document the changes:

```bash
pnpm changeset
```

This interactive command will:

- Prompt for the type of change (major, minor, patch)
- Ask for a description of the changes
- Create a markdown file in the `.changeset` directory

3. Version the packages based on changesets:

```bash
pnpm version-packages
```

This command:

- Reads the changeset files
- Updates package versions according to semver rules
- Updates internal dependencies between workspace packages
- Generates/updates CHANGELOG.md files

4. Publish the packages:

```bash
pnpm release
```

This command will:

- Build all packages
- Publish updated packages to the npm registry
- Push Git tags for the new versions

### Importing Shared Packages

To use a shared package in an application:

1. Add the package as a dependency:

```bash
pnpm add @brc-mono/ui --filter bvbrc
```

2. Import and use in your code:

```tsx
import { Button } from "@brc-mono/ui";

function MyComponent() {
  return <Button variant="primary">Click Me</Button>;
}
```

3. During development, changes to the shared package are immediately reflected in the consuming application without requiring reinstallation.

## Workspace Scripts

The root `package.json` defines several scripts that can be run across all workspaces:

```json
{
  "scripts": {
    "build": "turbo run build",
    "dev": "turbo run dev",
    "lint": "turbo run lint",
    "format": "prettier --write \"**/*.{ts,tsx,md}\"",
    "test": "turbo run test",
    "clean": "turbo run clean && rm -rf node_modules",
    "prepare": "husky",
    "changeset-summary": "node scripts/generate-changeset-summary.js",
    "changeset": "changeset",
    "version-packages": "changeset version",
    "release": "changeset publish"
  }
}
```

These scripts utilize Turborepo to execute the corresponding script in each applicable workspace according to the dependency graph.

### Running Scripts

To run scripts at different levels:

#### Running for All Workspaces

```bash
# Run a script defined in the root package.json
pnpm <script-name>

# Examples:
pnpm build  # Builds all packages and applications
pnpm dev    # Starts all applications in development mode
pnpm lint   # Lints all packages and applications
```

#### Running for a Specific Workspace

```bash
# Run a script for a specific workspace
pnpm --filter <workspace-name> <script-name>

# Examples:
pnpm --filter bvbrc dev      # Start only the BVBRC application
pnpm --filter @brc-mono/ui build  # Build only the UI package
```

#### Running with Dependencies

To run a script for a workspace and all its dependencies:

```bash
pnpm --filter <workspace-name>... <script-name>
```

The ellipsis (`...`) tells PNPM to include all dependencies of the specified workspace.

Example:

```bash
pnpm --filter bvbrc... build
```

This builds the BVBRC application and all packages it depends on.

#### Running with Dependents

To run a script for a workspace and all packages that depend on it:

```bash
pnpm --filter ...<workspace-name> <script-name>
```

Example:

```bash
pnpm --filter ...@brc-mono/ui build
```

This builds the UI package and all packages that depend on it.

## Turborepo Pipeline Configuration

The Turborepo pipeline is configured in `turbo.json`:

```json
{
  "$schema": "https://turbo.build/schema.json",
  "globalDependencies": ["**/.env.*local"],
  "tasks": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": [".next/**", "!.next/cache/**", "dist/**"]
    },
    "lint": {
      "outputs": []
    },
    "test": {
      "dependsOn": ["build"],
      "outputs": ["coverage/**"],
      "inputs": ["src/**/*.tsx", "src/**/*.ts", "test/**/*.ts", "test/**/*.tsx"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    },
    "clean": {
      "cache": false
    }
  }
}
```

### Configuration Breakdown

1. **globalDependencies**: Files that, when changed, invalidate all task caches

   - `**/.env.*local`: All local environment files

2. **tasks**: Defines the behavior of each script
   - **build**:
     - `dependsOn: ["^build"]`: Depends on the build task of all dependencies
     - `outputs`: Specifies which files are produced by the build task
   - **lint**:
     - `outputs: []`: Doesn't produce any cacheable outputs
   - **test**:
     - `dependsOn: ["build"]`: Runs after the build task
     - `outputs`: Specifies test coverage files as outputs
     - `inputs`: Specifies which files, when changed, should trigger a new test run
   - **dev**:
     - `cache: false`: Never caches the dev task
     - `persistent: true`: Indicates this task doesn't terminate (long-running process)
   - **clean**:
     - `cache: false`: Never caches the clean task

### Custom Pipeline Tasks

To add a new task to the Turborepo pipeline:

1. Add the script to relevant package.json files
2. Define the task in turbo.json with appropriate configuration
3. Run with `pnpm turbo run <task-name>`

Example: Adding a `typecheck` task

Add to turbo.json:

```json
{
  "tasks": {
    "typecheck": {
      "dependsOn": [],
      "outputs": []
    }
  }
}
```

Add to package.json files:

```json
{
  "scripts": {
    "typecheck": "tsc --noEmit"
  }
}
```

Run with:

```bash
pnpm turbo run typecheck
```

## Version Control Integration

The BRC Mono repository integrates with Git through several tools to enforce consistency and streamline the development workflow.

### Commit Guidelines

The repository uses `commitlint` configured with conventional commit standards. This ensures all commits follow a consistent format that makes the Git history more readable and enables automated changelog generation.

The commit format follows this pattern:

```
type(scope): subject
```

Where:

- **type**: The category of change (e.g., feat, fix, docs, style, refactor, test, chore)
- **scope** (optional): The package or module affected
- **subject**: A concise description of the change

Examples:

```
feat(ui): add Button component
fix(bvbrc): resolve navigation bug in header
docs: update workspace management guide
```

The configuration is defined in `commitlint.config.js`:

```js
module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    // Add any custom rules here (optional)
  },
};
```

Commit validation is enforced via Husky's commit-msg hook.

### Changesets

The repository uses `@changesets/cli` to manage versions and changelogs. Changesets provide a structured way to:

1. Document changes
2. Determine which packages need version bumps
3. Update package versions according to semver
4. Generate changelogs

The workflow for using changesets:

1. Make your changes across one or more packages
2. Create a changeset documenting the changes:
   ```bash
   pnpm changeset
   ```
3. Commit the changeset file along with your changes
4. When ready to release, run:
   ```bash
   pnpm version-packages
   ```
5. Commit the updated package versions and changelogs
6. Publish the new versions:
   ```bash
   pnpm release
   ```

The `changeset-summary` script generates a summary of pending changesets:

```bash
pnpm changeset-summary
```

## CI/CD Integration

To integrate the BRC Mono repository with CI/CD systems, configure the following:

### GitHub Actions Example

```yaml
name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: "18"

      - name: Setup PNPM
        uses: pnpm/action-setup@v2
        with:
          version: 8.14.0

      - name: Get pnpm store directory
        id: pnpm-cache
        run: echo "STORE_PATH=$(pnpm store path)" >> $GITHUB_OUTPUT

      - name: Setup pnpm cache
        uses: actions/cache@v3
        with:
          path: ${{ steps.pnpm-cache.outputs.STORE_PATH }}
          key: ${{ runner.os }}-pnpm-store-${{ hashFiles('**/pnpm-lock.yaml') }}
          restore-keys: |
            ${{ runner.os }}-pnpm-store-

      - name: Install dependencies
        run: pnpm install

      - name: Lint
        run: pnpm lint

      - name: Test
        run: pnpm test

      - name: Build
        run: pnpm build
```

### Turborepo Remote Cache

For faster CI builds, configure Turborepo's remote cache:

```yaml
- name: Setup Turborepo cache
  uses: actions/cache@v3
  with:
    path: node_modules/.cache/turbo
    key: ${{ runner.os }}-turbo-${{ github.sha }}
    restore-keys: |
      ${{ runner.os }}-turbo-
```

Or use Vercel's Remote Cache:

```yaml
- name: Setup Turborepo remote cache
  run: |
    npx turbo login
    npx turbo link
```

## Common Issues and Troubleshooting

### Dependency Resolution Issues

**Problem**: Packages cannot find their dependencies.

**Solutions**:

1. Verify correct workspace configuration in `pnpm-workspace.yaml`
2. Check for version conflicts with `pnpm why <package-name>`
3. Clear the PNPM store and reinstall:
   ```bash
   pnpm store prune
   pnpm install
   ```

### Workspace Symlink Issues

**Problem**: Changes in shared packages aren't reflected in consuming apps.

**Solutions**:

1. Ensure the package has been built: `pnpm build --filter <package-name>`
2. Verify the package's entry points in its package.json
3. Check for correct import paths in the consuming application
4. Restart the development server

### Build Failures

**Problem**: Turborepo build fails for specific packages.

**Solutions**:

1. Check individual package build logs:
   ```bash
   pnpm --filter <package-name> build
   ```
2. Clear Turborepo's cache:
   ```bash
   pnpm turbo clean
   ```
3. Check for circular dependencies between workspace packages

### Performance Issues

**Problem**: Slow builds or development experience.

**Solutions**:

1. Enable Turborepo's remote caching
2. Optimize task dependencies in turbo.json
3. Use filtered builds for development:
   ```bash
   pnpm --filter <app-name>... dev
   ```
4. Profile build performance:
   ```bash
   pnpm turbo run build --profile=turbo-build-profile
   ```

### Version Mismatch Between Packages

**Problem**: Internal dependencies have inconsistent versions.

**Solutions**:

1. Use changesets to coordinate version bumps:
   ```bash
   pnpm changeset
   pnpm version-packages
   ```
2. Manually update versions in package.json files
3. Use `workspace:*` or `workspace:^` version specifiers for internal dependencies

### Missing Peer Dependencies

**Problem**: Warnings about unmet peer dependencies.

**Solutions**:

1. Install the required peer dependency in the consuming application
2. Use compatible versions of peer dependencies
3. For development, add peer dependencies as devDependencies in the shared package
