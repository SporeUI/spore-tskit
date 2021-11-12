/**
 * 包装为规律触发的函数，用于降低密集事件的处理频率
 * - 在疯狂操作期间，按照规律时间间隔，来调用任务函数
 * @method setRegular
 * @param {Function} fn 要延迟触发的函数
 * @param {Number} delay 延迟时间(ms)
 * @param {Object} [bind] 函数的 this 指向
 * @return {Function} 经过包装的定时触发函数
 * @example
 * import { setRegular } from '@spore-ui/tskit';
 * const comp = {
 *   countWords() {
 *     console.info(this.length);
 *   }
 * };
 * comp.regularCount = setRegular(comp.countWords.bind(comp), 200);
 * // 疯狂按键，每隔 200ms 才有一次按键有效
 * $('#input').keydown(() => {
 *   comp.length = $('#input').val().length;
 *   comp.regularCount();
 * }));
 */

import { TypeInterval } from '../types';

export function setRegular(fn: Function, delay: number): Function {
  let enable = true;
  let timer: TypeInterval = null;
  return (...args: unknown[]) => {
    enable = true;
    if (!timer) {
      timer = setInterval(() => {
        if (typeof fn === 'function') {
          fn(...args);
        }
        if (!enable) {
          clearInterval(timer);
          timer = null;
        }
        enable = false;
      }, delay);
    }
  };
}

export default setRegular;
