require('dotenv').config();

const express = require('express');
const multer = require('multer');
//const upload = require({dest: 'tmp_uploads/'})  // 檔案上傳後的資料要放在哪裡
const upload = require(__dirname + '/modules/upload-imgs');
const fs = require('fs').promises;

const app = express();


// 樣版引擎設定要放在路由前面
// 預設樣板引擎的根目錄會是views
app.set('view engine', 'ejs');

/*
app.get('/a.html', (req, res)=>{
    res.send(`<h2>動態內容</h2> <p>${Math.random()}</p>`)
});
*/

// 設定靜態檔目錄
// 靜態檔目錄要放在路由最前面
app.use(express.urlencoded({extended: false}));  // 設定成top-level middleware
app.use(express.json());                         // 設定成top-level middleware
app.use(express.static('public'));

// 路由定義開始: Begin
app.get('/', (req, res)=>{
    res.render('home', {name: 'albert'})
});

app.get('/json-sales', (req, res)=>{
    // req.query.orderByCol = age     如何取寫成排序的方式：依照年齡
    // req.query.orderByRule = desc    如何取寫成排序的方式： 依照降冪
    const sales = require('./data/sales')  // 進來變成陣列。 資料只會叫一次。

    if(req.query != {} && sales[0].hasOwnProperty(req.query.orderByCol)){
        let sortCol = req.query.orderByCol;
        let sortRule = req.query.orderByRule;

        console.log('sortCol',sortCol, 'sortRule', sortRule);56
        sales.sort((a,b) => {
            if(sortRule === 'asc'){

              return a[sortCol] < b[sortCol] ? -1 : 1;

            }else return a[sortCol] > b[sortCol] ? -1 : 1;


        })       
    }
    
    console.log(sales[0]);
    res.render('json-sales', {sales, queryCol: req.query.orderByCol ,queryRule: req.query.orderByRule})

});

app.get('/try-qs', (req, res)=>{

    res.json(req.query);      // 取得queryString資料
});


app.post('/try-post', (req, res)=>{
    
    res.json(req.body);      
});

app.get('/try-post-form', (req, res)=>{
    res.render('try-post-form');
});
app.post('/try-post-form', (req, res)=>{
    res.render('try-post-form', req.body);
});

app.post('/try-upload',upload.single('avatar'), async (req, res)=>{  // 我只接受你的欄位名稱叫avatar
    res.json(req.file);
    /*
    const types = ['image/jpeg', 'image/png'];
    const f = req.file;
    if(f && f.originalname){
        if(types.includes(f.mimetype)){
            await fs.rename(f.path, __dirname + '/public/img/' + f.originalname);
            return res.redirect('/img/' + f.originalname);
        }else{
            return res.send('檔案類型不符')
        }
    }
    res.send('bad');
    */
});

app.post('/try-uploads', upload.array('photos'), async (req, res)=>{  // 我只接受你的欄位名稱叫avatar
    const result = req.files.map(({mimetype, filename, size}) => {
        return {mimetype, filename, size};
    });
    res.json(result); // 拿到的是一個array
});

//--------使用變數代稱設定路由  ，   : 冒號之後為代稱名  ，   ? 為選擇性的   ---------------------

app.get('/my-params1/:action/:id', (req, res) => {
// 這個拿到一定是字串
    res.json(req.params);
});

app.get('/my-params2/:action?/:id?', (req, res) => {    // 這個推薦使用～～～！！！！
// 這個拿到一定是字串
    res.json(req.params);
});

app.get('/my-params3/*?/*?', (req, res) => {   // 『*』不建議使用，會搞混～～～！！！！
    res.json(req.params);
});

//------------------以上是使用變數代稱設定路由------------------------------------


//---------------------------------------------------------------------------
app.get(/^\/mobile\/09\d{2}-?\d{3}-?\d{3}$/i , (req, res) => {
    // 這個拿到一定是字串
        let u = req.url.split('?')[0];    //意思是？後面的東西不要
        u = u.slice(3);                   //意思是『/m/』這串不要
        u = u.replace(/-/g, '');     //u = u.split('-').join('');        //意思是『-』不要，然後用空字串接起來
        res.json({
            url: req.url,
            mobile: u
        });
    });

//-------------------------------以下是routes--------------------------------------------

app.use(require('./routes/admin2'));   // require 『 routes 』資料夾裡面的『 admin2 』檔案
// 當成middleware來使用

//-------------------------------以上是routes--------------------------------------------


// 所有路由的後面 res.status(404)
app.use((req, res) => {
    //res.type('text/plain'); // 這個寫入的話會變成純文字，包含標籤都變文字
    res.status(404).send('<h2>404 - 找不到網頁，走錯路了</h2>')
});

const port = process.env.PORT || 3001;


console.log(process.env.NODE_ENV);
console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
app.listen(port, ()=>{
    console.log(`啟動: ${port} -`, new Date());
})