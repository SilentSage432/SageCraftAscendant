

#!/usr/bin/env node

// Silent Sage DevOps Command Console

const readline = require('readline');
const { execSync } = require('child_process');
const path = require('path');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log("\n🧙‍♂️ Silent Sage DevOps Console — Command Center");
console.log("──────────────────────────────────────────────\n");
console.log("1️⃣  Run Version Bump");
console.log("2️⃣  Run Full Release Prep");
console.log("3️⃣  Run Master Diagnostics (Manual Reminder)");
console.log("4️⃣  Run Wiring Audit (Manual Reminder)");
console.log("5️⃣  Run Auto-Healing Layer (Manual Reminder)");
console.log("6️⃣  Run Full Git Rollback List");
console.log("7️⃣  Rollback To Previous Tag");
console.log("0️⃣  Exit\n");

rl.question("Choose your option: ", async function(option) {
  try {
    switch (option.trim()) {
      case '1':
        console.log('\n🚀 Running Version Bump...');
        execSync('node version-bump.js', { stdio: 'inherit' });
        break;

      case '2':
        console.log('\n🚀 Running Full Release Prep...');
        execSync('node release-prep.js', { stdio: 'inherit' });
        break;

      case '3':
        console.log('\n🧪 Reminder: Master Diagnostics run inside the app DevTools console as: runMasterDiagnostics()');
        break;

      case '4':
        console.log('\n🧪 Reminder: Wiring Audit runs inside DevTools as: runWiringExpectationAudit()');
        break;

      case '5':
        console.log('\n🧪 Reminder: Healing Layer runs inside DevTools as: runAutoHealingLayer()');
        break;

      case '6':
        console.log('\n🔖 Listing all Git tags (rollback points)...\n');
        execSync('git tag', { stdio: 'inherit' });
        break;

      case '7':
        rl.question('\n🔙 Enter version tag to rollback to (example: v2.0.9): ', function(tag) {
          try {
            console.log(`\n⚠ WARNING: This will perform a hard reset to ${tag}\n`);
            execSync(`git reset --hard ${tag}`, { stdio: 'inherit' });
            console.log('\n✅ Rollback complete.');
          } catch (err) {
            console.error('❌ Rollback failed:', err);
          }
          rl.close();
        });
        return;

      default:
        console.log('\n👋 Exiting. See you next deployment.');
    }
  } catch (err) {
    console.error('\n❌ Operation failed:', err);
  }
  rl.close();
});