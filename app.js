var http = require('http'),
    url = require('url')
    fs = require('fs')
var port = process.env.PORT || 3000
http.createServer(function(req, res) {
    console.log(url.parse(req.url,true));
    var req_url = url.parse(req.url,true);
    var file_url = './build/' + (req_url.pathname == '/' ? 'index.html' : req_url.pathname)
    fs.readFile(file_url, function(err, html) {
        if (err) {
            var message404 = "There is no such page! <a href='/'>Back to home page</a>"
            res.writeHead(404, {'Content-Type': 'text/html', 'Content-Length': message404.length})
            res.write(message404)
        } else {
            res.writeHead(200, {'Content-Type': 'text/html', 'Content-Length': html.length})
            res.write(html)
        }
        res.end()
    })
}).listen(port)
