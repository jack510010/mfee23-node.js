const express = require('express');
const db = require('./../modules/connect-db');
const upload = require('./../modules/upload-imgs')
// 路由模組化
const router = express.Router();

async function getListData(req, res) {
    const perPage = 5;

    let page = req.query.page ? parseInt(req.query.page) : 1;
    if(page < 1){
        return res.redirect('/address-book/list');
    }

    const conditions = {};  // 傳到 ejs 的條件
    
    let search = req.query.search ? req.query.search : '';
    search = search.trim();  // 去掉頭尾空白
    let sqlWhere = ' WHERE 1 ';
    if(search){
        sqlWhere += ` AND name LIKE ${db.escape('%'+search+'%')} `;
        conditions.search = search;
    }



    const output = {
        perPage,
        page,
        totalRows: 0,
        totalPages: 0,
        rows: [],
        conditions
    };

    const totalSql = `SELECT COUNT(1) num FROM address_book ${sqlWhere} `;
    // return res.send(t_sql); // 除錯用

    const [result1] = await db.query(totalSql);

    const totalRows = result1[0].num;


    if(totalRows){
        output.totalPages = Math.ceil(totalRows/perPage);
        output.totalRows = totalRows;
        if(page > output.totalPages){
            return res.redirect(`/address-book/list?page=${output.totalPages}`)
        }

        const sql = `SELECT * FROM address_book ${sqlWhere} ORDER BY sid DESC LIMIT ${perPage * (page - 1)}, ${perPage} `;
        const [result2] = await db.query(sql);
        result2.forEach(el => {
            let str = res.locals.dateToString(el.birthday);
            if(str === 'InInvalid date'){
                el.birthday = '沒有輸入資料';
            }else{
                el.birthday = str;
            }
        });
        output.rows = result2;

        
    };
    return output;
}

router.get('/list', async (req, res)=>{
    res.locals.pageName = 'address-book list';
    res.render('address-book/list', await getListData(req, res));

});

router.get('/api/list', async (req, res)=>{
    
    res.json(await getListData(req, res));

});


router.get('/add', async (req, res)=>{
    res.locals.pageName = 'address-book add';
    res.render('address-book/add');

});

// multipart/form-data
router.post('/add2', upload.none(), async (req, res)=>{
    res.json(req.body);
});

// application/x-www-form-urlencoded
// application/json

router.post('/add', async (req, res)=>{
    const output = {
        success: false,
        error: '',
    }
    /*
    const sql = `INSERT INTO address_book SET ?`;

    const obj = {...req.body, created_at: new Date()}

    const [result] = await db.query(sql, [obj]);

    console.log(result);
    */

    //todo: 資料格式檢查
    const sql = `INSERT INTO address_book(name, email, mobile, birthday, address, created_at) VALUES (?, ?, ?, ?, ?, NOW())`;
    const [result] = await db.query(sql, [
        req.body.name,
        req.body.email,
        req.body.mobile,
        req.body.birthday || null,
        req.body.address,
    ]);
    console.log(result);

    output.success = !!result.affectedRows;   // result.affectedRows 成功會是1， 然後把他轉成布林值 加上『 !! 』

    output.result = result;

    res.json(output);
});

router.get('/delete/:sid', async(req, res)=>{
    const sql = `DELETE FROM address_book WHERE sid=?`;

    const [result] = await db.query(sql,[req.params.sid]);

    res.redirect('/address-book/list');
});

router.get('/edit/:sid', async(req, res)=>{
    const sql = `SELECT * FROM address_book WHERE sid=?`;

    const [result, fields] = await db.query(sql,[req.params.sid]);

    if(!result.length){
        return res.redirect('/address-book/list')
    }

    res.render('address-book/edit', result[0]);
});

router.post('/edit/:sid', async(req, res)=>{
    const output = {
        success: false,
        error: '',
    };

    const sql = `UPDATE address_book SET ? WHERE sid=?`;  // 第一個『？』指的是req.body，  第二個『？』指的是req.params.sid

    const[result] = await db.query(sql, [req.body, req.params.sid]);

    console.log(result);

    output.success = !!result.changedRows;   // result.affectedRows 成功會是1， 然後把他轉成布林值 加上『 !! 』

    output.result = result;

    res.json(output);

});


module.exports = router;