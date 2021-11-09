/**
 * 获取过去一段时间的起始日期，如3月前第1天，2周前第1天，3小时前整点
 * @method date/getLastStart
 * @param {Number|Date} time 实际时间
 * @param {String} type 单位时间类型，可选 ['year', 'month', 'week', 'day', 'hour']
 * @param {Number} count 多少单位时间之前
 * @returns {Date} 最近单位时间的起始时间对象
 * @example
 * var $getLastStart = require('@spore-ui/kit/packages/date/getLastStart');
 * var time = $getLastStart(
 *   new Date('2018-10-25'),
 *   'month',
 *   0
 * ).getTime(); // 1538323200000
 * new Date(time); // Mon Oct 01 2018 00:00:00 GMT+0800 (中国标准时间)
 */

import { getUTCDate } from './getUTCDate';
import {
  getTimeSplit,
  TypeTimeUnit,
} from './getTimeSplit';
import { TypeDate } from '../types';

const enum UnitTime {
  HOUR = 60 * 60 * 1000,
  DAY = 24 * 60 * 60 * 1000,
}

export function getLastStartTime(
  time: TypeDate,
  type: TypeTimeUnit,
  count?: number,
): Date {
  const localTime = new Date(time).getTime();
  const utcTime = getUTCDate(time);
  const pastCount = count || 0;

  let stamp = utcTime;
  let year;
  let month;
  let allMonths;
  let unit;

  if (!type) {
    throw new Error('required param type');
  }

  if (type === 'year') {
    year = utcTime.getUTCFullYear();
    year -= pastCount;
    stamp = new Date(`${year}/1/1`);
  } else if (type === 'month') {
    year = utcTime.getUTCFullYear();
    month = utcTime.getUTCMonth();
    allMonths = year * 12 + month - pastCount;
    year = Math.floor(allMonths / 12);
    month = allMonths - year * 12;
    month += 1;
    stamp = new Date(`${year}/${month}/1`);
  } else {
    unit = UnitTime.HOUR;
    if (type === 'day') {
      unit = UnitTime.DAY;
    }
    if (type === 'week') {
      unit = 7 * UnitTime.DAY;
    }
    const newLocalTime = localTime - pastCount * unit;
    stamp = getTimeSplit(newLocalTime, type);
  }

  return stamp;
}

export default getLastStartTime;
