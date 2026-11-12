/**
 * cutest-picture-01 entry publisher.
 * This program copies the local entry.png file to the designated output directory.
 * It checks the MAKEFUN_OUTPUT_DIR environment variable; if unset or empty,
 * it defaults to /output. It ensures the output directory exists and writes
 * the entry.png file.
 */

import { copyFile, mkdir, stat } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

async function main(): Promise<void> {
  const outputDir = process.env.MAKEFUN_OUTPUT_DIR || '/output';
  const srcPath = join(__dirname, 'entry.png');

  try {
    const fileStats = await stat(srcPath);
    if (!fileStats.isFile() || fileStats.size === 0) {
      console.error(`Error: Source file ${srcPath} is missing or empty.`);
      process.exit(1);
    }
  } catch (err) {
    console.error(`Error: Source file ${srcPath} could not be accessed:`, err);
    process.exit(1);
  }

  await mkdir(outputDir, { recursive: true });
  const destPath = join(outputDir, 'entry.png');
  await copyFile(srcPath, destPath);

  const destStats = await stat(destPath);
  console.log(`Wrote entry.png (${destStats.size} bytes) to ${outputDir}`);
}

main().catch((err) => {
  console.error('Error publishing entry picture:', err);
  process.exit(1);
});
