const http = require("http");
const fs = require("fs");
const path = require("path");

const server = http.createServer((req, res) => {
    let filePath = "." + (req.url === "/" ? "/index.html" : req.url);
    let ext = path.extname(filePath);

    const mime = {
        ".html": "text/html",
        ".js": "text/javascript",
        ".css": "text/css",
        ".png": "image/png",
        ".jpg": "image/jpeg",
        ".jpeg": "image/jpeg",
        ".gif": "image/gif",
    };

    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(404);
            return res.end("Not found");
        }
        res.writeHead(200, { "Content-Type": mime[ext] || "text/plain" });
        res.end(data);
    });
});

server.listen(8080, () => console.log("Server läuft auf http://localhost:8080"));