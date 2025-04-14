import readlineSync from 'readline-sync';
import { colorToLog } from 'src/utils/log/colorToLog';

export function confirmProd(projectName: string): void {
  const answer = readlineSync.question(colorToLog('red', '\nWARNING you are running a script in the production environment.\n\nType prod to continue\n'));
  if (answer !== 'prod') {
    console.log(colorToLog('red', `Exiting without releasing ${projectName}!`));
    process.exit(1);
  }
}
