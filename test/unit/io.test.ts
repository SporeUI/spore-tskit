import {
  getScript,
} from '../../src/index';

describe('io/getScript', () => {
  test('正常加载远程脚本', () => {
    const url = 'https://code.jquery.com/jquery-3.3.1.min.js';
    getScript(url);
    const scriptNode = document.querySelector(`head script[src="${url}"]`);
    expect(!!scriptNode).toBeTruthy();
  });
});
