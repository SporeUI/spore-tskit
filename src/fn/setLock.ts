import { TypeTimeout } from '../types';

/**
 * 包装为触发一次后，预置时间内不能再次触发的函数
 * - 类似于技能冷却。
 * @method setLock
 * @param {Function} fn 要延迟触发的函数
 * @param {Number} delay 延迟时间(ms)
 * @return {Function} 经过包装的冷却触发函数
 * @example
 * import { setLock } from '@spore-ui/tskit';
 * $('#input').keydown(setLock(() => {
 *   console.info('do request');
 * }, 500));
 * // 第一次按键，就会触发一次函数调用
 * // 之后连续按键，仅在 500ms 结束后再次按键，才会再次触发事件函数调用
 */
export function setLock(
  fn: Function,
  delay: number,
) {
  let timer: TypeTimeout = null;
  return (...args: unknown[]) => {
    if (timer) return;
    timer = setTimeout(() => {
      timer = null;
    }, delay);
    fn(...args);
  };
}

export default setLock;
