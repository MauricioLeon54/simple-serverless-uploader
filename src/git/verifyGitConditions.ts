import { currentGitBranchIs } from 'src/utils/git/currentGitBranchIs';
import { thereAreFilesToCommit } from 'src/utils/git/thereAreFilesToCommit';
import { thereAreRemoteChanges } from 'src/utils/git/thereAreRemoteChanges';
import { logErrorAndExit } from 'src/utils/log/logErrorAndExit';

export async function verifyGitConditions({ mainBranch, isProduction, productionStageName }: VerifyGitConditionsRequest) {
  if (isProduction && !currentGitBranchIs(mainBranch)) {
    logErrorAndExit(`You can only release to ${productionStageName} from the main branch!`);
  }

  if (thereAreFilesToCommit()) logErrorAndExit('There are uncommitted files, commit files before running script!');
  if (thereAreFilesToCommit()) logErrorAndExit('There are uncommitted files, commit files before running script!');
  if (thereAreRemoteChanges()) logErrorAndExit('There are remote changes not pulled or local changes not pushed, make sure to git pull changes before running script!');
}

type VerifyGitConditionsRequest = {
  mainBranch: string;
  isProduction?: boolean;
  productionStageName: string;
};
