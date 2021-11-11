import {
  commaFormat,
} from '../../src/index';

describe('num.comma', () => {
  test('comma(1234) => "1,234"', () => {
    expect(commaFormat(1234)).toBe('1,234');
  });
  test('comma(12345678) => "12,345,678"', () => {
    expect(commaFormat(12345678)).toBe('12,345,678');
  });
  test('comma(12345678.12345678) => "12,345,678.123,456,78"', () => {
    expect(commaFormat(12345678.12345678)).toBe('12,345,678.123,456,78');
  });
});
