/**
 * 延迟指定时间
 * @method time/delay
 * @param {Number} time 延迟时间(ms)
 * @returns {Promise<undefined>} 时间结束后的回调 Promise
 * @example
 * const fn = async () {
 *   await delay(100);
 *   console.info('100ms 后执行');
 * };
 * fn();
 */
export declare function delay(time: number): Promise<undefined>;
export default delay;
