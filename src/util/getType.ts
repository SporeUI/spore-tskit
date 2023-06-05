/**
 * 获取数据类型
 * @method getType
 * @param {*} item 任何类型数据
 * @return {String} 对象类型
 * @example
 * import { getType } from '@spore-ui/tskit';
 * getType({}); // 'object'
 * getType(1); // 'number'
 * getType(''); // 'string'
 * getType(function(){}); // 'function'
 * getType(); // 'undefined'
 * getType(null); // 'null'
 * getType(new Date()); // 'date'
 * getType(/a/); // 'regexp'
 * getType(Symbol('a')); // 'symbol'
 * getType(window) // 'window'
 * getType(document) // 'htmldocument'
 * getType(document.body) // 'htmlbodyelement'
 * getType(document.head) // 'htmlheadelement'
 * getType(document.getElementsByTagName('div')) // 'htmlcollection'
 * getType(document.getElementsByTagName('div')[0]) // 'htmldivelement'
 */
export function getType(item: unknown) {
  return Object.prototype.toString
    .call(item)
    .toLowerCase()
    .replace(/^\[object\s*|\]$/gi, '');
}

export default getType;
