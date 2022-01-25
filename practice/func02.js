//const f1 = require('./func01');  這個寫法ok
const f1 = require(__dirname + '/func01');  // 這個寫法也ok

console.log('func02', f1(8));