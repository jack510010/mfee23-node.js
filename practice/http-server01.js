const http = require('http');

const server = http.createServer((req,res) => {
    console.log(req.url);
    res.writeHead(200,{
        'Content-Type':'text/html'
    });
    res.write(`<div>456</div>`);
    res.end(`<h2>hola</h2>
    <p>${req.url}</p>
    `);
});

server.listen(3000);