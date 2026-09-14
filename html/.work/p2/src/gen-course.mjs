import fs from 'fs';
import { emit, crumbs } from './build.mjs';
import { courseBody } from './pages-course.mjs';

const BRAND = 'Học viện cờ vua Thông Thái';
const T = t => `${t} | ${BRAND}`;

const COURSES = [
  ['khoa-hoc-dolphin',       'Khóa học Dolphin',       'Banner khóa cờ vua mầm non Dolphin'],
  ['khoa-hoc-turtle',        'Khóa học Turtle',        'Banner khóa cờ vua Turtle'],
  ['khoa-hoc-bee',           'Khóa học Bee',           'Banner khóa cờ vua Bee'],
  ['khoa-hoc-monkey',        'Khóa học Monkey',        'Banner khóa cờ vua Monkey'],
  ['khoa-hoc-elephant',      'Khóa học Elephant',      'Banner khóa cờ vua Elephant'],
  ['khoa-trung-cap-jaguar',  'Khóa trung cấp Jaguar',  'Banner khóa trung cấp Jaguar'],
  ['khoa-hoc-co-vua-online', 'Học trực tuyến (Online)','Banner khóa cờ vua online'],
  ['khoa-hoc-co-vua-tai-nha','Học kèm tại nhà',        'Banner khóa cờ vua kèm tại nhà']
];

const ANCHORS = {
  'khoa-hoc-co-vua-online': [
    ['Học online 1 kèm 1', 'hoc-online-1-kem-1'],
    ['Học online 1 kèm 2', 'hoc-online-1-kem-2'],
    ['Học online nhóm',    'hoc-online-nhom']
  ]
};

export function buildCourses() {
  let n = 0;
  for (const [key, label, heroAlt] of COURSES) {
    const body = courseBody(key, { heroAlt, anchors: ANCHORS[key] });
    emit({
      file: `${key}.html`, title: T(label), active: 'khoa-hoc', css: ['css/page.css'],
      body: '<main>\n' + body + '\n</main>'
    });
    n++;
  }
  return n;
}
