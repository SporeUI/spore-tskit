"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.delay = void 0;
/**
 * 延迟指定时间
 * @method time/delay
 * @param {Number} time 延迟时间(ms)
 * @returns {Promise<undefined>} 时间结束后的回调 Promise
 * @example
 * const fn = async () {
 *   await delay(100);
 *   console.info('100ms 后执行');
 * };
 * fn();
 */
function delay(time) {
    return new Promise(function (resolve) {
        setTimeout(resolve, time);
    });
}
exports.delay = delay;
exports.default = delay;
//# sourceMappingURL=delay.js.map