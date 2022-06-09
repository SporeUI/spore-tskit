/**
 * 以闭包机制构建一个条件触发管理器
 * - 条件触发管理器本身是一个函数
 *   - 条件触发管理器作用机制类似 jQuery.ready
 *   - 传入 function 作为条件触发后的回调
 *   - 可接收条件触发函数传递的 1 个参数
 * - 调用条件触发管理器的 done 方法来激活回调条件
 *   - 之前插入管理器的回调函数按队列顺序执行
 *   - 之后插入管理器的回调函数立即执行
 *   - done 方法可接收 1 个参数传给回调方法
 * @module setPrepare
 * @returns {Function} 条件触发管理器函数
 * @example
 * import { setPrepare } from '@spore-ui/tskit';
 * // 生成一个管理器函数 timeReady
 * var timeReady = setPrepare();
 *
 * // 设置条件为2秒后就绪
 * setTimeout(() => {
 *   timeReady.done('ready');
 * }, 2000);
 *
 * // 调用管理器函数 timeReady，插入要执行的任务函数
 * timeReady((str) => {
 *   // 2 秒后输出 1 ready
 *   console.info(1, str);
 * });
 *
 * // 调用管理器函数 timeReady，插入要执行的任务函数
 * timeReady((str) => {
 *   // 2 秒后输出 2 ready
 *   console.info(2, str);
 * });
 *
 * // 2100ms 后执行
 * setTimeout(() => {
 *   // 调用管理器函数 timeReady，插入要执行的任务函数
 *   timeReady((str) => {
 *     // 立即执行，输出 3 ready
 *     console.info(3, str);
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
