import { parseRGB } from './parseRGB';

// @see https://zh.wikipedia.org/zh-cn/YUV
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
