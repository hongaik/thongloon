import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import vm from 'node:vm';

// Small DOM stand-in checks tab selection and keyboard wraparound without dependencies.
const node = (id, focus) => ({ id, dataset: { focus }, attributes: {}, listeners: {}, textContent: '', tabIndex: 0,
  setAttribute(key, value) { this.attributes[key] = value; },
  addEventListener(key, callback) { this.listeners[key] = callback; },
  focus() { this.focused = true; }
});
const tabs = ['impact', 'data', 'build'].map(key => node(`tab-${key}`, key));
const elements = Object.fromEntries(['desk-panel', 'desk-period', 'desk-title', 'desk-description', 'desk-link', 'year'].map(id => [`#${id}`, node(id)]));
vm.runInNewContext(readFileSync('script.js', 'utf8'), { document: { querySelectorAll: () => tabs, querySelector: id => elements[id] }, Date });
tabs[1].listeners.click();
assert.equal(elements['#desk-title'].textContent, 'From language to recommendations.');
assert.equal(elements['#desk-panel'].attributes['aria-labelledby'], 'tab-data');
assert.equal(tabs.filter(tab => tab.attributes['aria-selected'] === 'true').length, 1);
let prevented = false;
tabs[0].listeners.keydown({ key: 'ArrowLeft', preventDefault() { prevented = true; } });
assert.ok(prevented && tabs[2].focused);
assert.equal(elements['#desk-link'].attributes.href, '#work');
tabs[2].listeners.keydown({ key: 'ArrowRight', preventDefault() {} });
assert.equal(tabs[0].tabIndex, 0);
assert.equal(elements['#desk-link'].attributes.href, '#journey');
const html = readFileSync('index.html', 'utf8');
const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
assert.equal(ids.length, new Set(ids).size, 'Duplicate IDs');
for (const [, url] of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
  if (url.startsWith('#')) assert.ok(ids.includes(url.slice(1)), `Missing anchor ${url}`);
  else if (!/^(https?:|data:|mailto:)/.test(url)) assert.ok(existsSync(url), `Missing asset ${url}`);
}
assert.ok(html.includes('mailto:tanthongloon@gmail.com'));
assert.ok(html.includes('https://www.linkedin.com/in/thong-loon-tan-21b42a75/'));
console.log('PASS: career tabs, keyboard wraparound, selected states, local assets, anchors and contact links.');
