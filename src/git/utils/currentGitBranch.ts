import { shellExec } from 'src/utils/shellExec';

export function currentGitBranch(): string {
  const result = shellExec('git rev-parse --abbrev-ref HEAD');
  return result.stdout.trim();
}
