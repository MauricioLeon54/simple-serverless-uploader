import { colorToLog } from 'src/utils/log/colorToLog';

export function logInfo(message: string): void {
  console.log(colorToLog('blue', `ℹ️  ${message}`));
}
