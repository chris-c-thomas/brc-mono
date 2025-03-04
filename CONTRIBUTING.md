# Contributing to BRC Mono

Thank you for your interest in contributing to the BRC Mono project! This document provides detailed guidelines to help you contribute effectively.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Development Workflow](#development-workflow)
  - [Setting Up Your Development Environment](#setting-up-your-development-environment)
  - [Branch Naming Convention](#branch-naming-convention)
  - [Commit Message Standards](#commit-message-standards)
  - [Pull Request Process](#pull-request-process)
- [Coding Standards](#coding-standards)
  - [TypeScript Guidelines](#typescript-guidelines)
  - [React Component Standards](#react-component-standards)
  - [CSS and Styling](#css-and-styling)
- [Testing Requirements](#testing-requirements)
- [Documentation](#documentation)
- [Creating New Packages](#creating-new-packages)
- [Issue Reporting Guidelines](#issue-reporting-guidelines)
- [Security Vulnerability Reporting](#security-vulnerability-reporting)

## Code of Conduct

All contributors are expected to adhere to our code of conduct, promoting a respectful and inclusive environment. Instances of unacceptable behavior may be reported to the project maintainers.

## Development Workflow

### Setting Up Your Development Environment

1. **Fork and clone the repository**:

   ```bash
   git clone https://github.com/YourUsername/brc-mono.git
   cd brc-mono
   ```

   or

   ```bash
   gh repo clone https://github.com/YourUsername/brc-mono.git
   cd brc-mono
   ```

2. **Install dependencies**:

   ```bash
   pnpm install
   ```

3. **Create a new branch for your feature or fix**:

   ```bash
   git checkout -b feat/your-feature-name
   # or for fixes
   git checkout -b fix/issue-description
   ```

4. **Set up environment variables** (if required):

   - Copy `.env.example` to `.env.local` in the relevant application directory
   - Configure the variables as needed for local development

5. **Run the development server**:

   ```bash
   # For all applications
   pnpm dev

   # For a specific application
   pnpm dev --filter=bvbrc
   ```

### Branch Naming Convention

Branches should follow this naming structure:

- `feat/short-description` - For new features
- `fix/issue-description` - For bug fixes
- `docs/update-area` - For documentation changes
- `refactor/component-name` - For code refactoring
- `test/feature-name` - For adding or updating tests
- `chore/task-description` - For maintenance tasks

### Commit Message Standards

This project enforces [Conventional Commits](https://www.conventionalcommits.org/) standards using Commitlint. Each commit message must follow this structure:

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

**Types include**:

- `build`: Changes that affect the build system or external dependencies
- `chore`: Routine maintenance tasks that don't modify src or test files
- `ci`: Changes to CI/CD configuration files and scripts
- `config`: Updates to configuration files and settings
- `deploy`: Deployment related changes
- `docs`: Documentation only changes
- `example`: Adding or updating example code
- `feat`: A new feature for the user or API
- `fix`: A bug fix for the user or API
- `hotfix`: Critical bug fixes that need immediate deployment
- `perf`: Code changes that improve performance
- `refactor`: Code changes that neither fix bugs nor add features
- `release`: Release related tasks and version bumps
- `revert`: Reverting a previous commit
- `security`: Fixing security vulnerabilities or implementing security features
- `style`: Code style changes (formatting, missing semicolons, etc.)
- `test`: Adding missing tests or correcting existing tests
- `wip`: Work in progress commits (should be avoided in final PRs)

Commits made without one of these types will fall under the `other` type category in the `CHANGELOG`

**Examples**:

```
feat(ui): add Button component with customizable variants

Implemented a reusable Button component with support for primary, secondary,
and ghost variants. Includes keyboard accessibility enhancements.

BREAKING CHANGE: Removes the old ButtonSimple component.
```

```
fix(api): resolve CORS issues on data endpoint

Closes #123
```

### Pull Request Process

1. **Ensure your code passes all tests**:

   ```bash
   pnpm lint --filter=<workspace-name>
   pnpm test --filter=<workspace-name>
   ```

2. **Update documentation** if necessary.

3. **Create a pull request** against the `main` branch with:

   - Clear title following commit message conventions
   - Detailed description explaining the changes
   - Reference to related issues using keywords like "Closes #123"
   - Screenshots or GIFs for UI changes (if applicable)

4. **Address review feedback** if requested.

5. **Once approved**, a maintainer will merge your PR.

## Coding Standards

### TypeScript Guidelines

- Strongly type all functions, parameters, and return values
- Use interfaces for object shapes rather than type aliases when possible
- Avoid using `any` types; use `unknown` or proper type definitions
- Use meaningful variable and function names that explain their purpose
- Export types and interfaces that might be useful elsewhere

Example:

```typescript
// Preferred
interface UserData {
  id: string;
  name: string;
  email: string;
  preferences?: UserPreferences;
}

export function fetchUserData(userId: string): Promise<UserData> {
  // Implementation
}

// Avoid
function fetchData(id): any {
  // Implementation
}
```

### React Component Standards

- Use functional components with hooks rather than class components
- Keep components focused on a single responsibility
- Extract reusable logic into custom hooks
- Destructure props for clarity
- Properly type component props using TypeScript interfaces
- Use proper React.memo() for performance-critical components

Example:

```tsx
interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: "primary" | "secondary" | "ghost";
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  variant = "primary",
  disabled = false,
}) => {
  // Implementation
};
```

### CSS and Styling

- Use Tailwind CSS for styling components
- Follow the project's design system and component guidelines
- Avoid inline styles unless absolutely necessary
- `!important` requires approval so that it can be documented for reference
- For complex components, consider using CSS modules or styled-components

## Testing Requirements

- All new features should include appropriate tests
- Tests should be organized in a `__tests__` directory alongside the code being tested
- Unit tests should cover individual functions and components
- Integration tests should verify component interactions
- Use React Testing Library for component tests

Example test structure:

```
components/
├── Button/
│   ├── Button.tsx
│   ├── index.ts
│   └── __tests__/
│       └── Button.test.tsx
```

## Documentation

- Update relevant documentation when making changes
- Document exported functions, types, and components with JSDoc comments
- Provide usage examples for complex components

## Creating New Packages

1. Create a new directory under `packages/` or `apps/`
2. Initialize with a package.json:
   ```bash
   cd packages/
   mkdir my-package
   cd my-package
   pnpm init
   ```
3. Set up TypeScript configuration and basic file structure
4. Add to pnpm workspace by referencing it in the root pnpm-workspace.yaml
5. Create a README.md with usage instructions

## Issue Reporting Guidelines

When reporting issues, please include:

1. A clear and descriptive title
2. Steps to reproduce the issue
3. Expected behavior
4. Actual behavior
5. Screenshots if applicable
6. Environment information (browser, OS, etc.)

## Security Vulnerability Reporting

For security vulnerabilities, please email [help@maage-brc.org](mailto:help@maage-brc.org) directly instead of creating a public issue.
