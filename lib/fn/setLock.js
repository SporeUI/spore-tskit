"use strict";
/**
 * 包装为触发一次后，预置时间内不能再次触发的函数
 * - 类似于技能冷却。
 * @method fn/setLock
 * @param {Function} fn 要延迟触发的函数
 * @param {Number} delay 延迟时间(ms)
 * @returns {Function} 经过包装的冷却触发函数
 * @example
 * import { setLock } from '@spore-ui/tskit';
 * $('#input').keydown(setLock(() => {
 *   console.info('do request');
 * }, 500));
 * // 第一次按键，就会触发一次函数调用
 * // 之后连续按键，仅在 500ms 结束后再次按键，才会再次触发事件函数调用
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.setLock = void 0;
function setLock(fn, delay) {
    var timer = null;
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (timer)
            return;
        timer = setTimeout(function () {
            timer = null;
        }, delay);
        if (typeof fn === 'function') {
            fn.apply(void 0, args);
        }
    };
}
exports.setLock = setLock;
exports.default = setLock;
//# sourceMappingURL=setLock.js.map