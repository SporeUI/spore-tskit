/**
 * 16进制字符串转ArrayBuffer
 * @method hexToAb
 * @see https://caniuse.com/#search=ArrayBuffer
 * @param {String} str 需要转换的16进制字符串
 * @return {ArrayBuffer} 被转换后的 ArrayBuffer 对象
 * @example
 * import { hexToAb } from '@spore-ui/tskit';
 * var ab = hexToAb();
 * ab.byteLength; // => 0
 * ab = hexToAb('abcd');
 * var dv = new DataView(ab);
 * ab.byteLength; // => 2
 * dv.getUint8(0); // => 171
 * dv.getUint8(1); // => 205
 */

export function hexToAb(str: string): ArrayBuffer {
  if (!str) {
    return new ArrayBuffer(0);
  }
  const buffer = new ArrayBuffer(Math.ceil(str.length / 2));
  const dataView = new DataView(buffer);
  let index = 0;
  let i;
  const len = str.length;
  for (i = 0; i < len; i += 2) {
    const code = parseInt(str.substr(i, 2), 16);
    dataView.setUint8(index, code);
    index += 1;
  }
  return buffer;
}

export default hexToAb;
