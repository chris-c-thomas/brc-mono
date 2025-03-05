// scripts/prevent-npm-usage.js
if (process.env.npm_execpath && !process.env.npm_execpath.includes('pnpm')) {
  console.error('\x1b[31m%s\x1b[0m', '====================================');
  console.error(
    '\x1b[31m%s\x1b[0m',
    '  ERROR: Please use pnpm instead of npm!',
  );
  console.error('\x1b[31m%s\x1b[0m', '  Install: npm install -g pnpm');
  console.error('\x1b[31m%s\x1b[0m', '  Then run: pnpm install');
  console.error('\x1b[31m%s\x1b[0m', '====================================');
  process.exit(1);
}
