// Checks every translated line of a sheet (key <tab> english <tab> translation) against its English.
// Usage: node tools/check.mjs zh-TW.tsv [more.tsv ...]   Exit 1 when a filled line breaks a rule.
import fs from 'node:fs';
const bag = (s, re) => (s.match(re) || []).sort().join(' ');
const PLACE = /\{\w+\}/g, SWITCH = /\{\{[^{}]*\}\}/g, TAG = /<\/?[a-z]+>/g;
let bad = 0;
for (const file of process.argv.slice(2)) {
  const lines = fs.readFileSync(file, 'utf8').replace(/^﻿/, '').split(/\r?\n/);
  let filled = 0, total = 0;
  lines.slice(1).forEach((line, i) => {
    if (!line.trim()) return;
    const [key, en = '', tr = ''] = line.split('\t');
    total++;
    if (!tr.trim()) return;
    filled++;
    const why = [];
    const enSw = en.match(SWITCH) || [], trSw = tr.match(SWITCH) || [];
    if (enSw.length !== trSw.length || enSw.some((s, j) => s.split('|').length !== (trSw[j] || '').split('|').length)) why.push('the {{a|b}} switches do not match the English');
    if (bag(en.replace(SWITCH, ''), PLACE) !== bag(tr.replace(SWITCH, ''), PLACE)) why.push(`the {placeholders} must be exactly: ${bag(en.replace(SWITCH, ''), PLACE) || '(none)'}`);
    if (bag(en, TAG) !== bag(tr, TAG)) why.push(`the tags must be exactly: ${bag(en, TAG) || '(none)'}`);
    if (tr.includes('&')) why.push('no & character');
    if ([...tr].length > 600) why.push('over 600 characters');
    if (why.length) { bad++; console.log(`${file} line ${i + 2}  ${key}\n   ${why.join('\n   ')}`); }
  });
  console.log(`${file}: ${filled} of ${total} lines translated`);
}
if (bad) { console.log(`\n${bad} line(s) need a fix.`); process.exit(1); }
console.log('All translated lines pass.');
