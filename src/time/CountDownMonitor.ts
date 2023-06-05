import pull from 'lodash/pull';
import {
  TypeTimeout,
} from '../types';

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

export default CountDownMonitor;
