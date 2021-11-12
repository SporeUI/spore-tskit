/* eslint-disable max-classes-per-file */
/**
 * 提供倒计时器统一封装
 * @class CountDown
 * @param {Object} spec 选项
 * @param {Date} [spec.base] 矫正时间(ms)，如果需要用服务端时间矫正倒计时，使用此参数
 * @param {Date} [spec.target=Date.now() + 3000] 目标时间(ms)
 * @param {Number} [spec.interval=1000] 倒计时触发间隔(ms)
 * @param {Function} [spec.onChange] 倒计时触发变更的事件回调
 * @param {Function} [spec.onStop] 倒计时结束的回调
 * @example
 * import { CountDown } from '@spore-ui/tskit';
 * const target = Date.now() + 5000;
 *
 * const cd1 = new CountDown({
 *   target,
 *   onChange(delta) {
 *     console.info('cd1 change', delta);
 *   },
 *   onStop(delta) {
 *     console.info('cd1 stop', delta);
 *   }
 * });
 *
 * setTimeout(() => {
 *   //trigger stop
 *   cd1.stop();
 * }, 2000);
 *
 * const cd2 = new CountDown({
 *   target,
 *   interval: 2000,
 *   onChange(delta) {
 *     console.info('cd2 change', delta);
 *   },
 *   onStop(delta) {
 *     console.info('cd2 stop', delta);
 *   }
 * });
 */

import noop from 'lodash/noop';
import pull from 'lodash/pull';
import {
  TypeDate,
  TypeTimeout,
} from '../types';

export interface TypeCountDownOptions {
  base?: TypeDate;
  target?: TypeDate;
  interval?: number;
  onChange?: (delta: number) => void;
  onStop?: (delta: number) => void;
}

export interface TypeAllMonitors {
  [key: string]: CountDownMonitor;
}

export const allMonitors: TypeAllMonitors = {};
export const localBaseTime = Date.now();

export class CountDownMonitor {
  queue: Function[];

  timer: TypeTimeout;

  timeInterval: number;

  constructor(timeInterval: number) {
    this.queue = [];
    this.timer = null;
    this.timeInterval = timeInterval;
  }

  inspect() {
    const now = Date.now();
    const localDelta = now - localBaseTime;

    if (this.queue.length > 0) {
      this.queue.forEach((fn) => {
        fn(localDelta);
      });
    } else {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  start() {
    const { timeInterval } = this;
    if (!this.timer) {
      this.timer = setInterval(
        this.inspect.bind(this),
        timeInterval,
      );
    }
  }

  add(fn: Function) {
    this.queue.push(fn);
    this.start();
  }

  remove(fn: Function) {
    pull(this.queue, fn);
  }
}

export class CountDown {
  conf: TypeCountDownOptions;

  timeDiff: number;

  target: number;

  interval: number;

  timeInterval: number;

  monitor: CountDownMonitor;

  delta: number;

  curUnit: number;

  boundCheck: (localDelta: number) => void;

  constructor(spec: TypeCountDownOptions) {
    // 早先有提供 timeLeft 参数，其为本地与客户端的时间差
    // 为什么不使用 timeLeft 参数替换 base 和 target:
    // 如果用 timeLeft 作为参数，计时器初始化之前如果有进程阻塞，有可能会导致与目标时间产生误差
    // 页面多个定时器一起初始化时，会出现计时器更新不同步的现象，同时引发页面多处没有一起回流
    // 保留目前这个方案，用于需要精确倒计时的情况
    this.conf = {
      base: null,
      target: Date.now() + 3000,
      interval: 1000,
      onChange: noop,
      onStop: noop,
      ...spec,
    };
    const { conf } = this;
    this.timeDiff = 0;
    this.interval = conf.interval || 0;
    this.delta = 0;
    this.curUnit = 0;
    this.timeInterval = 0;
    this.monitor = null;

    this.boundCheck = this.check.bind(this);
    this.start();
  }

  start() {
    const { conf } = this;
    this.setTarget(conf.target);
    if (conf.base) {
      this.correct(conf.base);
    }
    this.inspect();
  }

  inspect() {
    const { interval } = this;

    // 使倒计时触发时间精确化
    // 使用固定的触发频率，减少需要创建的定时器
    let timeInterval = interval;
    if (timeInterval < 300) {
      timeInterval = 10;
    } else if (timeInterval < 3000) {
      timeInterval = 100;
    } else {
      timeInterval = 1000;
    }
    this.timeInterval = timeInterval;

    const prop = `${timeInterval}`;
    let monitor = allMonitors[prop];
    if (!monitor) {
      monitor = new CountDownMonitor(timeInterval);
      allMonitors[prop] = monitor;
    }
    this.monitor = monitor;
    monitor.add(this.boundCheck);
  }

  update(now: number) {
    const {
      target,
      interval,
      curUnit,
      conf,
    } = this;

    this.delta = target - now;
    // 用一个更小的时间间隔来触发检查
    // 然后检测到单位间隔时间变更时再触发更新事件
    // 这样是为了解决跳秒现象
    const unit = Math.ceil(this.delta / interval);
    if (unit !== curUnit) {
      this.curUnit = unit;
      if (typeof conf.onChange === 'function') {
        conf.onChange(this.delta);
      }
    }
  }

  /**
    * 重设目标时间
    * @method CountDown#setTarget
    * @memberof CountDown
    * @example
    * const cd = new CountDown();
    * const localTime = '2019/01/01';
    * cd.setTarget(serverTime);
    */
  setTarget(time: TypeDate) {
    this.target = new Date(time).getTime();
  }

  /**
    * 纠正时间差
    * @method CountDown#correct
    * @memberof CountDown
    * @example
    * const cd = new CountDown();
    * const serverTime = '2019/01/01';
    * const localTime = '2020/01/01';
    * cd.correct(serverTime);
    * cd.correct(serverTime, localTime);
    */
  correct(serverTime: TypeDate, localTime?: TypeDate) {
    const now = localTime ? new Date(localTime).getTime() : new Date().getTime();
    const serverDate = serverTime ? new Date(serverTime).getTime() : now;
    if (serverDate) {
      this.timeDiff = serverDate - now;
    }
  }

  check(localDelta: number) {
    const { timeDiff } = this;
    const now = localBaseTime + timeDiff + localDelta;
    this.update(now);
    if (this.delta <= 0) {
      this.stop();
    }
  }

  /**
    * 停止倒计时
    * @method CountDown#stop
    * @memberof CountDown
    * @example
    * const cd = new CountDown();
    * cd.stop();
    */
  stop() {
    const {
      conf,
      delta,
    } = this;
    if (this.monitor) {
      this.monitor.remove(this.boundCheck);
    }
    // onStop事件触发必须在从队列移除回调之后
    // 否则循环接替的定时器会引发死循环
    if (typeof conf.onStop === 'function') {
      conf.onStop(delta);
    }
  }

  /**
    * 销毁倒计时
    * @method CountDown#destroy
    * @memberof CountDown
    * @example
    * const cd = CountDown();
    * cd.destroy();
    */
  destroy() {
    const { conf } = this;
    conf.onChange = null;
    conf.onStop = null;
    this.stop();
  }
}

export default CountDown;
