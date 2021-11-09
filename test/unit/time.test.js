import {
  formatDate,
  getLastStartTime,
  getTimeSplit,
  parseUnitTime,
} from '../../src/index';

describe('time/formatDate', () => {
  test('format(1540915200000) => "2018-10-31 00:00"', () => {
    const str = formatDate(1540915200000);
    expect(str).toBe('2018-10-31 00:00');
  });
});

describe('time/getLastStartTime', () => {
  test('必须传递 type 参数', () => {
    let hasError = false;
    try {
      getLastStartTime(new Date('2018-10-25'));
    } catch (err) {
      hasError = true;
    }
    expect(hasError).toBe(true);
  });
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

describe('time/getTimeSplit', () => {
  test('必须传递 type 参数', () => {
    let hasError = false;
    try {
      getTimeSplit(new Date('2018-10-25'));
    } catch (err) {
      hasError = true;
    }
    expect(hasError).toBe(true);
  });
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

describe('time/parseUnitTime', () => {
  test('parseUnitTime(12345 * 67890).day => 9', () => {
    const udate = parseUnitTime(12345 * 67890);
    expect(udate.day).toBe(9);
    expect(udate.hour).toBe(16);
    expect(udate.minute).toBe(48);
    expect(udate.second).toBe(22);
    expect(udate.ms).toBe(50);
  });
});
