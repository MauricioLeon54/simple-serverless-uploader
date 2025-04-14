import readlineSync from 'readline-sync';
import { colorToLog } from 'src/utils/log/colorToLog';

export function confirmProdStage(projectName: string, prodStageName: string): void {
  const answer = readlineSync.question(colorToLog('red', `\nWARNING you are running a script in the production environment.\n\nType ${prodStageName} to continue\n`));
  if (answer === prodStageName) return;
  console.log(colorToLog('red', `Exiting without releasing ${projectName}!`));
  process.exit(1);
}
