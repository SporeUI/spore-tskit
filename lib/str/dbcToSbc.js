"use strict";
/**
 * 全角字符转半角字符
 * @method str/dbcToSbc
 * @param {String} str 包含了全角字符的字符串
 * @returns {String} 经过转换的字符串
 * @example
 * import { dbcToSbc } from '@spore-ui/tskit';
 * dbcToSbc('ＳＡＡＳＤＦＳＡＤＦ'); // 'SAASDFSADF'
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbcToSbc = void 0;
function dbcToSbc(str) {
    return str.replace((/[\uff01-\uff5e]/g), function (a) { return (String.fromCharCode(a.charCodeAt(0) - 65248)); }).replace(/\u3000/g, ' ');
}
exports.dbcToSbc = dbcToSbc;
exports.default = dbcToSbc;
//# sourceMappingURL=dbcToSbc.js.map