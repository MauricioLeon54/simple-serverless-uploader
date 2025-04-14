export function colorToLog(color: 'red' | 'blue' | 'green', log: string): string {
  const colors = {
    red: '\u001b[31m',
    green: '\u001b[32m',
    blue: '\u001b[34m',
  };
  const reset = '\u001b[0m';

  return `${colors[color]}${log}${reset}`;
}
