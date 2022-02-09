const express = require('express');
const db = require('./../modules/connect-db');
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
        result2.forEach(el => el.birthday = res.locals.dateToString(el.birthday));
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

router.post('/add', async (req, res)=>{
    
    

});



module.exports = router;