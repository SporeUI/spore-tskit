import {
  delay,
  setLock,
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
