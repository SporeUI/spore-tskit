/**
 * 判断事件是否发生在一个 Dom 元素内。
 * - 常用于判断点击事件发生在浮层外时关闭浮层。
 * @method eventOccurInside
 * @param {Object} event 浏览器事件对象
 * @param {Object} node 用于比较事件发生区域的 Dom 对象
 * @return {Boolean} 事件是否发生在 node 内
 * @example
 * import { eventOccurInside } from '@spore-ui/tskit';
 * $('.layer').on('click', function(evt){
 *   if(eventOccurInside(evt, $(this).find('close').get(0))){
 *     $(this).hide();
 *   }
 * });
 */

export function eventOccurInside(event: Event, node: HTMLElement): boolean {
  if (node && event && event.target) {
    let pos = event.target as HTMLElement;
    while (pos) {
      if (pos === node) {
        return true;
      }
      pos = pos.parentNode as HTMLElement;
    }
  }
  return false;
}

export default eventOccurInside;
