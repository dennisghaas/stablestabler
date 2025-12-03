require('dotenv').config();
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

    // Handle HTML files with string replacement
    if (ext === ".html") {
        fs.readFile(filePath, "utf8", (err, data) => {  // Add "utf8" encoding
            if (err) {
                res.writeHead(404);
                return res.end("Not found");
            }
            
            const modifiedData = data.replace(
                /\{\{VITE_BASE_API_URL\}\}/g, 
                process.env.VITE_BASE_API_URL || "http://localhost:3005/api"
            );

            res.writeHead(200, { "Content-Type": mime[ext] });
            res.end(modifiedData);
        });
        return;
    }

    // Handle other files (images, etc.) as binary
    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(404);
            return res.end("Not found");
        }
        
        res.writeHead(200, { "Content-Type": mime[ext] || "text/plain" });
        res.end(data);
    });
});

const PORT = process.env.FRONTEND_PORT || 8080;
server.listen(PORT, () => console.log(`Server läuft auf http://localhost:${PORT}`));