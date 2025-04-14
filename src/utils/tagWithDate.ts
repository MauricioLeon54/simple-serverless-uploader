import moment from 'moment-timezone';

export function tagWithDate(tag: string): string {
  const dateTime = moment.tz('America/Monterrey').format('YYYY-MM-DD_HH.mm');
  return `${tag}-${dateTime}`;
}
