export function confirmSkipped(): boolean {
  return process.argv.some(arg => arg === '-sc' || arg === '--skipConfirm');
}
