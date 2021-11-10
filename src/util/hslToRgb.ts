/**
 * HSL颜色值转换为RGB
 * - 换算公式改编自 http://en.wikipedia.org/wiki/HSL_color_space.
 * - h, s, 和 l 设定在 [0, 1] 之间
 * - 返回的 r, g, 和 b 在 [0, 255]之间
 * @method util/hslToRgb
 * @param {Number} h 色相
 * @param {Number} s 饱和度
 * @param {Number} l 亮度
 * @return {Array} RGB色值数值
 * @example
 * import { hslToRgb } from '@spore-ui/tskit';
 * hslToRgb(0, 0, 0); // => [0,0,0]
 * hslToRgb(0, 0, 1); // => [255,255,255]
 * hslToRgb(0.5555555555555555, 0.9374999999999999, 0.6862745098039216); // => [100,200,250]
 */

function hueToRgb(p: number, q: number, t: number): number {
  let vt = t;
  if (vt < 0) vt += 1;
  if (vt > 1) vt -= 1;
  if (vt < 1 / 6) return p + (q - p) * 6 * vt;
  if (vt < 1 / 2) return q;
  if (vt < 2 / 3) return p + (q - p) * (2 / 3 - vt) * 6;
  return p;
}

export function hslToRgb(
  h: number,
  s: number,
  l: number,
): number[] {
  let r;
  let g;
  let b;

  if (s === 0) {
    // achromatic
    r = l;
    g = l;
    b = l;
  } else {
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hueToRgb(p, q, h + 1 / 3);
    g = hueToRgb(p, q, h);
    b = hueToRgb(p, q, h - 1 / 3);
  }
  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

export default hslToRgb;
