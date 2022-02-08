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

    const output = {
        perPage,
        page,
        totalRows: 0,
        totalPages: 0,
        rows: []
    };

    const totalSql = `SELECT COUNT(1) num FROM address_book`;

    const [result1] = await db.query(totalSql);

    const totalRows = result1[0].num;

    let totalPages = 0;

    if(totalRows){
        output.totalPages = Math.ceil(totalRows/totalPages);
        output.totalRows = totalRows;
        if(page > output.totalPages){
            return res.redirect(`/address-book/list?page=${totalPages}`)
        }

        const sql = `SELECT * FROM address_book LIMIT ${perPage * (page - 1)}, ${perPage}`;
        const [result2] = await db.query(sql);
        result2.forEach(el => el.birthday = res.locals.dateToString(el.birthday));
        output.rows = result2;

        
    };
    return output;
}

router.get('/list', async (req, res)=>{
    
    res.render('address-book/list', await getListData(req, res));
   
});

router.get('/api/list', async (req, res)=>{
    
    res.json(await getListData(req, res));
   
});




module.exports = router;