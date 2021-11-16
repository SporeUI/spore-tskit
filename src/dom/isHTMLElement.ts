/**
 * 判断对象是否为dom元素
 * @method isHTMLElement
 * @param {Object} node 要判断的对象
 * @return {Boolean} 是否为dom元素
 * @example
 * import { isHTMLElement } from '@spore-ui/tskit';
 * isHTMLElement(document.body) // true
 */
export function isHTMLElement(item: unknown): boolean {
  const node = item as HTMLElement;
  return !!(
    node
    && node.nodeName
    && node.nodeType
  );
}

export default isHTMLElement;
