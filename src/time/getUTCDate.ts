/**
 * 获取一个时间对象，其年月周日时分秒等 UTC 值与北京时间保持一致。
 * 解决不同服务器时区不一致场景下，可能会导致日期计算不一致的问题.
 * @method getUTCDate
 * @param {Number|Date} time 实际时间
 * @return {Date} UTC时间
 * @example
 * import { getUTCDate } from '@spore-ui/tskit';
 * const cnTime = 1540915200000; // (Wed Oct 31 2018 00:00:00 GMT+0800 (中国标准时间))
 * const utcDate = getUTCDate(cnTime).getTime();
 * // 1540886400000 Tue Oct 30 2018 16:00:00 GMT+0800 (中国标准时间)
 * utcDate.getUTCdate(); // 31
 * utcDate.getHours(); // 8
 * utcDate.getUTCHours(); // 0
 */
import { TypeDate } from '../types';

// 北京在东 8 时区
const EIGHT_HOURS = 8 * 3600 * 1000;

export function getUTCDate(time: TypeDate): Date {
  const utcTimeStamp: number = new Date(time).getTime() + EIGHT_HOURS;
  const utcDate = new Date(utcTimeStamp);
  return utcDate;
}

export default getUTCDate;
