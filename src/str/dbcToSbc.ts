/**
 * 全角字符转半角字符
 * @method dbcToSbc
 * @param {String} str 包含了全角字符的字符串
 * @return {String} 经过转换的字符串
 * @example
 * import { dbcToSbc } from '@spore-ui/tskit';
 * dbcToSbc('ＳＡＡＳＤＦＳＡＤＦ'); // 'SAASDFSADF'
 */

export function dbcToSbc(str: string): string {
  return str.replace(
    (/[\uff01-\uff5e]/g),
    (a: string): string => (String.fromCharCode(a.charCodeAt(0) - 65248)),
  ).replace(/\u3000/g, ' ');
}

export default dbcToSbc;
