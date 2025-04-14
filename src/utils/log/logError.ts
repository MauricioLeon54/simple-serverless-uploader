import { colorToLog } from 'src/utils/log/colorToLog';

export function logError(message: string): void {
  console.log(colorToLog('red', `❌️  ${message}`));
}
