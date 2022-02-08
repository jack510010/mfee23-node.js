const express = require('express');
const db = require('./../modules/connect-db');
// 路由模組化
const router = express.Router();



router.get('/list', async (req, res)=>{
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
        output.rows = result2;

        
    };

    // res.json(output);
    res.render('address-book/list', output);
});

module.exports = router;