import fs from 'fs';
import path from 'path';

export async function loadUserConfig() {
  const filenames = ['ssu.config.js', 'ssu.config.cjs']; // TODO: Pending support to Typescript config file 'ssu.config.ts'

  for (const filename of filenames) {
    const fullPath = path.resolve(process.cwd(), filename);
    if (fs.existsSync(fullPath)) {
      try {
        const configModule = await import(fullPath);
        return configModule.default || configModule;
      } catch (error) {
        console.error(`❌ Error loading config file ${filename}:`, error);
        return null;
      }
    }
  }

  console.warn('⚠️ No config file found. Using defaults.');
  return null;
}
