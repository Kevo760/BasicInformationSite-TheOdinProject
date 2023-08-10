const http = require('http')
const path = require('path')
const fs = require('fs')

const server = http.createServer((req, res) => {
    // Build file path nased on requested url
    let filePath = path.join(__dirname, 'public', req.url === '/' ? 'index.html' : req.url + '.html');

    fs.readFile(filePath, (err, content) => {
        if(err) {
            if(err.code == 'ENOENT') {
                // Page not found
                fs.readFile(path.join(__dirname, 'public', '404.html'), (err, content) => {
                    res.writeHead(200, {'Content-Type': 'text/html'})
                    res.end(content, 'utf8')
                })
            } else {
                // Some server error
                res.writeHead(500);
                res.end(`Server error ${err.code}`)
            };

        } else {
            res.writeHead(200, { 'Content-Type': 'text/html'});
            res.end(content, 'utf8');
        }
    });
})

const PORT = process.env.PORT || 8080;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`))