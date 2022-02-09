const Joi = require('joi');

const schema = Joi.object({
    username: Joi.string()
        .alphanum()
        .min(6)
        .max(20)
        .required(),

    age: Joi.number()
        .required(),

    birth_year: Joi.number()
        .integer()
        .min(1900)
        .max(2022),

    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),

    repeat_password: Joi.ref('password'),

});

console.log(schema.validate({
    username:'abcdef', 
    age: 30, 
    birth_year: 2013, 
    password: 'Jack510010', 
    repeat_password: 'Jack510010'
}));