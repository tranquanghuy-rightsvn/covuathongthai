import { chromium } from 'playwright';
const b = await chromium.launch();
const p = await b.newPage({ viewport:{width:1440,height:1000} });
await p.goto('https://ichess.edu.vn/cua-hang/', {waitUntil:'load'});
await p.waitForTimeout(4000);
console.log(await p.evaluate(() => {
  const ul = document.querySelector('ul.product-grid');
  const li = ul.children[0];
  return JSON.stringify({ n: ul.children.length, tag: li && li.tagName,
    d: li && getComputedStyle(li).display, v: li && getComputedStyle(li).visibility,
    rect: li && JSON.stringify(li.getBoundingClientRect()) });
}));
await b.close();
