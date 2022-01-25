class person{
    constructor(name = 'noname', age = 0){
        this.name = name,
        this.age = age;
    }
    toJSON(){
        return {
            name: this.name,
            age: this.age,
            hi: 'abc'
        }
    }
    sayHello(){
        return `Hello, my name is ${this.name}.`;
    }
}
const p1 = new person('Bill', 23);

console.log(p1.sayHello());
console.log(JSON.stringify(p1.toJSON()));
console.log(JSON.stringify(p1));
