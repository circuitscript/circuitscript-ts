const express = require('express')
const ws = require('ws');
const fs = require('fs');

const app = express()

const wsServer = new ws.Server({ noServer: true });
wsServer.on('connection', socket => {

    const fileName = 'output.svg';

    function emitFile(){
        fs.readFile(fileName, 'utf8', (err, data) => {
            if (err) {
                throw err;
            }
            console.log((new Date()).toISOString(), 'send data');
            socket.send(data);
        });
    }

    let emitTimeout = null;
    fs.watch(fileName, (event, targetFile) => {
        if (event === 'change') {
            console.log((new Date()).toISOString(), 'file changed!');

            // emit the change
            clearInterval(emitTimeout);
            emitTimeout = setTimeout(() => {
                emitFile();
            }, 200);
        }
    });

    socket.on('message', message => {
        console.log(message.toString());
        emitFile();
    });
});

app.use(express.static('./'))

const server = app.listen(3000);
server.on('upgrade', (request, socket, head) => {
    wsServer.handleUpgrade(request, socket, head, socket => {
        wsServer.emit('connection', socket, request);
    });
});

console.log('server started');