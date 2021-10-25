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
export declare function abToHex(buffer: ArrayBuffer): string;
export default abToHex;
