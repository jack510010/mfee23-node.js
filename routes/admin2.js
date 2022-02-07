const express = require('express');

// 路由模組化
const router = express.Router();

router.get('/apple/:p1?/:p2?', (req, res) => {
    res.locals.aaa += ' sexy'   // 自定義 middleware ， 會對到index.js檔案的自定義 middleware   測試用：忽略
    res.json({
        params: req.params,
        url: req.url,
        baseUrl: req.baseUrl,
        originalUrl: req.originalUrl,
        localsAAA: res.locals.aaa   // 自定義 middleware ， 會對到index.js檔案的自定義 middleware  測試用：忽略
    });
});

module.exports = router;  // 匯出router， 原則上這就是一個middleware。
