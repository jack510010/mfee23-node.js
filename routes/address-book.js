const express = require('express');
const db = require('./../modules/connect-db');
// 路由模組化
const router = express.Router();



router.get('/list', async (req, res)=>{
    const perPage = 5;

    let page = req.query.page ? parseInt(req.query.page) : 1;

    const output = {
        perPage,
        page,
        totalRows: 0,
        totalPages: 0,
        rows: []
    };

    const totalSql = `SELECT COUNT(1) num FROM address_book`;

    const [result] = await db.query(totalSql);

    const totalRows = result[0].num;

    let totalPages = 0;

    if(totalRows){
        output.totalPages = Math.ceil(totalRows/totalPages);
        output.totalRows = totalRows;


    };

    res.json(output);
});

module.exports = router;