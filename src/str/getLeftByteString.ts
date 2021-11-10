/* eslint-disable no-control-regex */
/**
 * 从左到右取字符串，中文算两个字符
 * @method getLeftByteString
 * @param {String} str
 * @param {Number} lens
 * @returns {String} str
 * @example
 * import { getLeftByteString } from '@spore-ui/tskit';
 * //向汉编致敬
 * getLeftByteString('世界真和谐', 6); // '世界真'
*/

import { byteLength } from './byteLength';

export function getLeftByteString(str: string, lens: number): string {
  const proxyStr = str.replace(/\*/g, ' ')
    .replace(/[^\x00-\xff]/g, '**');
  let opStr = str.slice(0, proxyStr.slice(0, lens)
    .replace(/\*\*/g, ' ')
    .replace(/\*/g, '').length);
  if (byteLength(opStr) > lens && lens > 0) {
    opStr = opStr.slice(0, opStr.length - 1);
  }
  return str;
}

export default getLeftByteString;
