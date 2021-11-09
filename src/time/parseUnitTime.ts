/**
 * 时间数字拆分为天时分秒
 * @method parseUnitTime
 * @param {Number} time 毫秒数
 * @param {Object} spec 选项
 * @param {String} [spec.maxUnit='day'] 拆分时间的最大单位，可选 ['day', 'hour', 'minute', 'second']
 * @returns {Object} 拆分完成的天时分秒
 * @example
 * import { parseUnitTime } from '@spore-ui/tskit';
 * console.info( parseUnitTime(12345 * 67890) );
 * // Object {day: 9, hour: 16, minute: 48, second: 22, ms: 50}
 * console.info( parseUnitTime(12345 * 67890, {maxUnit : 'hour'}) );
 * // Object {hour: 232, minute: 48, second: 22, ms: 50}
 */

import { TypeDate } from '../types';

const TimeUnits = {
  day: 24 * 60 * 60 * 1000,
  hour: 60 * 60 * 1000,
  minute: 60 * 1000,
  second: 1000,
} as const;

export type TypeTimeUnit = keyof typeof TimeUnits;

export interface TypeParseUnitTimeOptions {
  maxUnit?: TypeTimeUnit;
}

export interface TypeTimeUnitInfo {
  day: number;
  hour: number;
  minute: number;
  second: number;
  ms: number;
}

export function parseUnitTime(
  time: TypeDate,
  spec: TypeParseUnitTimeOptions,
): TypeTimeUnitInfo {
  const conf: TypeParseUnitTimeOptions = {
    maxUnit: 'day',
    ...spec,
  };

  const data: TypeTimeUnitInfo = {
    day: 0,
    hour: 0,
    minute: 0,
    second: 0,
    ms: 0,
  };

  const maxUnit = Number(TimeUnits[conf.maxUnit]);
  const uDay = TimeUnits.day;
  const uHour = TimeUnits.hour;
  const uMinute = TimeUnits.minute;
  const uSecond = TimeUnits.second;

  let timeValue: number = Number(time);

  if (maxUnit >= uDay) {
    data.day = Math.floor(timeValue / uDay);
  }

  if (maxUnit >= uHour) {
    timeValue -= data.day * uDay;
    data.hour = Math.floor(timeValue / uHour);
  }

  if (maxUnit >= uMinute) {
    timeValue -= data.hour * uHour;
    data.minute = Math.floor(timeValue / uMinute);
  }

  if (maxUnit >= uSecond) {
    timeValue -= data.minute * uMinute;
    data.second = Math.floor(timeValue / uSecond);
  }

  data.ms = timeValue - data.second * uSecond;

  return data;
}

export default parseUnitTime;
