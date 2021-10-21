/**
 * 获取字符串长度，一个中文算2个字符
 * @method str/byteLength
 * @param {String} str 要计算长度的字符串
 * @returns {Number} 字符串长度
 * @example
 * import { byteLength } from '@spore-ui/tskit';
 * byteLength('中文cc'); // 6
 */

export function byteLength(str: string): number {
  var aMatch;
  if (!str) {
    return 0;
  }
  aMatch = str.match(/[^\x00-\xff]/g);
  return (str.length + (!aMatch ? 0 : aMatch.length));
}
