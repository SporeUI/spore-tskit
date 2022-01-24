/* eslint-disable @typescript-eslint/quotes */
import {
  getQuery,
  setQuery,
} from '../../src/url/index';

describe('getQuery', () => {
  test(`getQuery('') => Error`, () => {
    try {
      getQuery('');
    } catch (err) {
      expect(err.message.indexOf('Require url as parameter')).toBe(0);
    }
  });
  test(`getQuery('localhost') => {}`, () => {
    const query = getQuery('localhost');
    expect(Object.keys(query).length).toBe(0);
  });
  test(`getQuery('localhost?a=1') => { a: '1' }`, () => {
    const query = getQuery('localhost?a=1');
    expect(query).toMatchObject({ a: '1' });
  });
  test(`getQuery('localhost?a=1&b=2') => { a: '1', b: '2' }`, () => {
    const query = getQuery('localhost?a=1&b=2');
    expect(query).toMatchObject({ a: '1', b: '2' });
  });
  test(`getQuery('localhost?a=1#b=2') => { a: '1' }`, () => {
    const query = getQuery('localhost?a=1#b=2');
    expect(query).toMatchObject({ a: '1' });
  });
  test(`getQuery('?a=1#b=2') => { a: "1" }`, () => {
    const query = getQuery('?a=1#b=2');
    expect(query).toMatchObject({ a: '1' });
  });
  test(`getQuery('a=1#b=2') => {}`, () => {
    const query = getQuery('a=1#b=2');
    expect(Object.keys(query).length).toBe(0);
  });
  test(`getQuery('localhost?a=1', 'a') => '1'`, () => {
    const val = getQuery('localhost?a=1', 'a');
    expect(val).toBe('1');
  });
  test(`getQuery('localhost?a=1', 'b') => ''`, () => {
    const val = getQuery('localhost?a=1', 'b');
    expect(val).toBe('');
  });
});

describe('setQuery', () => {
  test(`setQuery('localhost')`, () => {
    const str = setQuery('localhost');
    expect(str).toEqual('localhost');
  });
  test(`setQuery('localhost', {a: 1}) => 'localhost?a=1'`, () => {
    const str = setQuery('localhost', { a: 1 });
    expect(str).toEqual('localhost?a=1');
  });
  test(`setQuery('', {a: 1}) => '?a=1'`, () => {
    const str = setQuery('', { a: 1 });
    expect(str).toEqual('?a=1');
  });
  test(`setQuery('localhost?a=1', {a: 2}) => 'localhost?a=2'`, () => {
    const str = setQuery('localhost?a=1', { a: 2 });
    expect(str).toEqual('localhost?a=2');
  });
  test(`setQuery('localhost?a=1', {a: ''}) => 'localhost?a='`, () => {
    const str = setQuery('localhost?a=1', { a: '' });
    expect(str).toEqual('localhost?a=');
  });
  test(`setQuery('localhost?a=1', {a: null}) => 'localhost'`, () => {
    const str = setQuery('localhost?a=1', { a: null });
    expect(str).toEqual('localhost');
  });
  test(`setQuery('localhost?a=1', {b: 2}) => 'localhost?a=1&b=2'`, () => {
    const str = setQuery('localhost?a=1', { b: 2 });
    expect(str).toEqual('localhost?a=1&b=2');
  });
  test(`setQuery('localhost?a=1&b=1', {a: 2, b: 3}) => 'localhost?a=2&b=3'`, () => {
    const str = setQuery('localhost?a=1&b=1', { a: 2, b: 3 });
    expect(str).toEqual('localhost?a=2&b=3');
  });
  test(`setQuery('localhost#a=1', {a: 2, b: 3}) => 'localhost?a=2&b=3#a=1'`, () => {
    const str = setQuery('localhost#a=1', { a: 2, b: 3 });
    expect(str).toEqual('localhost?a=2&b=3#a=1');
  });
  test(`setQuery('#a=1', {a: 2, b: 3}) => '?a=2&b=3#a=1'`, () => {
    const str = setQuery('#a=1', { a: 2, b: 3 });
    expect(str).toEqual('?a=2&b=3#a=1');
  });
});
