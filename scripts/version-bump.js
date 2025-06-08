

// Version Bump Automation System
// This script auto-increments version query strings inside index.html

const fs = require('fs');
const path = require('path');

// Set path to your index.html
const indexPath = path.join(__dirname, '../index.html');

// Read file
let html = fs.readFileSync(indexPath, 'utf8');

// Regex to match all versioned files
const versionRegex = /(v=)(\d+)\.(\d+)\.(\d+)/g;

// Find current max version
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

// Increment patch version
currentVersion.patch += 1;
const newVersionString = `${currentVersion.major}.${currentVersion.minor}.${currentVersion.patch}`;

console.log(`✅ Bumping version to: ${newVersionString}`);

// Replace all occurrences
html = html.replace(versionRegex, `$1${currentVersion.major}.${currentVersion.minor}.${currentVersion.patch}`);

// Write back updated file
fs.writeFileSync(indexPath, html, 'utf8');

console.log('✅ index.html updated successfully.');