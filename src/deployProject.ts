import type { DeploymentType } from 'src/constants/DeploymentType';
import type { Config } from 'src/types/Config';
import { colorToLog } from 'src/utils/log/colorToLog';

export async function deployProject(request: DeployProjectRequest) {
  try {
    console.log(`Starting deploy for project ${request.projectName} 🚀`);
    console.log(`Selected stage: ${request.stage}`);

    if (!request.availableStages.includes(request.stage)) {
      console.log(colorToLog('red', `❌️  Exiting without releasing ${request.projectName} since passed stage "${request.stage}" is not supported!`));
      process.exit(1);
    }

    const isProductionStage = request.stage === (request.options?.productionStage || 'prod');

    const isGitImplementationEnabled = request.options?.gitImplementationEnabled;
    const mainBranchName = request.options?.mainGitBranch || 'main';
  } catch (e: any) {
    console.log(colorToLog('red', `❌️  Something went wrong ${e}`));
    console.timeEnd(colorToLog('blue', 'RunTime'));
    process.exit(1);
  }
}

export type DeployProjectRequest = {
  type: DeploymentType;
  stage: string;
  availableStages: Array<string>;
  projectName: string;

  options?: Pick<Config, 'productionStage' | 'gitImplementationEnabled' | 'mainGitBranch'>;
};
