const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    fs.writeFile(__dirname + '/header01.txt', JSON.stringify(req.headers), error => {
        if (error) return console.log(error);
        console.log('HTTP檔頭儲存');
        fs.readFile(__dirname + '/header01.txt', (error, data) => {
            if (error) {
                res.writeHead(500, {
                    'Content-Type': 'text/plain'
                });
                res.end('500 - data01.html not found');
            } else {
                res.writeHead(200, {
                    'Content-Type': 'text/html'
                });
                res.end(data);
            }
        });
    });
    

});

server.listen(3001);