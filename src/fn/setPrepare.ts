/**
 * 包装为一个条件触发管理器
 * - 调用管理器的 ready 函数来激活条件。
 * - 之前插入管理器的函数按队列顺序执行。
 * - 之后插入管理器的函数立即执行。
 * - 返回的函数作用机制类似 jQuery.ready。
 * - 可以设置任何条件来触发 ready 状态。
 * @module setPrepare
 * @returns {Function} 条件触发管理器函数，传入一个 function 作为任务执行函数参数
 * @example
 * import { setPrepare } from '@spore-ui/tskit';
 * // 生成一个管理器函数 timeReady
 * var timeReady = setPrepare();
 *
 * // 设置条件为2秒后就绪
 * setTimeout(() => {
 *   timeReady.ready();
 * }, 2000);
 *
 * // 调用管理器函数 timeReady，插入要执行的任务函数
 * timeReady(() => {
 *   // 2 秒后输出 1
 *   console.info(1);
 * });
 *
 * // 调用管理器函数 timeReady，插入要执行的任务函数
 * timeReady(() => {
 *   // 2 秒后输出 2
 *   console.info(2);
 * });
 *
 * // 2100ms 后执行
 * setTimeout(() => {
 *   // 调用管理器函数 timeReady，插入要执行的任务函数
 *   timeReady(() => {
 *     // 立即执行，输出 3
 *     console.info(3);
 *   });
 * }, 2100);
 */

/**
 * 激活任务管理器的触发条件，在此之前插入管理器的任务按队列顺序执行，之后插入的任务函数立即执行。
 * @method prepare#ready
 * @memberof prepare
 */

export type TypeReadyFn = {
  done: Function;
  (fn: Function): void;
};

export function setPrepare(): TypeReadyFn {
  const queue: Function[] = [];
  let condition = false;
  let payload: unknown;

  const attampt = (fn: Function) => {
    if (condition) {
      fn(payload);
    } else {
      queue.push(fn);
    }
  };

  attampt.done = (data: unknown) => {
    condition = true;
    payload = data;
    while (queue.length) {
      const fn = queue.shift();
      fn(payload);
    }
  };

  return attampt;
}

export default setPrepare;
