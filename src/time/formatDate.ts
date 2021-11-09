/**
 * 日期对象格式化输出
 *
 * 格式化日期对象模板键值说明
 * - year 年份原始数值
 * - month 月份原始数值[1, 12]
 * - date 日期原始数值[1, 31]
 * - day 星期原始数值[0, 6]
 * - hours 小时原始数值[0, 23]
 * - miniutes 分钟原始数值[0, 59]
 * - seconds 秒原始数值[0, 59]
 * - milliSeconds 毫秒原始数值[0, 999]
 * - YYYY 年份数值，精确到4位(12 => '0012')
 * - YY 年份数值，精确到2位(2018 => '18')
 * - Y 年份原始数值
 * - MM 月份数值，精确到2位(9 => '09')
 * - M 月份原始数值
 * - DD 日期数值，精确到2位(3 => '03')
 * - D 日期原始数值
 * - d 星期数值，通过 weekday 参数映射取得(0 => '日')
 * - hh 小时数值，精确到2位(9 => '09')
 * - h 小时原始数值
 * - mm 分钟数值，精确到2位(9 => '09')
 * - m 分钟原始数值
 * - ss 秒数值，精确到2位(9 => '09')
 * - s 秒原始数值
 * - mss 毫秒数值，精确到3位(9 => '009')
 * - ms 毫秒原始数值
 * @method formatDate
 * @param {Date} dobj 日期对象，或者可以被转换为日期对象的数据
 * @param {Object} [spec] 格式化选项
 * @param {Array} [spec.weekday='日一二三四五六'.split('')] 一周内各天对应名称，顺序从周日算起
 * @param {Function} [spec.render = (rs) => `${rs.YYYY}-${rs.MM}-${rs.DD} ${rs.hh}:${rs.mm}`] 格式化模板
 * @return {String} 格式化完成的字符串
 * @example
 * import { formatDate } from '@spore-ui/tskit';
 * console.info(
 *   formatDate(new Date(),{
 *     render(rs: TypeDateInfo) {
 *       return `${rs.YYYY}年${rs.MM}月${rs.DD}日 周${rs.d} ${rs.hh}时${rs.mm}分${rs.ss}秒`
 *     }
 *   })
 * );
 * // 2015年09月09日 周三 14时19分42秒
 */

import padStart from 'lodash/padStart';
import { getUTCDate } from './getUTCDate';
import { TypeDate } from '../types';

export interface TypeDateInfo {
  year?: number;
  month?: number;
  date?: number;
  day?: number;
  hours?: number;
  miniutes?: number;
  seconds?: number;
  milliSeconds?: number;
  YYYY?: string;
  YY?: string;
  Y?: string;
  MM?: string;
  M?: string;
  DD?: string;
  D?: string;
  d?: string;
  hh?: string;
  h?: string;
  mm?: string;
  m?: string;
  ss?: string;
  s?: string;
  mss?: string;
  ms?: string;
}

export interface TypeFormatDateOptions {
  weekday: string[];
  render: (rs: TypeDateInfo) => string;
}

const WEEKDAYS = '日一二三四五六'.split('');
const RENDER = (rs: TypeDateInfo): string => `${rs.YYYY}-${rs.MM}-${rs.DD} ${rs.hh}:${rs.mm}`;

function rightLimit(num: number, width: number): string {
  const str = padStart(`${num}`, width);
  const delta = str.length - width;
  return delta > 0 ? str.substr(delta) : str;
}

export function formatDate(
  dobj: TypeDate,
  spec?: TypeFormatDateOptions,
): string {
  const data: TypeDateInfo = {};
  const conf: TypeFormatDateOptions = {
    weekday: WEEKDAYS,
    render: RENDER,
    ...spec,
  };

  // 解决不同服务器时区不一致可能会导致日期初始化时间不一致的问题
  // 传入数字以北京时区时间为准
  const utcDate = getUTCDate(dobj);
  data.year = utcDate.getUTCFullYear();
  data.month = utcDate.getUTCMonth() + 1;
  data.date = utcDate.getUTCDate();
  data.day = utcDate.getUTCDay();
  data.hours = utcDate.getUTCHours();
  data.miniutes = utcDate.getUTCMinutes();
  data.seconds = utcDate.getUTCSeconds();
  data.milliSeconds = utcDate.getUTCMilliseconds();

  data.YYYY = rightLimit(data.year, 4);
  data.YY = rightLimit(data.year, 2);
  data.Y = `${data.year}`;

  data.MM = padStart(`${data.month}`, 2, '0');
  data.M = `${data.month}`;

  data.DD = padStart(`${data.date}`, 2, '0');
  data.D = `${data.date}`;

  data.d = conf.weekday[data.day];

  data.hh = padStart(`${data.hours}`, 2, '0');
  data.h = `${data.hours}`;

  data.mm = padStart(`${data.miniutes}`, 2, '0');
  data.m = `${data.miniutes}`;

  data.ss = padStart(`${data.seconds}`, 2, '0');
  data.s = `${data.seconds}`;

  data.mss = padStart(`${data.milliSeconds}`, 3, '0');
  data.ms = `${data.milliSeconds}`;

  return conf.render(data);
}

export default formatDate;
