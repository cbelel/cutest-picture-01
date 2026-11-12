/**
 * cutest-picture-01 entry publisher.
 * This program copies the local entry.png file to the designated output directory.
 * It checks the MAKEFUN_OUTPUT_DIR environment variable; if unset or empty,
 * it defaults to /output. It ensures the output directory exists and writes
 * the entry.png file.
 */

import { copyFile, mkdir } from 'node:fs/promises';
import { join } from 'node:path';

async function main(): Promise<void> {
  const outputDir = process.env.MAKEFUN_OUTPUT_DIR || '/output';
  await mkdir(outputDir, { recursive: true });
  const srcPath = 'entry.png';
  const destPath = join(outputDir, 'entry.png');
  await copyFile(srcPath, destPath);
  console.log(`Successfully copied ${srcPath} to ${destPath}`);
}

main().catch((err) => {
  console.error('Error publishing entry picture:', err);
  process.exit(1);
});
