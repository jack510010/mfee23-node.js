const express = require('express');

// 路由模組化
const router = express.Router();

router.get('/:p3?/:p4?', (req, res) => {    // module 裡面的路徑用相對路徑
    res.json({
        params: req.params,
        url: req.url,
        baseUrl: req.baseUrl,
        originalUrl: req.originalUrl,
    });
});

module.exports = router;  // 匯出router， 原則上這就是一個middleware。


