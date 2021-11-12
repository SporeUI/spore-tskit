import {
  byteLength,
  dbcToSbc,
  decodeHTML,
  encodeHTML,
  getRnd36,
  getTime36,
  ipToHex,
  getLeftByteString,
  sizeOfUTF8String,
} from '../../src/index';

describe('byteLength', () => {
  test('中文占2个字符', () => {
    expect(byteLength('中文cc')).toBe(6);
  });
  test('空字符串返回 0', () => {
    expect(byteLength('')).toBe(0);
  });
  test('英文占1个字符', () => {
    expect(byteLength('cc')).toBe(2);
  });
});

describe('dbcToSbc', () => {
  test('全角字符串转为英文字符串', () => {
    const str = dbcToSbc('ＳＡＡＳＤＦＳＡＤＦ');
    expect(str).toBe('SAASDFSADF');
  });
});

describe('decodeHTML', () => {
  test('解码实体字符串', () => {
    const str = decodeHTML('&amp;&lt;&gt;&quot;&#39;&#32;');
    expect(str).toBe('&<>"\' ');
  });
});

describe('encodeHTML', () => {
  test('指定字符编码为实体字符', () => {
    const str = encodeHTML('&<>"\' ');
    expect(str).toBe('&amp;&lt;&gt;&quot;&#39;&#32;');
  });
});

describe('getRnd36', () => {
  test('返回值为 string 类型', () => {
    expect(typeof getRnd36()).toBe('string');
  });
  test('不传参则默认取随机值', () => {
    expect(getRnd36().length > 0);
  });
  test('可以指定参数', () => {
    const str = getRnd36(0.5810766832590446);
    expect(str).toBe('kx2pozz9rgf');
  });
});

describe('getTime36', () => {
  test('当前时间作为默认参数', () => {
    const str = getTime36();
    expect(typeof str).toBe('string');
    expect(str.length).toBeGreaterThanOrEqual(8);
  });
  test('可以传递时间作为参数', () => {
    expect(getTime36('2020')).toBe('k4ujaio0');
  });
});

describe('ipToHex', () => {
  test('IP字符串转为 16 进制', () => {
    expect(ipToHex('255.255.255.255')).toBe('ffffffff');
    expect(ipToHex('10.10.10.10')).toBe('0a0a0a0a');
  });
});

describe('getLeftByteString', () => {
  test('按照中文占 2 个字符的规则进行截取', () => {
    expect(getLeftByteString('a世界真和谐', 5)).toBe('a世界');
    expect(getLeftByteString('a世界真和谐', 6)).toBe('a世界');
    expect(getLeftByteString('a世界真和谐', 7)).toBe('a世界真');
    expect(getLeftByteString('世界真和谐', 6)).toBe('世界真');
    expect(getLeftByteString('世界真和谐', 12)).toBe('世界真和谐');
  });
  test('正确处理全角字符', () => {
    expect(getLeftByteString('aＳＡＡＳＤ', 5)).toBe('aＳＡ');
  });
});

describe('sizeOfUTF8String', () => {
  test('获取字符串的 utf8 长度', () => {
    expect(sizeOfUTF8String('中文c')).toBe(7);
  });
});
