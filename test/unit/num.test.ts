import {
  commaFormat,
  fixAccuracy,
} from '../../src/index';

describe('commaFormat', () => {
  test('commaFormat(1234) => "1,234"', () => {
    expect(commaFormat(1234)).toBe('1,234');
  });
  test('commaFormat(12345678) => "12,345,678"', () => {
    expect(commaFormat(12345678)).toBe('12,345,678');
  });
  test('commaFormat(12345678.12345678) => "12,345,678.123,456,78"', () => {
    expect(commaFormat(12345678.12345678)).toBe('12,345,678.123,456,78');
  });
});

describe('fixAccuracy', () => {
  test('fixAccuracy(0.1 + 0.2) => 0.3', () => {
    expect(fixAccuracy(0.1 + 0.2)).toBe(0.3);
  });
  test('fixAccuracy(0.41 + 0.5) => 0.91', () => {
    expect(fixAccuracy(0.41 + 0.5)).toBe(0.91);
  });
});
