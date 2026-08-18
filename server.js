const http = require('http');
const WebSocket = require('ws');

const server = http.createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: 'Lover Party Game Server Running' }));
});

const wss = new WebSocket.Server({ server });

let currentMultiplier = 1.00;
let gameStatus = 'waiting';
let countdown = 5;
let roundId = 835;

// Real-Time Game Loop
setInterval(() => {
    if (gameStatus === 'waiting') {
        countdown--;
        if (countdown <= 0) {
            gameStatus = 'running';
            currentMultiplier = 1.00;
            roundId++;
        }
    } else if (gameStatus === 'running') {
        currentMultiplier = +(currentMultiplier + 0.05).toFixed(2);
        // Random crash point between 2x and 15x
        if (currentMultiplier >= (Math.random() * 10 + 2)) {
            gameStatus = 'crashed';
            setTimeout(() => {
                gameStatus = 'waiting';
                countdown = 5;
            }, 3000);
        }
    }

    const payload = JSON.stringify({
        status: gameStatus,
        countdown: countdown,
        roundId: roundId,
        multiplier: currentMultiplier
    });

    wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(payload);
        }
    });
}, 500);

server.listen(3000, '0.0.0.0', () => {
    console.log('🚀 Lover Party Real-Time Server running on port 3000');
});
