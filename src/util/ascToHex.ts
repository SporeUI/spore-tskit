/**
 * ASCII字符串转16进制字符串
 * @method ascToHex
 * @param {String} str 需要转换的ASCII字符串
 * @return {String} 16进制字符串
 * @example
 * import { ascToHex } from '@spore-ui/tskit';
 * ascToHex(); // => ''
 * ascToHex('*+'); // => '2a2b'
 */

export function ascToHex(str: string): string {
  if (!str) {
    return '';
  }
  let hex = '';
  let index;
  const len = str.length;
  for (index = 0; index < len; index += 1) {
    const int = str.charCodeAt(index);
    const code = (int).toString(16);
    hex += code;
  }
  return hex;
}

export default ascToHex;
