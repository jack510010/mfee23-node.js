const WebSocket = require('ws');

const createEchoServer = server => {


    const wsServer = new WebSocket.Server({server});

    wsServer.on('connection', (ws, req) => {

        console.log('連線數:', wsServer.clients.size);
        console.log('', );
        ws.on('message', message => {
            ws.send(message.toString());
        });
        
        ws.send('連線了喔，Hi~~');
    });
};

module.exports = createEchoServer;