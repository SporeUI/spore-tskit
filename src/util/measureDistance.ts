/**
 * 测量地理坐标的距离
 * @method measureDistance
 * @param {Number} lat1 坐标1经度
 * @param {Number} lng1 坐标1纬度
 * @param {Number} lat2 坐标2经度
 * @param {Number} lng2 坐标2纬度
 * @return {Number} 2个坐标之间的距离（千米）
 * @example
 * import { measureDistance } from '@spore-ui/tskit';
 * measureDistance(0, 0, 100, 100); // 9826.40065109978
 */
export function measureDistance(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number,
): number {
  const radLat1 = (lat1 * Math.PI) / 180.0;
  const radLat2 = (lat2 * Math.PI) / 180.0;
  const a = radLat1 - radLat2;
  const b = (lng1 * Math.PI) / 180.0 - (lng2 * Math.PI) / 180.0;
  const powVal = Math.sin(a / 2) ** 2;
  const ccpVal = Math.cos(radLat1) * Math.cos(radLat2) * (Math.sin(b / 2) ** 2);
  const sqrtVal = Math.sqrt(powVal + ccpVal);
  let s = 2 * Math.asin(sqrtVal);
  // 地球半径
  s *= 6378.137;
  return s;
}

export default measureDistance;
