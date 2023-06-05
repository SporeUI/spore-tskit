/**
 * 延迟指定时间
 * @method delay
 * @param {Number} time 延迟时间(ms)
 * @return {Promise<void>} 时间结束后的回调 Promise
 * @example
 * import { delay } from '@spore-ui/tskit';
 * const fn = async () {
 *   await delay(100);
 *   console.info('100ms 后执行');
 * };
 * fn();
 */
export function delay(time: number): Promise<void> {
  return new Promise((resolve: Function) => {
    setTimeout(resolve, time);
  });
}

export default delay;
