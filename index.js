const express = require('express');

const app = express();


// 路由定義開始: Begin
app.get('/', (req, res)=>{
    res.send('<h2>Hello</h2>')
});



app.listen(3000, ()=>{
    console.log('server started');
})