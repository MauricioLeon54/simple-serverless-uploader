import fs from 'fs';
import path from 'path';
import type { Config } from 'src/types/Config';

const defaultConfig: Config = {
  projectName: 'My Project ',
  stages: ['prod', 'dev'],
  serverlessFile: './serverless.yml',
};

export async function loadUserConfig(): Promise<Config> {
  const filenames = ['ssu.config.js', 'ssu.config.cjs']; // TODO: Pending support to Typescript config file 'ssu.config.ts'

  for (const filename of filenames) {
    const fullPath = path.resolve(process.cwd(), filename);
    if (fs.existsSync(fullPath)) {
      try {
        const configModule = await import(fullPath);
        return configModule.default || configModule;
      } catch (error) {
        console.error(`❌ Error loading config file ${filename}:`, error);
        return defaultConfig;
      }
    }
  }

  console.warn('⚠️ No config file found. Using defaults.');
  return defaultConfig;
}
