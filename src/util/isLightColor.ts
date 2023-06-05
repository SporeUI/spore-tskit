import { parseRGB } from './parseRGB';

/**
 * 判断颜色是否为浅色
 * @see https://zh.wikipedia.org/zh-cn/YUV
 * @method isLightColor
 * @param {String} color 16进制色值
 * @param {Number} [base=0.6] 深浅判断基准值，取值 [0, 1] 之间的小数
 * @returns {Boolean} 是否为浅色
 * @example
 * import isLightColor from '@spore-ui/tskit';
 * isLightColor('#ffffff'); // => true
 * isLightColor('#000000'); // => false
 */
export function isLightColor(color: string, base = 0.6): boolean {
  let colorIsLight = false;
  try {
    const arrRgb = parseRGB(color);
    const yuvY = (0.299 * arrRgb[0]) + (0.587 * arrRgb[1]) + (0.114 * arrRgb[2]);
    const darkness = (yuvY / 255);
    if (darkness > base) {
      colorIsLight = true;
    }
  } catch (err) {
    colorIsLight = false;
  }
  return colorIsLight;
}

export default isLightColor;
