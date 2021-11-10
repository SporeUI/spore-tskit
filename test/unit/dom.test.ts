import {
  eventOccurInside,
} from '../../src/index';

describe('dom/eventOccurInside', () => {
  test('事件解绑', (done) => {
    const html = [
      '<div id="occur-inside">',
      '<div id="box">',
      '<div id="close">',
      '</div>',
      '</div>',
      '<div id="out"></div>',
      '</div>',
    ].join('');
    document.body.innerHTML = html;
    const cont = document.getElementById('occur-inside');
    const box = document.getElementById('box');
    const close = document.getElementById('close');
    const out = document.getElementById('out');
    cont.addEventListener('custom', (evt) => {
      const rs1 = eventOccurInside(evt, box);
      const rs2 = eventOccurInside(evt, out);
      expect(rs1).toBe(true);
      expect(rs2).toBe(false);
      done();
    });
    const evt = new window.Event('custom', {
      bubbles: true,
    });
    close.dispatchEvent(evt);
  });
});
