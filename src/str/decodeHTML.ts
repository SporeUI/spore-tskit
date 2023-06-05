/**
 * 解码HTML，将实体字符转换为HTML字符
 * @method decodeHTML
 * @param {String} str 含有实体字符的字符串
 * @return {String} HTML字符串
 * @example
 * import { decodeHTML } from '@spore-ui/tskit';
 * decodeHTML('&amp;&lt;&gt;&quot;&#39;&#32;'); // '&<>"\' '
 */
export function decodeHTML(str: string): string {
  return str.replace(/&quot;/g, '"')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&#39;/g, '\'')
    .replace(/&nbsp;/g, '\u00A0')
    .replace(/&#32;/g, '\u0020')
    .replace(/&amp;/g, '&');
}

export default decodeHTML;
