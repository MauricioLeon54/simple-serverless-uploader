import type { DeploymentType } from 'src/constants/DeploymentType';
import type { Config } from 'src/types/Config';
import { confirmProdStage } from 'src/utils/confirm/confirmProdStage';
import { forced } from 'src/utils/forced';
import { currentGitBranchIs } from 'src/utils/git/currentGitBranchIs';
import { thereAreFilesToCommit } from 'src/utils/git/thereAreFilesToCommit';
import { thereAreRemoteChanges } from 'src/utils/git/thereAreRemoteChanges';
import { colorToLog } from 'src/utils/log/colorToLog';
import { logErrorAndExit } from 'src/utils/log/logErrorAndExit';
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

    const isProductionStage = request.stage === (request.options?.productionStage || 'prod');

    const isGitImplementationEnabled = request.options?.gitImplementationEnabled;
    const mainBranchName = request.options?.mainGitBranch || 'main';

    if (isProductionStage && !request.options?.confirmSkipped) confirmProdStage(request.projectName, request.options?.productionStage || 'prod');
    console.time(colorToLog('blue', 'Runtime'));

    if (isGitImplementationEnabled && !currentGitBranchIs('main') && !request.options?.isForced) {
      logErrorAndExit(`You can only release to ${request.options?.productionStage || 'prod'} from the main branch!`);
    }

    if (thereAreFilesToCommit() && !request.options?.isForced) logErrorAndExit('There are uncommitted files, commit files before running script!');

    if (thereAreFilesToCommit() && !forced()) logErrorAndExit('There are uncommitted files, commit files before running script!');
    if (thereAreRemoteChanges() && !forced()) logErrorAndExit('There are remote changes not pulled or local changes not pushed, make sure to git pull changes before running script!');

    shellExec('yarn');
    if (thereAreFilesToCommit() && !forced()) logErrorAndExit('yarn resulted in changes, commit and try again!');
    if (thereAreFilesToCommit() && !forced()) logErrorAndExit('There are appsync graphql generated file changes, commit and try again!');
    if (!forced()) shellExec('yarn lint');
    if (!forced()) shellExec('yarn typescript');

    const userName = shellExec('git config user.name').stdout;
    const userEmail = shellExec('git config user.email').stdout;
    // setAppVersion(incrementSemVersion(ReleaseTypes.PATCH, environment), environment);
    // shellExec(`git add . && git commit -n -m "Build ${environment} | ${actualAppVersion} | ${buildTime}" && git push`)
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
