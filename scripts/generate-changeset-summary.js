#!/usr/bin/env node
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

/**
 * Generate a comprehensive summary of commits between main and dev branches
 * for use in the initial changeset.
 */
function generateChangesetSummary() {
  try {
    // Step 1: Get the commit range references
    console.log('Determining commit range between main and dev...');
    const mainRef = execSync('git rev-parse main').toString().trim();
    const devRef = execSync('git rev-parse dev').toString().trim();

    // Step 2: Get detailed commit log with full message bodies
    console.log('Extracting commit history...');
    const commitLog = execSync(
      `git log ${mainRef}..${devRef} --pretty=format:"%h%n%s%n%b%n--COMMIT_DELIMITER--"`,
      { maxBuffer: 5 * 1024 * 1024 }, // Increase buffer to handle large histories
    ).toString();

    // Step 3: Get file statistics for overall context
    console.log('Gathering file change statistics...');
    const fileStats = execSync(`git diff --stat ${mainRef}..${devRef}`)
      .toString()
      .trim();

    // Step 4: Parse and categorize commits
    console.log('Analyzing commit messages...');
    const commits = commitLog
      .split('--COMMIT_DELIMITER--')
      .filter((c) => c.trim());

    // Initialize categories based on conventional commit types
    const categories = {
      feat: { title: 'Features', commits: [] },
      fix: { title: 'Bug Fixes', commits: [] },
      docs: { title: 'Documentation', commits: [] },
      style: { title: 'Styling and Formatting', commits: [] },
      refactor: { title: 'Code Refactoring', commits: [] },
      perf: { title: 'Performance Improvements', commits: [] },
      test: { title: 'Tests', commits: [] },
      chore: { title: 'Chores and Maintenance', commits: [] },
      ci: { title: 'CI/CD', commits: [] },
      build: { title: 'Build System', commits: [] },
      revert: { title: 'Reverts', commits: [] },
      release: { title: 'Releases', commits: [] },
      hotfix: { title: 'Hotfixes', commits: [] },
      security: { title: 'Security', commits: [] },
      deploy: { title: 'Deployments', commits: [] },
      config: { title: 'Configs', commits: [] },
      example: { title: 'Examples', commits: [] },
      wip: { title: 'Work in Progress', commits: [] },
    };

    // Process each commit
    commits.forEach((commit) => {
      const lines = commit.trim().split('\n');
      if (lines.length < 2) return; // Skip malformed commits

      const hash = lines[0].trim();
      const subject = lines[1].trim();
      const body = lines.slice(2).join('\n').trim();

      // Parse conventional commit format: type(scope): description
      const conventionalMatch = subject.match(
        /^(feat|fix|docs|style|refactor|perf|test|build|ci|chore|revert|release|hotfix|security|deploy|config|example|wip|other|)(\([^)]+\))?:\s*(.*)$/i,
      );

      if (conventionalMatch) {
        const type = conventionalMatch[1].toLowerCase();
        const scope = conventionalMatch[2]
          ? conventionalMatch[2].replace(/[()]/g, '')
          : '';
        const description = conventionalMatch[3].trim();

        // Format the commit entry
        let commitEntry = `- ${description}`;
        if (scope) {
          commitEntry = `- **${scope}**: ${description}`;
        }

        // Add additional context from commit body if available
        if (body) {
          // Extract only the first paragraph or meaningful line from the body
          const firstPara = body.split('\n\n')[0].trim();
          if (
            firstPara &&
            !firstPara.startsWith('Co-authored-by:') &&
            firstPara.length < 100
          ) {
            commitEntry += ` — ${firstPara}`;
          }
        }

        // Add to the appropriate category
        if (categories[type]) {
          categories[type].commits.push(commitEntry);
        } else {
          categories.other.commits.push(commitEntry);
        }
      } else {
        // Handle non-conventional commits
        categories.other.commits.push(`- ${subject}`);
      }
    });

    // Step 5: Generate the formatted summary
    console.log('Formatting summary...');

    // Start with an introductory section
    let summary = '# Initial Release v0.1.0\n\n';
    summary += 'This release represents the initial stable version of the project, incorporating all development work to date. ';
    summary += 'It establishes the foundation for future enhancements and includes the core functionality required for production use.\n\n';

    // Add file statistics for overall context
    const fileCount = (fileStats.match(/(\d+) files? changed/) || [0, '0'])[1];
    const insertions = (fileStats.match(/(\d+) insertions?/) || [0, '0'])[1];
    const deletions = (fileStats.match(/(\d+) deletions?/) || [0, '0'])[1];

    summary += '## Overview\n\n';
    summary += `This release includes changes across ${fileCount} files with ${insertions} additions and ${deletions} deletions. `;
    summary += 'The changes span multiple areas of the codebase and represent the complete implementation of the initial feature set.\n\n';

    // Add each category with its commits
    for (const [type, category] of Object.entries(categories)) {
      if (category.commits.length > 0) {
        summary += `## ${category.title}\n\n`;
        summary += category.commits.join('\n');
        summary += '\n\n';
      }
    }

    // Add technical details section
    summary += '## Technical Details\n\n';
    summary += '- **Branch:** This release merges `dev` into `main`\n';
    summary += `- **Commit Count:** ${commits.length} commits included\n`;
    summary += `- **File Changes:** ${fileStats.split('\n').pop() || 'Multiple files affected'}\n\n`;

    // Add instructions for reviewers
    summary += '## For Reviewers\n\n';
    summary += 'When reviewing this initial release, please consider:\n\n';
    summary += '- Overall architecture and code organization\n';
    summary += '- Completeness of the feature set\n';
    summary += '- Documentation quality\n';
    summary += '- Test coverage\n';
    summary += '- Performance considerations\n\n';

    // Step 6: Write the summary to the changeset directory
    console.log('Writing summary to changeset directory...');

    // Ensure the .changeset directory exists
    const changesetDir = path.join(process.cwd(), '.changeset');
    if (!fs.existsSync(changesetDir)) {
      fs.mkdirSync(changesetDir, { recursive: true });
    }

    // Create a formatted changeset file - this is just for reference
    const summaryPath = path.join(changesetDir, 'INITIAL_RELEASE_SUMMARY.md');
    fs.writeFileSync(summaryPath, summary);

    // Also create a proper changeset file with the required frontmatter
    // We'll extract the first 2-3 paragraphs for the brief changeset description
    const briefSummary = summary.split('\n\n').slice(0, 3).join('\n\n');

    // Get all package names for the changeset
    console.log('Detecting packages for changeset...');

    // Try to get workspace info from pnpm
    let packageNames = [];
    try {
      const workspaceInfo = JSON.parse(
        execSync('pnpm m ls --json --depth -1').toString(),
      );
      packageNames = workspaceInfo.map((pkg) => pkg.name).filter(Boolean);
    } catch (e) {
      console.warn(
        'Could not automatically detect packages. Using a placeholder instead.',
      );
      packageNames = ['placeholder-package-name'];
      console.warn(
        'You will need to manually edit the changeset file to include your actual package names.',
      );
    }

    // Create the changeset content with frontmatter
    const changesetId =
      Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
    const changesetContent = `---
${packageNames.map((pkg) => `"${pkg}": minor`).join('\n')}
---

${briefSummary}
`;

    // Write the actual changeset file
    const changesetFilePath = path.join(changesetDir, `${changesetId}.md`);
    fs.writeFileSync(changesetFilePath, changesetContent);

    console.log('\nSuccess! Generated two files:');
    console.log(`1. Full summary: ${summaryPath}`);
    console.log(`2. Changeset file: ${changesetFilePath}`);
    console.log('\nNext steps:');
    console.log('- Review and edit the changeset file if needed');
    console.log('- Use the full summary for your PR description');
    console.log('- Continue with opening your PR from dev to main');

    return { success: true, summaryPath, changesetFilePath };
  } catch (error) {
    console.error('Error generating changeset summary:', error);
    process.exit(1);
  }
}

// Execute the function
generateChangesetSummary();
