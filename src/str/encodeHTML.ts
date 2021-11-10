/* eslint-disable no-control-regex */
/**
 * 编码HTML，将HTML字符转为实体字符
 * @method encodeHTML
 * @param {String} str 含有HTML字符的字符串
 * @returns {String} 经过转换的字符串
 * @example
 * import { encodeHTML } from '@spore-ui/tskit';
 * encodeHTML(`&<>"\' `); // '&amp;&lt;&gt;&quot;&#39;&#32;'
 */

export function encodeHTML(str: string): string {
  return str.replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/'/g, '&#39;')
    .replace(/\u00A0/g, '&nbsp;')
    .replace(/(\u0020|\u000B|\u2028|\u2029|\f)/g, '&#32;');
}

export default encodeHTML;
