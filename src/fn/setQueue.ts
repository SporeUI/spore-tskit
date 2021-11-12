/**
 * 包装为一个队列，按设置的时间间隔触发任务函数
 * - 插入队列的所有函数都会执行，但每次执行之间都会有一个固定的时间间隔。
 * @method setQueue
 * @param {Function} fn 要延迟触发的函数
 * @param {Number} delay 延迟时间(ms)
 * @param {Object} [bind] 函数的 this 指向
 * @returns {Function} 经过包装的队列触发函数
 * @example
 * import { setQueue } from '@spore-ui/tskit';
 * const t1 = Date.now();
 * const doSomthing = setQueue((index) => {
 *   console.info(index + ':' + (Date.now() - t1));
 * }, 200);
 * // 每隔200ms输出一个日志。
 * for(let i = 0; i < 10; i++){
 *   doSomthing(i);
 * }
 */
import { TypeInterval } from '../types';

export function setQueue(fn: Function, delay: number): Function {
  let timer: TypeInterval = null;
  const arr: Function[] = [];
  return (...args: unknown[]) => {
    arr.push(() => {
      if (typeof fn === 'function') {
        fn(...args);
      }
    });
    if (!timer) {
      timer = setInterval(() => {
        if (!arr.length) {
          clearInterval(timer);
          timer = null;
        } else {
          arr.shift()();
        }
      }, delay);
    }
  };
}

export default setQueue;
