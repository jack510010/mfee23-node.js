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
        return `Nice to meet you, my name is ${this.name}.`;
    }
}

const f3 = a=> a*a*a;

module.exports = {person, f3}