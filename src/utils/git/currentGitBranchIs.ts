import { shellExec } from 'src/utils/shellExec';

export function currentGitBranchIs(value: string): boolean {
  const result = shellExec('git rev-parse --abbrev-ref HEAD');
  return new RegExp(`^${value}$`, 'm').test(result.stdout);
}
