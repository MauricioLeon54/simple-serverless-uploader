export function forced(): boolean {
  return process.argv.some(arg => arg === '-f' || arg === '--force');
}
