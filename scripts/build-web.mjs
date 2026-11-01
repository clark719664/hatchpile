import { cpSync, rmSync, mkdirSync, readdirSync, statSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const out = join(root, 'www');
rmSync(out, { recursive: true, force: true });
mkdirSync(out, { recursive: true });

const files = ['index.html', 'manifest.webmanifest'];
for (const f of files) cpSync(join(root, f), join(out, f));
cpSync(join(root, 'vendor'), join(out, 'vendor'), { recursive: true });
cpSync(join(root, 'assets'), join(out, 'assets'), {
  recursive: true,
  filter: src => !/og\.png$/.test(src),
});

let n = 0, bytes = 0;
(function walk(d) {
  for (const e of readdirSync(d)) {
    const p = join(d, e), s = statSync(p);
    if (s.isDirectory()) walk(p); else { n++; bytes += s.size; }
  }
})(out);
console.log(`www/: ${n} files, ${(bytes / 1024).toFixed(0)} KB`);
