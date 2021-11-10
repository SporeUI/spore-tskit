/* eslint-disable no-control-regex */
/**
 * 从左到右取字符串，中文算两个字符
 * @method getLeftByteString
 * @param {String} str
 * @param {Number} lens
 * @return {String} str
 * @example
 * import { getLeftByteString } from '@spore-ui/tskit';
 * //向汉编致敬
 * getLeftByteString('世界真和谐', 6); // '世界真'
*/

import { byteLength } from './byteLength';

export function getLeftByteString(str: string, lens: number): string {
  const proxyStr = str.replace(/\*/g, ' ')
    .replace(/[^\x00-\xff]/g, '**');
  const proxyLength = proxyStr.slice(0, lens)
    .replace(/\*\*/g, ' ')
    .replace(/\*/g, '').length;
  let rs = str.slice(0, proxyLength);
  if (byteLength(rs) > lens && lens > 0) {
    rs = rs.slice(0, rs.length - 1);
  }
  return rs;
}

export default getLeftByteString;
