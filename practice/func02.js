//const f1 = require('./func01');  這個寫法ok
const f1 = require(__dirname + '/func01');  // 這個寫法也ok   副檔名'/func01.js' 那個.js可以不寫， 除非遇到檔名一樣副檔名不一樣的狀況

console.log('func02', f1(8));