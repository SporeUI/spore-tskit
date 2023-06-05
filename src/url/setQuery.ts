import { TypePlainObject } from '../types';

/**
 * 将参数设置到 location.search 上
 * @method setQuery
 * @param {String} url URL字符串
 * @param {Object} query 参数对象
 * @return {String} 拼接好参数的URL字符串
 * @example
 * import { setQuery } from '@spore-ui/tskit';
 * setQuery('localhost'); // 'localhost'
 * setQuery('localhost', {a: 1}); // 'localhost?a=1'
 * setQuery('', {a: 1}); // '?a=1'
 * setQuery('localhost?a=1', {a: 2}); // 'localhost?a=2'
 * setQuery('localhost?a=1', {a: ''}); // 'localhost?a='
 * setQuery('localhost?a=1', {a: null}); // 'localhost'
 * setQuery('localhost?a=1', {b: 2}); // 'localhost?a=1&b=2'
 * setQuery('localhost?a=1&b=1', {a: 2, b: 3}); // 'localhost?a=2&b=3'
 * setQuery('localhost#a=1', {a: 2, b: 3}); // 'localhost?a=2&b=3#a=1'
 * setQuery('#a=1', {a: 2, b: 3}); // '?a=2&b=3#a=1'
 */
export function setQuery(href: string, query?: TypePlainObject): string {
  const url = href || '';
  if (!query) { return url; }

  const reg = /([^?#]*)(\?{0,1}[^?#]*)(#{0,1}.*)/;
  return url.replace(reg, (match, path, strSearch, hash) => {
    let search = strSearch || '';
    search = search.replace(/^\?/, '');

    const para = search.split('&').reduce(
      (item: TypePlainObject, pair: string) => {
        const obj = item;
        const arr = pair.split('=');
        const [key] = arr;
        if (key) {
          [, obj[key]] = arr;
        }
        return obj;
      },
      {},
    );

    Object.keys(query).forEach((key) => {
      const value = query[key];
      if (value === null || typeof value === 'undefined') {
        delete para[key];
      } else {
        para[key] = value;
      }
    });

    const paraKeys = Object.keys(para);
    if (!paraKeys.length) {
      search = '';
    } else {
      const strQuery = paraKeys
        .map((key) => `${key}=${para[key]}`)
        .join('&');
      search = `?${strQuery}`;
    }

    return `${path}${search}${hash}`;
  });
}

export default setQuery;
