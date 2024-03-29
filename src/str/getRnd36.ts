/**
 * 获取36进制随机字符串
 * @method getRnd36
 * @param {Float} [rnd] 随机数，不传则生成一个随机数
 * @return {String} 转成为36进制的字符串
 * @example
 * import { getRnd36 } from '@spore-ui/tskit';
 * getRnd36(0.5810766832590446); // 'kx2pozz9rgf'
 */
export function getRnd36(rnd?: number): string {
  const rndigit = rnd || Math.random();
  return rndigit.toString(36).replace(/^0./, '');
}

export default getRnd36;
