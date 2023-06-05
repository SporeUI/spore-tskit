/**
 * 修正小数精度
 * - 解决 0.1 + 0.2 !== 0.3 的问题
 * @method fixAccuracy
 * @param {Number} num 数字
 * @param {Number} [accuracy=10] 精度位数
 * @returns {String} 千分位表示的数字
 * @example
 * import { fixAccuracy } from '@spore-ui/tskit'
 * fixAccuracy(0.1 + 0.2) === 0.3; // true
 * fixAccuracy(0.41 + 0.5) === 0.91 // true
 */
export function fixAccuracy(
  num: number,
  accuracy: number = 10,
): number {
  return parseFloat((num).toFixed(accuracy));
}

export default fixAccuracy;
