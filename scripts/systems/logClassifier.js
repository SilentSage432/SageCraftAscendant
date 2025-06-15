// logClassifier.js — Sovereign Whisperer Signal Classification Module

export const classifyLogEntry = (entry) => {
  if (!entry || typeof entry !== 'string') return 'unknown';

  const normalized = entry.toLowerCase();

  if (normalized.includes('error') || normalized.includes('failed')) {
    return 'error';
  }

  if (normalized.includes('warning') || normalized.includes('deprecated')) {
    return 'warning';
  }

  if (normalized.includes('success') || normalized.includes('✅')) {
    return 'success';
  }

  if (normalized.includes('initialized') || normalized.includes('activated') || normalized.includes('engaged')) {
    return 'status';
  }

  if (normalized.includes('vital') || normalized.includes('drift') || normalized.includes('signal')) {
    return 'telemetry';
  }

  return 'info';
};

export const testClassifier = () => {
  const testEntries = [
    '✅ Success: System initialized successfully.',
    '⚠️ Warning: Deprecated API usage detected.',
    '🧬 Vital scan complete. Signal strength: 92%',
    '❌ Error: Failed to load neural core.',
    'Info: Synchronization drift is minimal.'
  ];

  testEntries.forEach(entry => {
    const type = classifyLogEntry(entry);
    console.log(`[${type.toUpperCase()}] ${entry}`);
  });
};

export const getLogClass = (entry) => {
  const category = classifyLogEntry(entry?.status || entry?.message || '');
  return `log-${category}`;
};
