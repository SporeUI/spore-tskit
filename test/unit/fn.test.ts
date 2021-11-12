import {
  delay,
  setLock,
  setPrepare,
  setPromiseCache,
  setQueue,
  setRegular,
} from '../../src/index';

describe('setLock', () => {
  test('冷却状态下函数不执行', async () => {
    let num = 0;
    const fn = setLock(() => {
      num += 1;
    }, 10);
    fn();
    setTimeout(fn, 1);
    await delay(30);
    expect(num).toBe(1);
    fn();
    expect(num).toBe(2);
  });
});

describe('setPrepare', () => {
  test('函数会在条件就绪后顺序执行', async () => {
    const arr: number[] = [];
    const ready = setPrepare();
    ready(() => {
      arr.push(1);
    });
    ready(() => {
      arr.push(2);
    });
    expect(arr.length).toBe(0);
    await delay(10);
    ready.done();
    ready(() => {
      arr.push(3);
    });
    expect(arr.length).toBe(3);
    expect(arr[0]).toBe(1);
    expect(arr[1]).toBe(2);
    expect(arr[2]).toBe(3);
  });
});

describe('setPromiseCache', () => {
  test('函数在回调前会缓存执行结果', async () => {
    let index = 0;
    const increase = () => new Promise((resolve) => {
      setTimeout(() => {
        index += 1;
        resolve(index);
      }, 10);
    });
    const cacheIncrease = setPromiseCache(increase);
    const pm1 = cacheIncrease();
    const pm2 = cacheIncrease();
    const rs1 = await pm1;
    const rs2 = await pm2;
    expect(rs1).toBe(1);
    expect(rs2).toBe(1);
  });

  test('默认回调结束后，会丢弃缓存结果', async () => {
    let index = 0;
    const increase = () => new Promise((resolve) => {
      setTimeout(() => {
        index += 1;
        resolve(index);
      }, 10);
    });
    const cacheIncrease = setPromiseCache(increase);
    const rs1 = await cacheIncrease();
    const rs2 = await cacheIncrease();
    expect(rs1).toBe(1);
    expect(rs2).toBe(2);
  });

  test('函数在指定时间内会缓存执行结果', async () => {
    let index = 0;
    const increase = () => new Promise((resolve) => {
      setTimeout(() => {
        index += 1;
        resolve(index);
      }, 10);
    });
    const cacheIncrease = setPromiseCache(increase, 50);
    const rs1 = await cacheIncrease();
    const rs2 = await cacheIncrease();
    expect(rs1).toBe(1);
    expect(rs2).toBe(1);
    await delay(100);
    const rs3 = await cacheIncrease();
    const rs4 = await cacheIncrease();
    expect(rs3).toBe(2);
    expect(rs4).toBe(2);
  });
});

describe('setQueue', () => {
  test('队列函数会按顺序执行', async () => {
    let num = 0;
    const fn = setQueue(() => {
      num += 1;
    }, 50);
    fn();
    fn();
    expect(num).toBe(0);
    await delay(60);
    expect(num).toBe(1);
    await delay(60);
    expect(num).toBe(2);
    await delay(60);
  });
});

describe('setRegular', () => {
  test('函数只会按固定频率被触发', async () => {
    let num = 0;
    const fn = setRegular(() => {
      num += 1;
    }, 50);
    const timer = setInterval(() => {
      fn();
    }, 10);
    await delay(120);
    clearInterval(timer);
    expect(num).toBe(2);
    await delay(50);
  });
});
