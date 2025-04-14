import { isString } from 'src/utils/string/isString';

export function isBlankString(value: string): boolean;
export function isBlankString(value: any): false;

export function isBlankString(value: any): boolean {
  if (!value) {
    return true;
  }
  if (!isString(value)) {
    return false;
  }
  return value.trim() === '';
}
