import { shellExec } from 'src/utils/shellExec';

export function thereAreRemoteChanges(): boolean {
  const result = shellExec('git status -uno');
  return !new RegExp('^Your branch is up to date with ', 'm').test(result.stdout);
}
