/**
 * 数字的千分位逗号分隔表示法
 * - IE8 的 toLocalString 给出了小数点后2位: N.00
 * @method commaFormat
 * @see http://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript
 * @param {Number} num 数字
 * @returns {String} 千分位表示的数字
 * @example
 * import { commaFormat } from '@spore-ui/tskit'
 * commaFormat(1234567); // '1,234,567'
 */
export function commaFormat(num: number): string {
  const parts = num.toString().split('.');
  if (parts[0]) {
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
  if (parts[1]) {
    parts[1] = parts[1].replace(/(?:\d{3})/g, '$&,');
  }
  return parts.join('.');
}

export default commaFormat;
