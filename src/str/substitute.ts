import { TypeSimpleObject } from '../types';

/**
 * 简单模板函数
 * @method substitute
 * @param {String} str 要替换模板的字符串
 * @param {Object} obj 模板对应的数据对象
 * @param {RegExp} [reg=/\\?\{\{([^{}]+)\}\}/g] 解析模板的正则表达式
 * @return {String} 替换了模板的字符串
 * @example
 * import { substitute } from '@spore-ui/tskit';
 * substitute('{{city}}欢迎您', {city:'北京'}); // '北京欢迎您'
 */
export function substitute(str: string, obj: TypeSimpleObject, reg?: RegExp) {
  return str.replace(reg || (/\\?\{\{([^{}]+)\}\}/g), (match: string, name: string): string => {
    if (match.charAt(0) === '\\') return match.slice(1);
    // 注意：obj[name] != null 等同于 obj[name] !== null && obj[name] !== undefined
    return (obj[name] != null) ? `${obj[name]}` : '';
  });
}

export default substitute;
