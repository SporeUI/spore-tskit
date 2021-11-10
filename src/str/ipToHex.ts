/**
 * 十进制IP地址转十六进制
 * @method ipToHex
 * @param {String} ip 十进制数字的IPV4地址
 * @return {String} 16进制数字IPV4地址
 * @example
 * import { ipToHex } from '@spore-ui/tskit';
 * ipToHex('255.255.255.255'); //return 'ffffffff'
 */

export function ipToHex(ip: string): string {
  return ip.replace(/(\d+)\.*/g, (match, digit) => {
    let num = digit;
    num = parseInt(num, 10) || 0;
    num = num.toString(16);
    if (num.length < 2) {
      num = `0${num}`;
    }
    return num;
  });
}

export default ipToHex;
