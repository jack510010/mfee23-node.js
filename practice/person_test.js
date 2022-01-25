const obj = require('./person');

const {person} = require('./person');

const p2 = new obj.person('Jack', 30);
const p3 = new person('David',30);

console.log(p2);
console.log('Hi, ', p2.sayHello());
console.log(p3);
console.log(obj.f3(3));
console.log(obj.person === person);
