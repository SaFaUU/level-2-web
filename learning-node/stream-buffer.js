const http = require('http');
const fs = require('fs');

// creating a server using raw node.js
const server = http.createServer((req, res) => {

})

server.on('request', (req, res) => {
    console.log(req.url, req.method);
    if (req.url === '/read-file' && req.method === 'GET') {
        const readableStream = fs.createReadStream(__dirname + '/texts/read.txt');
        readableStream.on('data', (chunk) => {
            res.statusCode = 200;
            res.write(chunk);
        })
        readableStream.on('end', () => {
            res.statusCode = 200;
            res.end("The file has been read");
        })
        readableStream.on('error', (err) => {
            res.statusCode = 500;
            res.end(err);
        })
    }
})

server.listen(5000, () => {
    console.log('listening on port 5000');
})