/**
 * 全角字符转半角字符
 * @method str/dbcToSbc
 * @param {String} str 包含了全角字符的字符串
 * @returns {String} 经过转换的字符串
 * @example
 * import { dbcToSbc } from '@spore-ui/tskit';
 * dbcToSbc('ＳＡＡＳＤＦＳＡＤＦ'); // 'SAASDFSADF'
 */
export declare function dbcToSbc(str: string): string;
export default dbcToSbc;
