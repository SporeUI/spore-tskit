/**
 * ArrayBuffer 转 16 进制字符串
 * @method util/abToHex
 * @param {ArrayBuffer} buffer 需要转换的 ArrayBuffer
 * @returns {String} 16进制字符串
 * @example
 * import { abToHex } from '@spore-ui/tskit';
 * const ab = new ArrayBuffer(2);
 * const dv = new DataView(ab);
 * dv.setUint8(0, 171);
 * dv.setUint8(1, 205);
 * abToHex(ab); // => 'abcd'
 */

function iterator(bit: number): string {
  return (`00${bit.toString(16)}`).slice(-2);
}

export function abToHex(buffer: ArrayBuffer): string {
  if (Object.prototype.toString.call(buffer) !== '[object ArrayBuffer]') {
    return '';
  }
  const u8arr = new Uint8Array(buffer);
  return Array.prototype.map.call(u8arr, iterator).join('');
}

export default abToHex;
