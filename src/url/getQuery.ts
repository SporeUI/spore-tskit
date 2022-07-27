/**
 * 解析 location.search 为一个JSON对象
 * - 或者获取其中某个参数
 * @method getQuery
 * @param {String} href URL字符串
 * @param {String} name 参数名称
 * @return {Object|String} query对象 | 参数值
 * @example
 * import { getQuery } from '@spore-ui/tskit';
 * const url = 'http://localhost/profile?beijing=huanyingni';
 * console.info( getQuery(url) );
 * // {beijing : 'huanyingni'}
 * console.info( getQuery(url, 'beijing') );
 * // 'huanyingni'
 */

import { TypePlainObject } from '../types';

export type TypeQueryCache = Map<string, TypePlainObject>;

export const queryCache: TypeQueryCache = new Map();

export function getQuery(): TypePlainObject;
export function getQuery(href: string): TypePlainObject;
export function getQuery(href: string, name: string): string;
export function getQuery(href?: string, name?: string): string | TypePlainObject {
  const url = href || this?.location?.href || '';
  if (!url) {
    throw new Error('Require url as parameter.');
  }

  let query = queryCache.get(url);
  if (!query) {
    query = {};
    const searchIndex = url.indexOf('?');
    if (searchIndex >= 0) {
      let search = url.slice(searchIndex + 1, url.length);
      search = search.replace(/#.*/, '');
      const params: string[] = search.split('&');
      params.forEach((group: string) => {
        const equalIndex = group.indexOf('=');
        if (equalIndex > 0) {
          const key = group.slice(0, equalIndex);
          const value = group.slice(equalIndex + 1, group.length);
          query[key] = value;
        }
      });
      queryCache.set(url, query);
    }
  }

  if (name) {
    return query[name] as string || '';
  }

  return query;
}

export default getQuery;
