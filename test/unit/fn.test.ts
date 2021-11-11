import {
  delay,
  setLock,
  setPrepare,
  setQueue,
  setRegular,
} from '../../src/index';

describe('fn/setLock', () => {
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

describe('fn/setPrepare', () => {
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

describe('fn/setQueue', () => {
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

describe('fn/setRegular', () => {
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
