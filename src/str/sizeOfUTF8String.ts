/**
 * 取字符串 utf8 编码长度
 * @method sizeOfUTF8String
 * @param {String} str
 * @returns {Number} 字符串长度
 * @example
 * import { sizeOfUTF8String } from '@spore-ui/tskit';
 * sizeOfUTF8String('中文c'); //return 7
*/

function sizeOfUTF8String(str: string): number {
  return (
    typeof Buffer !== 'undefined'
      ? Buffer.from(str, 'utf8').length
      : unescape(encodeURIComponent(str)).length
  );
}

module.exports = sizeOfUTF8String;
