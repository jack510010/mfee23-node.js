const http = require('http');
const fs = require('fs');

const server = http.createServer((req,res) => {
    res.writeHead(200,{
        'Content-Type': 'text/html; charset=utf-8'
    })
    fs.writeFile(__dirname + '/headers.txt', JSON.stringify(req.headers, null, 3), error =>{
        if(error){
            console.log(error);
            res.end('error')
        }else{
            res.end('沒問題');
        }
    });
    
});

server.listen(3000);