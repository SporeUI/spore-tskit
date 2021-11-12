/**
 * 包装为一个队列执行函数，同时发起操作后，会按顺序逐个完成回调
 * @method fn/setPromiseQueue
 * @param {Function} fn 返回 Promise 对象的函数
 * @param {Number} cacheTime 数据缓存时间(ms)，传负值则为永久缓存
 * @param {Object} [bind] 函数的 this 指向
 * @returns {Function} 经过包装的函数
 * @example
 * import { setPromiseQueue } from '@spore-ui/tskit';
 * let index = 0;
 * const increase = () => new Promise(resolve => {
 *   setTimeout(() => {
 *     index += 1;
 *     resolve(index);
 *   }, 10);
 * });
 * const cacheIncrease = setPromiseQueue(increase);
 * const exec = async () => {
 *   const rs = await cacheIncrease();
 *   console.info(rs);
 * };
 * exec(); // 1
 * exec(); // 1
 */
