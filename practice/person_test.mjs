import person, {f3, f1} from './person.mjs';  // 如果寫import， 一律寫在檔案最前面


const p4 = new person('David',30);

console.log(p4);
console.log(f1(9));
console.log(f3(10));