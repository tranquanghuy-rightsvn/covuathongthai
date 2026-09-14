import { buildIndex } from './gen-index.mjs';
import { buildPages } from './gen-pages.mjs';
import { buildShop } from './gen-shop.mjs';
import { buildBlog } from './gen-blog.mjs';
import { buildLearnPress } from './gen-lp.mjs';
import { buildCartPage } from './gen-cart.mjs';
import { buildCourses } from './gen-course.mjs';
import { saveManifest } from './assets.mjs';

let n = 0;
n += buildIndex();
n += buildCourses();
n += buildPages();
n += buildShop();
n += buildBlog();
n += buildLearnPress();
n += buildCartPage();
console.log(`Đã dựng ${n} trang, ${saveManifest()} ảnh trong manifest.`);
