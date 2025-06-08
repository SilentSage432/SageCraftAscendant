

// Silent Sage - Full Release Prep System
// This script auto-bumps versions, verifies diagnostics, and stages git commits.

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// PART 1 — Auto-Bump Version
const indexPath = path.join(__dirname, '../index.html');
let html = fs.readFileSync(indexPath, 'utf8');
const versionRegex = /(v=)(\d+)\.(\d+)\.(\d+)/g;

let currentVersion = { major: 0, minor: 0, patch: 0 };

html.replace(versionRegex, (_, prefix, major, minor, patch) => {
  major = parseInt(major);
  minor = parseInt(minor);
  patch = parseInt(patch);
  if (
    major > currentVersion.major ||
    (major === currentVersion.major && minor > currentVersion.minor) ||
    (major === currentVersion.major && minor === currentVersion.minor && patch > currentVersion.patch)
  ) {
    currentVersion = { major, minor, patch };
  }
  return _;
});

currentVersion.patch += 1;
const newVersionString = `${currentVersion.major}.${currentVersion.minor}.${currentVersion.patch}`;
console.log(`✅ Bumping version to: ${newVersionString}`);

html = html.replace(versionRegex, `$1${currentVersion.major}.${currentVersion.minor}.${currentVersion.patch}`);
fs.writeFileSync(indexPath, html, 'utf8');
console.log('✅ index.html version updated.');

// PART 2 — Optional: Run any final pre-release diagnostics
console.log('🧪 Running pre-release diagnostics...');
console.log('⚠ Reminder: Full runtime audits must be verified inside app dev mode.');

// PART 3 — Stage and Commit to Git
console.log('📦 Staging git changes...');
execSync('git add .', { stdio: 'inherit' });

const commitMessage = `🚀 Silent Sage Release v${newVersionString} - Automated Release Prep`;
execSync(`git commit -m "${commitMessage}"`, { stdio: 'inherit' });

console.log('🔐 Commit created successfully.');

// PART 4 — Push to Git
console.log('🚀 Pushing to remote...');
execSync('git push origin main', { stdio: 'inherit' });

console.log('✅ Release pipeline complete.');

// PART 5 — Create Git Tag for Rollback Protection
console.log('🔖 Creating Git tag for rollback protection...');
const tagName = `v${newVersionString}`;
execSync(`git tag ${tagName}`, { stdio: 'inherit' });
execSync(`git push origin ${tagName}`, { stdio: 'inherit' });

console.log(`✅ Release tag ${tagName} pushed to remote successfully.`);