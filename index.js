require('dotenv').config();

const express = require('express');

const app = express();

app.set('view engine', 'ejs');

/*
app.get('/a.html', (req, res)=>{
    res.send(`<h2>動態內容</h2> <p>${Math.random()}</p>`)
});
*/

app.use(express.static('public'));

// 路由定義開始: Begin
app.get('/', (req, res)=>{
    res.render('home', {name: 'albert'})
});


// 所有路由的後面 res.status(404)
app.use((req, res) => {
    //res.type('text/plain'); // 這個寫入的話會變成純文字，包含標籤都變文字
    res.status(404).send(`<h2>404 - 找不到網頁，走錯路了</h2>`)
});

const port = process.env.PORT || 3001;


console.log(process.env.NODE_ENV);
console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
app.listen(port, ()=>{
    console.log(`啟動: ${port} -`, new Date());
})