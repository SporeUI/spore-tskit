import {
  delay,
  formatDate,
  getLastStartTime,
  getTimeSplit,
  parseUnitTime,
  CountDown,
} from '../../src/time/index';

describe('formatDate', () => {
  test('format(1540915200000) => "2018-10-31 00:00"', () => {
    const str = formatDate(1540915200000);
    expect(str).toBe('2018-10-31 00:00');
  });
  test('format(1540915200000) => "2018-10-31 00:00"', () => {
    const str = formatDate(1540915200000, {
      render(rs) {
        return `${rs.YYYY}/${rs.MM}/${rs.DD} 周${rs.d}`;
      },
    });
    expect(str).toBe('2018/10/31 周三');
  });
});

describe('getLastStartTime', () => {
  test('2018-10-25 12:43:12 当天时间戳', () => {
    const time = getLastStartTime(
      new Date('2018-10-25 12:43:12'),
      'day',
    ).getTime();
    const expectTime = new Date('2018-10-25 00:00').getTime();
    expect(time).toBe(expectTime);
  });
  test('2018-10-25 12:43:12 昨天时间戳', () => {
    const time = getLastStartTime(
      new Date('2018-10-25 12:43:12'),
      'day',
      1,
    ).getTime();
    const expectTime = new Date('2018-10-24 00:00').getTime();
    expect(time).toBe(expectTime);
  });
  test('2018-10-25 当周周一时间戳', () => {
    const time = getLastStartTime(
      new Date('2018-10-25'),
      'week',
    ).getTime();
    const expectTime = new Date('2018-10-22 00:00').getTime();
    expect(time).toBe(expectTime);
  });
  test('2018-10-25 当月第1天时间戳', () => {
    const time = getLastStartTime(
      new Date('2018-10-25'),
      'month',
    ).getTime();
    const expectTime = new Date('2018-10-1').getTime();
    expect(time).toBe(expectTime);
  });
  test('2018-10-25 当年第一天时间戳', () => {
    const time = getLastStartTime(
      new Date('2018-10-25'),
      'year',
    ).getTime();
    const expectTime = new Date('2018-1-1 00:00').getTime();
    expect(time).toBe(expectTime);
  });
});

describe('getTimeSplit', () => {
  test('2018-10-25 当月第1天时间戳', () => {
    const time = getTimeSplit(
      '2018-10-25',
      'month',
    ).getTime();
    const expectTime = new Date('2018-10-1 00:00').getTime();
    expect(time).toBe(expectTime);
  });
  test('2018-10-25 当年第1天时间戳', () => {
    const time = getTimeSplit(
      '2018-10-25',
      'year',
    ).getTime();
    const expectTime = new Date('2018-1-1 00:00').getTime();
    expect(time).toBe(expectTime);
  });
});

describe('parseUnitTime', () => {
  test('parseUnitTime(12345 * 67890).day => 9', () => {
    const udate = parseUnitTime(12345 * 67890);
    expect(udate.day).toBe(9);
    expect(udate.hour).toBe(16);
    expect(udate.minute).toBe(48);
    expect(udate.second).toBe(22);
    expect(udate.ms).toBe(50);
  });
});

describe('CountDown', () => {
  test('提供定时触发能力', (done) => {
    const target = Date.now() + 150;
    let step = 0;
    const cd = new CountDown({
      target,
      interval: 50,
      onChange(delta) {
        expect(typeof delta).toBe('number');
        step += 1;
      },
      onStop(delta) {
        expect(step).toBe(4);
        expect(delta).toBeLessThanOrEqual(0);
        setTimeout(() => {
          expect(cd.monitor.timer).toBe(null);
          done();
        }, 100);
      },
    });
  });

  test('定时器可提前终止', (done) => {
    const target = Date.now() + 250;
    let step = 0;
    const cd = new CountDown({
      target,
      interval: 50,
      onChange(delta) {
        expect(typeof delta).toBe('number');
        step += 1;
      },
      onStop(delta) {
        expect(step).toBe(3);
        expect(delta).toBeGreaterThanOrEqual(100);
        done();
      },
    });
    setTimeout(() => {
      cd.stop();
    }, 120);
  });

  test('销毁定时器，不会执行后续回调', (done) => {
    const target = Date.now() + 250;
    let step = 0;
    let stopCalled = false;
    const cd = new CountDown({
      target,
      interval: 50,
      onChange(delta) {
        expect(typeof delta).toBe('number');
        step += 1;
      },
      onStop() {
        stopCalled = true;
      },
    });
    setTimeout(() => {
      cd.destroy();
      setTimeout(() => {
        expect(step).toBe(3);
        expect(stopCalled).toBe(false);
        done();
      }, 50);
    }, 120);
  });

  test('设置服务器时间可以校准定时器', (done) => {
    const target = Date.now() + 150;
    let step = 0;
    const cd = new CountDown({
      base: Date.now() + 60,
      target,
      interval: 50,
      onChange() {
        step += 1;
      },
      async onStop() {
        expect(step).toBe(3);
        await delay(100);
        expect(cd.monitor.timer).toBe(null);
        done();
      },
    });
  });

  test('可重设目标时间', (done) => {
    let step = 0;
    const now = Date.now();
    const target1 = now + 150;
    const target2 = now + 250;
    const cd = new CountDown({
      target: target1,
      interval: 50,
      onChange() {
        step += 1;
      },
      onStop() {
        expect(step).toBe(6);
        done();
      },
    });
    setTimeout(() => {
      cd.setTarget(target2);
    }, 50);
  });
});
