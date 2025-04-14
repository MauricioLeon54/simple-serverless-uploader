import { shellExec } from 'src/utils/shellExec';
import { isBlankString } from 'src/utils/string/isBlankString';

export function thereAreFilesToCommit(): boolean {
  const result = shellExec('git status -s');
  return !isBlankString(result.stdout);
}
