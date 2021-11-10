import {
  abToHex,
  ascToHex,
  getType,
  hexToAb,
  hexToAsc,
  hslToRgb,
  measureDistance,
  rgbToHsl,
} from '../../src/index';

describe('util/abToHex', () => {
  test('abToHex(buffer)', () => {
    const ab = new ArrayBuffer(2);
    const dv = new DataView(ab);
    dv.setUint8(0, 171);
    dv.setUint8(1, 205);
    expect(abToHex(ab)).toBe('abcd');
  });
});

describe('util/ascToHex', () => {
  test('ascToHex("") => ""', () => {
    expect(ascToHex('')).toBe('');
  });

  test("ascToHex('*+') => '2a2b'", () => {
    expect(ascToHex('*+')).toBe('2a2b');
  });
});

describe('util/getType', () => {
  test('type(null) => "null"', () => {
    expect(getType(null)).toBe('null');
  });
});

describe('util/hexToAb', () => {
  test('hexToAb("") => ArrayBuffer(0)', () => {
    const ab = hexToAb('');
    expect(ab.toString()).toBe('[object ArrayBuffer]');
    expect(ab.byteLength).toBe(0);
  });

  test('hexToAb("abcd")', () => {
    const ab = hexToAb('abcd');
    const dv = new DataView(ab);
    expect(ab.toString()).toBe('[object ArrayBuffer]');
    expect(ab.byteLength).toBe(2);
    expect(dv.getUint8(0)).toBe(171);
    expect(dv.getUint8(1)).toBe(205);
  });
});

describe('util/hexToAsc', () => {
  test("hexToAsc('') => ''", () => {
    expect(hexToAsc('')).toBe('');
  });

  test('hexToAsc("2a2b") => "*+"', () => {
    expect(hexToAsc('2a2b')).toBe('*+');
  });
});

describe('util/hslToRgb', () => {
  test('hslToRgb(0, 0, 0) => [0,0,0]', () => {
    const rgb = hslToRgb(0, 0, 0).join();
    expect(rgb).toBe('0,0,0');
  });

  test('hslToRgb(0, 0, 1) => [255,255,255]', () => {
    const rgb = hslToRgb(0, 0, 1).join();
    expect(rgb).toBe('255,255,255');
  });

  test('Convert grey correct.', () => {
    const rgb = hslToRgb(0, 0, 0.7843137254901961).join();
    expect(rgb).toBe('200,200,200');
  });

  test('Convert color correct.', () => {
    const rgb = hslToRgb(
      0.5555555555555555,
      0.9374999999999999,
      0.6862745098039216,
    ).join();
    expect(rgb).toBe('100,200,250');
  });
});

describe('util/rgbToHsl', () => {
  test('rgbToHsl(0, 0, 0) => [0,0,0]', () => {
    const hsl = rgbToHsl(0, 0, 0).join();
    expect(hsl).toBe('0,0,0');
  });

  test('rgbToHsl(255, 255, 255) => [0,0,1]', () => {
    const hsl = rgbToHsl(255, 255, 255).join();
    expect(hsl).toBe('0,0,1');
  });

  test('Convert grey correct.', () => {
    const hsl = rgbToHsl(200, 200, 200).join();
    expect(hsl).toBe('0,0,0.7843137254901961');
  });

  test('Convert color correct.', () => {
    const hsl = rgbToHsl(100, 200, 250).join();
    const val = [
      0.5555555555555555,
      0.9374999999999999,
      0.6862745098039216,
    ].join();
    expect(hsl).toBe(val);
  });
});

describe('util/measureDistance', () => {
  test('measureDistance(0, 0, 100, 100) => 9826.40065109978', () => {
    const distance = measureDistance(0, 0, 100, 100);
    expect(distance).toBe(9826.40065109978);
  });
});
