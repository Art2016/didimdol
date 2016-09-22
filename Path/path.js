/**
 * Created by Tacademy on 2016-08-04.
 */
var path = require('path');
var fs = require('fs');

var npath = path.normalize('/foo/bar//baz/asdf/quux/..'); // 경로 정규화
console.log(npath);
// \foo\bar\baz\asdf

var jpath = path.join('/image', 'user00', '2016', 'img_1111.jpg');
console.log(jpath);
// \image\user00\2016\img_1111.jpg

console.log(path.dirname(jpath)); // \image\user00\2016
console.log(path.basename(jpath)); // img_1111.jpg
console.log(path.extname(jpath)); // .jpg
console.log(path.basename(jpath, path.extname(jpath))); // img_1111

console.log(path.parse(jpath));
/*
 { root: '\\',
 dir: '\\image\\user00\\2016',
 base: 'img_1111.jpg',
 ext: '.jpg',
 name: 'img_1111' }
*/
var pathObj = path.parse(jpath);
console.log(pathObj.dir);