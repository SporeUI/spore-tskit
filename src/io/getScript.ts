/**
 * 加载 script 文件
 * @method io/getScript
 * @param {String} src script 地址
 * @param {Object} options 选项
 * @param {String} [options.charset=''] script 编码
 * @return {Promise<undefined>} 加载完成的回调
 * @example
 * import { getScript } from '@spore-ui/tskit';
 * getScript('https://code.jquery.com/jquery-3.3.1.min.js').then(() => {
 *   console.info('loaded');
 * });
 */

export interface TypeGetScriptOptions {
  charset?: string;
}

export function getScript(
  src: string,
  options?: TypeGetScriptOptions,
): Promise<void> {
  return new Promise((resolve) => {
    const conf: TypeGetScriptOptions = {
      charset: '',
      ...options,
    };

    const script = document.createElement('script');
    script.async = true;
    script.src = src;

    if (conf.charset) {
      script.charset = conf.charset;
    }

    // 自 IE9 开始，都支持 script.onload 了
    script.onload = () => {
      script.onload = null;
      resolve();
    };

    const head = document.getElementsByTagName('head')[0];
    head.appendChild(script);
  });
}

export default getScript;
