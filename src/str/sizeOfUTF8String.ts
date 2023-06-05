/**
 * 取字符串 utf8 编码长度
 * @method sizeOfUTF8String
 * @param {String} str
 * @return {Number} 字符串长度
 * @example
 * import { sizeOfUTF8String } from '@spore-ui/tskit';
 * sizeOfUTF8String('中文c'); //return 7
*/
export function sizeOfUTF8String(str: string): number {
  const len = str.length;
  let reLen = 0;
  for (let i = 0; i < len; i += 1) {
    if (str.charCodeAt(i) < 27 || str.charCodeAt(i) > 126) {
      // 全角
      reLen += 2;
    } else {
      reLen += 1;
    }
  }
  return reLen;
}

export default sizeOfUTF8String;
