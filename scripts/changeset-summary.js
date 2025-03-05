#!/usr/bin/env node
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

function generateChangesetSummary() {
  try {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');

    console.log(`Starting changeset summary generation (${timestamp})...`);
    console.log('Determining commit range between main and dev...');
    const mainRef = execSync('git rev-parse main').toString().trim();
    const devRef = execSync('git rev-parse dev').toString().trim();

    console.log('Extracting commit history with author information...');
    const commitLog = execSync(
      `git log ${mainRef}..${devRef} --pretty=format:"%h%n%an%n%ae%n%s%n%b%n--COMMIT_DELIMITER--"`,
      { maxBuffer: 10 * 1024 * 1024 },
    ).toString();

    console.log('Gathering file change statistics...');
    const fileStats = execSync(`git diff --stat ${mainRef}..${devRef}`)
      .toString()
      .trim();

    console.log('Analyzing commit messages and contributors...');
    const commits = commitLog
      .split('--COMMIT_DELIMITER--')
      .filter((c) => c.trim());

    const contributors = new Map();

    const contributorRoles = {
      authors: new Set(),
      coAuthors: new Set(),
      all: new Set(),
    };

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
      other: { title: 'Other Changes', commits: [] },
    };

    commits.forEach((commit) => {
      const lines = commit.trim().split('\n');
      if (lines.length < 4) return;

      const hash = lines[0].trim();
      const authorName = lines[1].trim();
      const authorEmail = lines[2].trim();
      const subject = lines[3].trim();
      const body = lines.slice(4).join('\n').trim();

      const authorId = `${authorName} <${authorEmail}>`;
      contributors.set(authorId, {
        name: authorName,
        email: authorEmail,
        commits: contributors.has(authorId)
          ? contributors.get(authorId).commits + 1
          : 1,
        isCoAuthor: false,
      });
      contributorRoles.authors.add(authorId);
      contributorRoles.all.add(authorId);

      const coAuthorMatches =
        body.match(/Co-authored-by:\s+([^<]+)\s+<([^>]+)>/g) || [];
      coAuthorMatches.forEach((match) => {
        const coAuthorMatch = match.match(
          /Co-authored-by:\s+([^<]+)\s+<([^>]+)>/,
        );
        if (coAuthorMatch) {
          const coAuthorName = coAuthorMatch[1].trim();
          const coAuthorEmail = coAuthorMatch[2].trim();
          const coAuthorId = `${coAuthorName} <${coAuthorEmail}>`;

          if (!contributors.has(coAuthorId)) {
            contributors.set(coAuthorId, {
              name: coAuthorName,
              email: coAuthorEmail,
              commits: 0,
              isCoAuthor: true,
            });
          }

          const coAuthorData = contributors.get(coAuthorId);
          coAuthorData.isCoAuthor = true;
          contributors.set(coAuthorId, coAuthorData);

          contributorRoles.coAuthors.add(coAuthorId);
          contributorRoles.all.add(coAuthorId);
        }
      });

      const conventionalMatch = subject.match(
        /^(feat|fix|docs|style|refactor|perf|test|build|ci|chore|revert|release|hotfix|security|deploy|config|example|wip|)(\([^)]+\))?:\s*(.*)$/i,
      );

      if (conventionalMatch) {
        const type = conventionalMatch[1].toLowerCase();
        const scope = conventionalMatch[2]
          ? conventionalMatch[2].replace(/[()]/g, '')
          : '';
        const description = conventionalMatch[3].trim();

        let commitEntry = `- ${description}`;
        if (scope) {
          commitEntry = `- **${scope}**: ${description}`;
        }

        if (body) {
          const firstPara = body.split('\n\n')[0].trim();
          if (
            firstPara &&
            !firstPara.startsWith('Co-authored-by:') &&
            firstPara.length < 100
          ) {
            commitEntry += ` — ${firstPara}`;
          }
        }

        if (categories[type]) {
          categories[type].commits.push(commitEntry);
        } else {
          categories.other.commits.push(commitEntry);
        }
      } else {
        categories.other.commits.push(`- ${subject}`);
      }
    });

    console.log('Formatting summary with contributor information...');

    let summary = '# Initial Release v0.1.0\n\n';
    summary +=
      'This release represents the initial stable version of the BRC Mono project.\n\n';

    const fileCount = (fileStats.match(/(\d+) files? changed/) || [0, '0'])[1];
    const insertions = (fileStats.match(/(\d+) insertions?/) || [0, '0'])[1];
    const deletions = (fileStats.match(/(\d+) deletions?/) || [0, '0'])[1];

    summary += '## Overview\n\n';
    summary += `This release includes changes across ${fileCount} files with ${insertions} additions and ${deletions} deletions. `;
    summary +=
      'The changes span multiple areas of the codebase and represent the complete implementation of the base app instances.\n\n';

    for (const [type, category] of Object.entries(categories)) {
      if (category.commits.length > 0) {
        summary += `## ${category.title}\n\n`;
        summary += category.commits.join('\n');
        summary += '\n\n';
      }
    }

    let contributorsSection = '## Contributors\n\n';

    const sortedContributors = Array.from(contributors.entries()).sort(
      (a, b) => {
        if (b[1].commits !== a[1].commits) {
          return b[1].commits - a[1].commits;
        }
        return a[1].name.localeCompare(b[1].name);
      },
    );

    const primaryAuthors = sortedContributors
      .filter(([id, _]) => contributorRoles.authors.has(id))
      .map(([_, data]) => {
        const commitCount = data.commits;
        const commitText = commitCount === 1 ? 'commit' : 'commits';
        return `- **${data.name}** (${commitCount} ${commitText})`;
      });

    if (primaryAuthors.length > 0) {
      contributorsSection += '### Primary Authors\n\n';
      contributorsSection += primaryAuthors.join('\n');
      contributorsSection += '\n\n';
    }

    const coAuthors = sortedContributors
      .filter(([_, data]) => data.isCoAuthor)
      .map(([_, data]) => `- **${data.name}**`);

    if (coAuthors.length > 0) {
      contributorsSection += '### Co-Authors\n\n';
      contributorsSection += coAuthors.join('\n');
      contributorsSection += '\n\n';
    }

    contributorsSection += '### GitHub Information\n\n';
    contributorsSection +=
      'This changeset represents the collaborative work of multiple contributors. ';
    contributorsSection +=
      'GitHub usernames may differ from the author information above. ';
    contributorsSection +=
      'To see the complete list of contributors with GitHub usernames, please check the PR history and commit details.\n\n';

    summary += '## Technical Details\n\n';
    summary += '- **Branch:** This release merges `dev` into `main`\n';
    summary += `- **Commit Count:** ${commits.length} commits included\n`;
    summary += `- **File Changes:** ${fileStats.split('\n').pop() || 'Multiple files affected'}\n\n`;

    summary += contributorsSection;

    summary += '## For Reviewers\n\n';
    summary += 'When reviewing this release, please consider:\n\n';
    summary += '- Overall architecture and code organization\n';
    summary += '- Completeness of the feature set\n';
    summary += '- Documentation quality\n';
    summary += '- Test coverage\n';
    summary += '- Performance considerations\n\n';

    console.log('Creating output directory structure...');

    const changesetDir = path.join(process.cwd(), '.changeset');
    if (!fs.existsSync(changesetDir)) {
      fs.mkdirSync(changesetDir, { recursive: true });
    }

    const runsDir = path.join(changesetDir, 'runs');
    if (!fs.existsSync(runsDir)) {
      fs.mkdirSync(runsDir, { recursive: true });
    }

    const currentRunDir = path.join(runsDir, `run-${timestamp}`);
    fs.mkdirSync(currentRunDir, { recursive: true });

    const summaryPath = path.join(currentRunDir, 'INITIAL_RELEASE_SUMMARY.md');
    fs.writeFileSync(summaryPath, summary);

    const latestSummaryPath = path.join(
      changesetDir,
      'INITIAL_RELEASE_SUMMARY.md',
    );
    try {
      if (fs.existsSync(latestSummaryPath)) {
        fs.unlinkSync(latestSummaryPath);
      }

      const relPath = path.relative(changesetDir, summaryPath);
      fs.symlinkSync(relPath, latestSummaryPath, 'file');
    } catch (symlinkError) {
      console.warn(
        `Warning: Could not create symlink (${symlinkError.message}). Copying file instead.`,
      );
      fs.copyFileSync(summaryPath, latestSummaryPath);
    }

    const briefSummary = summary;

    console.log('Detecting packages for changeset...');

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

    const changesetId =
      Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
    const changesetContent = `---
${packageNames.map((pkg) => `"${pkg}": minor`).join('\n')}
---

${briefSummary}
`;

    const runChangesetPath = path.join(currentRunDir, `${changesetId}.md`);
    fs.writeFileSync(runChangesetPath, changesetContent);

    const mainChangesetPath = path.join(changesetDir, `${changesetId}.md`);
    fs.writeFileSync(mainChangesetPath, changesetContent);

    const metadataContent = {
      timestamp: new Date().toISOString(),
      mainRef,
      devRef,
      commitCount: commits.length,
      fileStats: {
        filesChanged: fileCount,
        insertions,
        deletions,
      },
      categories: Object.entries(categories).reduce((acc, [type, category]) => {
        acc[type] = category.commits.length;
        return acc;
      }, {}),
      changesetId,
      contributorStats: {
        totalContributors: contributors.size,
        primaryAuthors: contributorRoles.authors.size,
        coAuthors: contributorRoles.coAuthors.size,
        contributors: Array.from(contributors.entries()).map(([id, data]) => ({
          name: data.name,
          email: data.email.replace(/^(.{3}).*@(.{3}).*$/, '$1...@$2...'),
          commits: data.commits,
          isCoAuthor: data.isCoAuthor,
        })),
      },
    };

    const metadataPath = path.join(currentRunDir, 'metadata.json');
    fs.writeFileSync(metadataPath, JSON.stringify(metadataContent, null, 2));

    console.log('\nSuccess! Generated files with contributor information:');
    console.log(`1. Run directory: ${currentRunDir}`);
    console.log(`   - Full summary: ${summaryPath}`);
    console.log(`   - Changeset file: ${runChangesetPath}`);
    console.log(`   - Metadata: ${metadataPath}`);
    console.log(
      `2. Active changeset file for processing: ${mainChangesetPath}`,
    );
    console.log(`3. Latest summary symbolic link: ${latestSummaryPath}`);
    console.log('\nContributor Statistics:');
    console.log(`- Total Contributors: ${contributorRoles.all.size}`);
    console.log(`- Primary Authors: ${contributorRoles.authors.size}`);
    console.log(`- Co-Authors: ${contributorRoles.coAuthors.size}`);
    console.log('\nNext steps:');
    console.log('- Review and edit the changeset file if needed');
    console.log('- Use the full summary for your PR description');
    console.log('- Continue with opening your PR from dev to main');
    console.log(`- Previous runs can be found in: ${runsDir}`);

    return {
      success: true,
      summaryPath,
      changesetFilePath: mainChangesetPath,
      runDirectory: currentRunDir,
      metadata: metadataContent,
    };
  } catch (error) {
    console.error('Error generating changeset summary:', error);
    try {
      const errorTimestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const errorLogDir = path.join(
        process.cwd(),
        '.changeset',
        'runs',
        'errors',
      );

      if (!fs.existsSync(errorLogDir)) {
        fs.mkdirSync(errorLogDir, { recursive: true });
      }

      const errorLogPath = path.join(
        errorLogDir,
        `error-${errorTimestamp}.log`,
      );
      fs.writeFileSync(
        errorLogPath,
        `Error at ${new Date().toISOString()}\n\n${error.stack || error.message}`,
      );
      console.error(`Error log written to: ${errorLogPath}`);
    } catch (logError) {
      console.error('Failed to write error log:', logError);
    }

    process.exit(1);
  }
}

generateChangesetSummary();
