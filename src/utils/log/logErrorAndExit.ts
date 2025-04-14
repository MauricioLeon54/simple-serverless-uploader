import { exit } from 'src/utils/exit';
import { logError } from 'src/utils/log/logError';

export function logErrorAndExit(message: string): void {
  logError(message);
  exit();
}
