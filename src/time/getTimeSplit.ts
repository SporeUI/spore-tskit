/**
 * 获取某个时间的 整年|整月|整日|整时|整分 时间对象
 * @method getTimeSplit
 * @param {Number|Date} time 实际时间
 * @param {String} type 单位时间类型，可选 ['year', 'month', 'week', 'day', 'hour']
 * @returns {Date} 时间整点对象
 * @example
 * import { getTimeSplit } from '@spore-ui/tskit';
 * new Date(
 *   getTimeSplit(
 *     '2018-09-20',
 *     'month'
 *   )
 * ).toGMTString();
 * // Sat Sep 01 2018 00:00:00 GMT+0800 (中国标准时间)
 *
 * new Date(
 *   getTimeSplit(
 *     '2018-09-20 19:23:36',
 *     'hour'
 *   )
 * ).toGMTString();
 * // Thu Sep 20 2018 19:00:00 GMT+0800 (中国标准时间)
 */
import { getUTCDate } from './getUTCDate';
import { TypeDate } from '../types';

const DAY = 24 * 60 * 60 * 1000;

export const TimeUnits = [
  'hour',
  'day',
  'week',
  'month',
  'year',
] as const;

export type TypeTimeUnit = typeof TimeUnits[number];

export function getTimeSplit(
  time: TypeDate,
  type: TypeTimeUnit = 'day',
): Date {
  const localTime = new Date(time).getTime();
  let utcTime = getUTCDate(time);

  // 以周一为起始时间
  let day = utcTime.getDay();
  day = day === 0 ? 6 : day - 1;

  const index = TimeUnits.indexOf(type);
  if (type === 'week') {
    utcTime = new Date(localTime - day * DAY);
  }
  const year = `${utcTime.getUTCFullYear()}`;
  let month = `${utcTime.getUTCMonth() + 1}`;
  let date = `${utcTime.getUTCDate()}`;
  let hour = `${utcTime.getUTCHours()}`;
  let minutes = `${utcTime.getUTCMinutes()}`;

  if (index >= 0) {
    minutes = '00';
  }
  if (index >= 1) {
    hour = '00';
  }
  if (index >= 3) {
    date = '1';
  }
  if (index >= 4) {
    month = '1';
  }

  const str = [
    [year, month, date].join('/'),
    [hour, minutes].join(':'),
  ].join(' ');

  return new Date(str);
}

export default getTimeSplit;
