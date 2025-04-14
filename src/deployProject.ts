import type { DeploymentType } from 'src/constants/DeploymentType';
import { verifyGitConditions } from 'src/git/verifyGitConditions';
import type { Config } from 'src/types/Config';
import { confirmProdStage } from 'src/utils/confirm/confirmProdStage';
import { forced } from 'src/utils/forced';
import { colorToLog } from 'src/utils/log/colorToLog';
import { shellExec } from 'src/utils/shellExec';
import { tagWithDate } from 'src/utils/tagWithDate';

export async function deployProject(request: DeployProjectRequest) {
  try {
    console.log(`Starting deploy for project ${request.projectName} 🚀`);
    console.log(`Selected stage: ${request.stage}`);

    if (!request.availableStages.includes(request.stage)) {
      console.log(colorToLog('red', `❌️  Exiting without releasing ${request.projectName} since passed stage "${request.stage}" is not supported!`));
      process.exit(1);
    }

    const productionStage = request.options?.productionStage || 'prod';

    const isProductionStage = request.stage === productionStage;

    const isGitImplementationEnabled = request.options?.gitImplementationEnabled;
    const mainBranchName = request.options?.mainGitBranch || 'main';

    if (isProductionStage && !request.options?.confirmSkipped) confirmProdStage(request.projectName, productionStage);
    console.time(colorToLog('blue', 'Runtime'));

    if (isGitImplementationEnabled && !request.options?.isForced) {
      verifyGitConditions({ mainBranch: mainBranchName, isProduction: isProductionStage, productionStageName: productionStage });
    }

    shellExec('yarn');

    if (!forced()) shellExec('yarn lint');
    if (!forced()) shellExec('yarn typescript');

    shellExec(`npx sls deploy --stage ${request.stage} --param="online" --aws-profile softii`); // --aws-profile softii

    const tagName = tagWithDate(request.stage);
    try {
      shellExec(`git tag -f ${tagName}`);
      shellExec(`git push origin ${tagName}`);
    } catch (e: any) {
      console.log('Tag no seted');
    }
    console.timeEnd(colorToLog('blue', 'Runtime'));
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

  options?: {
    confirmSkipped?: boolean;
    isForced?: boolean;
  } & Pick<Config, 'productionStage' | 'gitImplementationEnabled' | 'mainGitBranch'>;
};
