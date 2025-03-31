import { minify } from 'minify'; // https://www.npmjs.com/package/minify
import { existsSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const FILE_OPTIONS = { encoding: 'utf8' };
const MINIFY_OPTIONS = {};

const ROOT = process.cwd();
const SRC_DIR = resolve(ROOT, 'src/public-raw');

const DEST = {
  '.css': resolve(ROOT, 'public/styles'),
  '.js': resolve(ROOT, 'public/scripts'),
};

const dir = readdirSync(SRC_DIR, FILE_OPTIONS);
await dir.forEach(async filename => {
  const path = resolve(SRC_DIR, filename);
  const extension = filename.substring(filename.lastIndexOf('.'));
  const dest_dir = DEST[extension];

  if(!dest_dir) {
    console.log(`! unable to compress "${path}"\n`);
  } else {
    const newFilename = filename.replace(extension, `.min${extension}`);
    const dest = resolve(dest_dir, newFilename);
    const original = readFileSync(path, FILE_OPTIONS);

    let compressed;

    try {
      compressed = await minify(path, MINIFY_OPTIONS);
    } catch (err) {
      console.log(`! unable to compress "${path}"\n`, err, '\n');
    }

    if(compressed) {
      const wasExisting = existsSync(dest);

      writeFileSync(dest, compressed, FILE_OPTIONS);
      const confirm = readFileSync(dest, FILE_OPTIONS);

      const originalLines = (original.split('\n') || []).length
      const compressedLines = (compressed.split('\n') || []).length;
      const optimization = (100 - (compressed.length / original.length * 100)).toFixed(2);

      const logs = [
        `Finished file "${filename}" > "${newFilename}"`,
        `- Original size: ${(original.length / 1024).toFixed(2)} KB`,
        `- Original number of lines: ${originalLines}`,
        `> compressed size: ${(compressed.length / 1024).toFixed(2)} KB`,
        `> compressed number of lines: ${compressedLines}`,
        `= file overwrite: ${wasExisting}`,
        `= confirmation: ${confirm.length === compressed.length ? 'yes' : 'no'}`,
        `= optimization: ${optimization}%`,
        '',
      ];
      console.log(logs.join('\n'));
    }
  }
});
