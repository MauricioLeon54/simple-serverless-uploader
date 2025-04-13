#!/usr/bin/env node
import { Command } from 'commander';
import { APP_VERSION } from 'src/config/appVersion';
import { loadUserConfig } from 'src/utils/loadSSUConfig';

async function main() {
  const program = new Command();

  const userConfig = await loadUserConfig();

  program.name('ssu').description('Simple Serverless Upload CLI').version(APP_VERSION);

  program.parse(process.argv);
}

main();
