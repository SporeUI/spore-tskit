/**
 * 16进制字符串转ASCII字符串
 * @method hexToAsc
 * @param {String} str 需要转换的16进制字符串
 * @return {String} ASCII字符串
 * @example
 * import { hexToAsc } from '@spore-ui/tskit';
 * $hexToAsc(); // => ''
 * $hexToAsc('2a2b'); // => '*+'
 */

export function hexToAsc(hex: string): string {
  if (!hex) {
    return '';
  }
  return hex.replace(/[\da-f]{2}/gi, (match) => {
    const int = parseInt(match, 16);
    return String.fromCharCode(int);
  });
}

export default hexToAsc;
