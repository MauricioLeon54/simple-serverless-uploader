#!/usr/bin/env node
import { Command } from 'commander';
import { APP_VERSION } from 'src/config/appVersion';
import type { DeploymentType } from 'src/constants/DeploymentType';
import { DeploymentTypes } from 'src/constants/DeploymentType';
import { deployProject } from 'src/deployProject';
import { loadUserConfig } from 'src/utils/loadSSUConfig';

async function main() {
  const program = new Command();

  const userConfig = await loadUserConfig();

  program.name('ssu').description('Simple Serverless Upload CLI').version(APP_VERSION);

  program
    .command('deploy <type>')
    .description(`Deploy to AWS (${DeploymentTypes.S3_WEBSITE} or ${DeploymentTypes.LAMBDA_SERVER})`)
    .option('--stage <stage>', `Deployment stage [${userConfig.stages.join(',')}]`)
    .action(async (type: DeploymentType, { stage }: { stage: string }) => {
      await deployProject({ type, stage, projectName: userConfig.projectName });
    });

  program.parse(process.argv);
}

main();
