import get from 'lodash/get';
import {
  getScript,
  loadSdk,
} from '../../src/index';

describe('io/getScript', () => {
  test('正常加载远程脚本', async () => {
    const url = 'https://sporeui.github.io/spore-kit/docs/js/cb-test1.js?t=1';
    await getScript(url);
    const scriptNode = document.querySelector(`head script[src="${url}"]`);
    expect(!!scriptNode).toBeTruthy();
    expect(get(window, 'callbackValue1')).toBe('cb-test1');
  });
});

describe('io/loadSdk', () => {
  test('正常加载 sdk', async () => {
    const url = 'https://sporeui.github.io/spore-kit/docs/js/cb-test2.js?t=1';
    const val1 = await loadSdk({
      name: 'callbackValue2',
      url,
    });
    const val2 = await loadSdk({
      name: 'callbackValue2',
      url,
    });
    const scriptNodes = document.querySelectorAll(`head script[src="${url}"]`);

    expect(val1).toBe('cb-test2');
    expect(val2).toBe('cb-test2');
    expect(scriptNodes.length).toBe(1);
  });
});
