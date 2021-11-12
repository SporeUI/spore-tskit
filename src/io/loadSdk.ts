/**
 * sdk 加载统一封装
 * - 多次调用不会发起重复请求
 * @method io/loadSdk
 * @param {Object} options 选项
 * @param {String} options.name sdk 全局变量名称
 * @param {String} options.url script 地址
 * @param {String} [options.charset=''] script 编码
 * @return {Promise<unknown>} sdk 加载完成，回调加载的对象
 * @example
 * import { loadSdk } from '@spore-ui/tskit';
 * loadSdk({
 *   name: 'TencentCaptcha',
 *   url: 'https://ssl.captcha.qq.com/TCaptcha.js'
 * }).then(TencentCaptcha => {})
 */

import get from 'lodash/get';
import set from 'lodash/set';
import { getScript } from './getScript';

export interface TypeLoadSdkOptions {
  name: string;
  url: string;
  charset?: string;
}

export interface TypePromiseMap {
  [key: string]: Promise<unknown>;
}

const CACHE_NAME = 'SPORE_SDK_PROMISE';

let cache: TypePromiseMap = null;

if (typeof window === 'undefined') {
  cache = {};
} else {
  cache = get(window, CACHE_NAME) as TypePromiseMap;
  if (!cache) {
    cache = {};
    set(window, CACHE_NAME, cache);
  }
}

export function loadSdk(options: TypeLoadSdkOptions) {
  const conf: TypeLoadSdkOptions = {
    name: '',
    url: '',
    charset: '',
    ...options,
  };

  const {
    name,
    url,
    charset,
  } = conf;

  let pm = cache[name];
  if (pm) {
    return pm;
  }

  pm = getScript(url, {
    charset,
  }).then(() => get(window, name));
  cache[name] = pm;

  return pm;
}

export default loadSdk;
