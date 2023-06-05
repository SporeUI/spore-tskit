export type TypePromiseFn = (...args: any[]) => Promise<any>;

/**
 * 包装为一个缓存函数，限定时间内，返回之前执行的 Promise 结果
 * - 默认在回调执行前多次请求时，返回第一个回调结果
 * - 可实现基于 Promise 机制的防抖能力。
 * @method setPromiseCache
 * @param {Function} fn 返回 Promise 对象的函数
 * @param {Number} cacheTime 数据缓存时间(ms)，传负值则为永久缓存
 * @returns {Function} 经过包装的函数
 * @example
 * import { setPromiseCache } from '@spore-ui/tskit';
 * let index = 0;
 * const increase = () => new Promise(resolve => {
 *   setTimeout(() => {
 *     index += 1;
 *     resolve(index);
 *   }, 10);
 * });
 * const cacheIncrease = setPromiseCache(increase);
 * const exec = async () => {
 *   const rs = await cacheIncrease();
 *   console.info(rs);
 * };
 * exec(); // 1
 * exec(); // 1
 */
export function setPromiseCache<T extends TypePromiseFn>(
  fn: T,
  cacheTime: number = 0,
): T {
  let pm: Promise<any> = null;
  let startTime: number = null;
  return (async (...args: any[]) => {
    let rs = null;
    const now = new Date().getTime();
    if (
      cacheTime >= 0
      && (now - startTime) > cacheTime
    ) {
      pm = null;
    }
    if (!pm) {
      startTime = new Date().getTime();
      pm = fn(...args);
    }
    rs = await pm;
    return rs;
  }) as T;
}

export default setPromiseCache;
