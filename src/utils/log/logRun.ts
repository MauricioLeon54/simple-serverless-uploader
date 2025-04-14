import { colorToLog } from 'src/utils/log/colorToLog';

export function logRun(message: string): void {
  // console.log(chalk.hex('#426aa3')(`❯ ${message}`));
  console.log(colorToLog('blue', `❯ ${message}`));
}
