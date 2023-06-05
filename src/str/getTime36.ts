import { TypeDate } from '../types';

/**
 * 获取36进制日期字符串
 * @method getTime36
 * @param {Date} [date] 符合规范的日期字符串或者数字，不传参数则使用当前客户端时间
 * @return {String} 转成为36进制的字符串
 * @example
 * import { getTime36 } from '@spore-ui/tskit';
 * getTime36('2020'); // 'k4ujaio0'
 */
export function getTime36(date?: TypeDate): string {
  const dvalue = date ? new Date(date).getTime() : new Date().getTime();
  return dvalue.toString(36);
}

export default getTime36;
