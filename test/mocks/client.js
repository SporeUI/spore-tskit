const $jsdom = require('jsdom');

const dom = new $jsdom.JSDOM('', {
  // 以下2个选项确保 script.onload 可以触发
  resources: 'usable',
  runScripts: 'dangerously',
});
global.document = dom.window.document;
global.window = dom.window;
