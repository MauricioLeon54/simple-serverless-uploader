import shell from 'shelljs';
import { logRun } from 'src/utils/log/logRun';

export function shellExec(command: string, options: { silent?: boolean } = {}): { stdout: string } {
  logRun(command);
  const result = shell.exec(command, options);
  if (result.code !== 0) throw Error(`shellExec(${command}) failed to run`);
  return result;
}
