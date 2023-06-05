/**
 * RGB 颜色值转换为 HSL.
 * - r, g, 和 b 需要在 [0, 255] 范围内
 * - 返回的 h, s, 和 l 在 [0, 1] 之间
 * @see http://en.wikipedia.org/wiki/HSL_color_space
 * @method rgbToHsl
 * @param {Number} r 红色色值
 * @param {Number} g 绿色色值
 * @param {Number} b 蓝色色值
 * @return {Array} HSL各值数组
 * @example
 * import { rgbToHsl } from '@spore-ui/tskit';
 * rgbToHsl(100, 200, 250); // => [0.5555555555555555,0.9374999999999999,0.6862745098039216]
 * rgbToHsl(0, 0, 0); // => [0,0,0]
 * rgbToHsl(255, 255, 255); // => [0,0,1]
 */

export function rgbToHsl(
  rv: number,
  gv: number,
  bv: number,
): number[] {
  const r = rv / 255;
  const g = gv / 255;
  const b = bv / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h;
  let s;
  const l = (max + min) / 2;

  if (max === min) {
    // achromatic
    h = 0;
    s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    if (max === r) {
      h = (g - b) / d + (g < b ? 6 : 0);
    } else if (max === g) {
      h = (b - r) / d + 2;
    } else {
      h = (r - g) / d + 4;
    }
    h /= 6;
  }

  return [h, s, l];
}

export default rgbToHsl;
