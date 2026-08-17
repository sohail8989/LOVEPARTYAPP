const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);

    // CORS headers allow karne ke liye taake app se request block na ho
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');

    if (parsedUrl.pathname === '/getToken') {
        const userID = parsedUrl.query.userID;
        if (!userID) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: "UserID is required" }));
            return;
        }

        // Testing ke liye token response
        const token = "DUMMY_TOKEN_FOR_TESTING"; 

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ token: token }));
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end("Not Found");
    }
});

server.listen(3000, '0.0.0.0', () => {
    console.log('Server running on port 3000');
});
