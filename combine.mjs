import fs from 'fs';
import path from 'path';

// ---- COMBINE CSS ----
const cssFiles = [
  'src/index.css',
  'src/App.css',
  'src/components/Header.css',
  'src/components/Hero.css',
  'src/components/Timeline.css',
  'src/components/GuidedJourney.css',
  'src/components/ELI15.css',
  'src/components/Checklist.css',
  'src/components/PollingInfo.css',
  'src/components/AssistantChat.css',
  'src/components/PersonalizedGuidance.css',
];

let combinedCss = '';
for (const f of cssFiles) {
  const name = path.basename(f);
  const content = fs.readFileSync(f, 'utf-8');
  combinedCss += `/* ========== ${name} ========== */\n${content}\n\n`;
}
fs.writeFileSync('src/styles.css', combinedCss, 'utf-8');
console.log('Combined CSS written to src/styles.css');

// ---- COMBINE JSX ----
const jsxFiles = [
  'src/components/Header.jsx',
  'src/components/Hero.jsx',
  'src/components/Timeline.jsx',
  'src/components/GuidedJourney.jsx',
  'src/components/ELI15.jsx',
  'src/components/Checklist.jsx',
  'src/components/PollingInfo.jsx',
  'src/components/AssistantChat.jsx',
  'src/components/PersonalizedGuidance.jsx',
];

const lucideImports = new Set();

function processFile(content) {
  const lines = content.split('\n');
  const kept = [];
  for (const line of lines) {
    const trimmed = line.trim();
    // Skip pure import lines
    if (trimmed.startsWith('import ') && (trimmed.includes(' from ') || trimmed.includes("'./"))) {
      // Collect lucide imports
      if (trimmed.includes('lucide-react')) {
        const match = trimmed.match(/\{([^}]+)\}/);
        if (match) {
          match[1].split(',').map(s => s.trim()).filter(Boolean).forEach(s => lucideImports.add(s));
        }
      }
      continue;
    }
    // Convert "export default function X" -> "function X"
    if (trimmed.startsWith('export default function ')) {
      kept.push(line.replace('export default function ', 'function '));
      continue;
    }
    // Skip standalone "export default X;" lines
    if (trimmed.match(/^export default \w+;?$/)) {
      continue;
    }
    kept.push(line);
  }
  return kept.join('\n').trim();
}

let componentBodies = '';
for (const f of jsxFiles) {
  const name = path.basename(f);
  const content = fs.readFileSync(f, 'utf-8');
  const body = processFile(content);
  componentBodies += `\n// ========== ${name} ==========\n${body}\n`;
}

// Process App.jsx
const appContent = fs.readFileSync('src/App.jsx', 'utf-8');
const appBody = processFile(appContent);

// Build final import block
const lucideList = [...lucideImports].join(', ');

let combinedJsx = `import React, { useState, useRef, useEffect } from 'react';
import { ${lucideList} } from 'lucide-react';
import './styles.css';
${componentBodies}

// ========== App.jsx ==========
${appBody}

export default App;
`;

fs.writeFileSync('src/App.combined.jsx', combinedJsx, 'utf-8');
console.log('Combined JSX written to src/App.combined.jsx');
