/**
 * rgb字符串解析
 * - 返回的 r, g, 和 b 在 [0, 255]之间
 * @see http://en.wikipedia.org/wiki/HSL_color_space
 * @method parseRGB
 * @param {String} color 16进制色值
 * @returns {Array} RGB色值数值
 * @example
 * import parseRGB from '@spore-ui/tskit';
 * parseRGB('#ffffff'); // => [255,255,255]
 * parseRGB('#fff'); // => [255,255,255]
 */

const REG_HEX = /(^#?[0-9A-F]{6}$)|(^#?[0-9A-F]{3}$)/i;

export function parseRGB(color: string): number[] {
  let str = color;
  if (typeof str !== 'string') {
    throw new Error('Color should be string');
  }
  if (!REG_HEX.test(str)) {
    throw new Error('Wrong RGB color format');
  }

  str = str.replace('#', '');
  let arr = [];
  if (str.length === 3) {
    arr = str.split('').map((c: string) => (c + c));
  } else {
    arr = str.match(/[a-fA-F0-9]{2}/g);
  }
  arr.length = 3;
  return arr.map((c) => parseInt(c, 16));
}

export default parseRGB;
