const path = require('path'); 		// some convenient dir/path functions
const express = require('express');	// use the express module
const ws = require("ws");
const PORT = process.env.PORT || 5000 // Port should be 5000 by default
const DOMAIN = "https://parker-siroishka-portfolio.herokuapp.com/";

var app = express();			// this is our express.js instance

const MessageType = {
    SERVER_INFO: 0,
    RHYS: 1,
    GPARENT: 2,
    CALL_REQUEST: 3
};

var wsServer = new ws.Server({ noServer: true });

app
    .use(express.static(path.join(__dirname, "public")))
    .use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", DOMAIN);
        res.header(
            "Access-Control-Allow-Headers",
            "Origin, X-Requested-With, Content-Type, Accept"
        );
        next();
    })
    .get("/", (req, res) => {
        res.sendFile(path.join(__dirname, "public/pages/index.html"));
    })
    .listen(PORT)
    .on("upgrade", (request, socket, head) => {
        wsServer.handleUpgrade(request, socket, head, (socket) => {
            wsServer.emit("connection", socket, request);
        });
    });

var clients = {};

wsServer.on("connection", (socket, request) => {
    // route to endpoint handlers
    switch (request.url) {
        case "/rhys":
            if (!clients.rhys) {
                console.log("Rhys Connected");
                clients.rhys = socket;
                socket.send(
                    JSON.stringify({
                        type: MessageType.SERVER_INFO,
                        message: "Connected to server. Waiting for peer..."
                    })
                );
            } else {
                socket.close(1013, "Rhys already taken. Try again later.");
            }
            break;

        case "/gparent":
            if (!clients.gparent) {
                console.log("Gparent Connected");
                clients.gparent = socket;
                socket.send(
                    JSON.stringify({
                        type: MessageType.SERVER_INFO,
                        message: "Connected to server. Waiting for peer..."
                    })
                );
            } else {
                socket.close(1013, "gparent already taken. Try again later.");
            }
            break;

        default:
            console.log("default");
            socket.close(1000, "Endpoint Not Found");
            break;
    }

    // handle and route messages to endpoint handlers
    socket.onmessage = (mEvent) => {
        var msg = JSON.parse(mEvent.data);
        switch (request.url) {
            case "/rhys": //tut5exB
                if (clients.gparent != undefined) { // clients2 exists, forward the message
                    console.log("Forwarded message from Rhys to gparent");
                    console.log(msg);
                    clients.gparent.send(JSON.stringify(msg));
                } else {
                    clients.rhys.send(
                        JSON.stringify({
                            type: MessageType.SERVER_INFO,
                            message: "Waiting for gparent to connect..."
                        })
                    );
                }
                break;

            case "/gparent": //tut5exc
                if (clients.rhys != undefined) {
                    console.log("Forwarded message from gparent to rhys");
                    console.log(msg);
                    clients.rhys.send(JSON.stringify(msg)); // rhys exists, forward the message
                } else {
                    clients.gparent.send(
                        JSON.stringify({
                            type: MessageType.SERVER_INFO,
                            message: "Waiting for Rhsy to connect..."
                        })
                    );
                }
                break;

            default:
                socket.close(1000, "Endpoint Not Found");
                break;
        }
    };

    socket.onclose = (e) => {
        console.log("Socket closed: " + e.code + " " + e.reason); // debug message to confirm closed socket.
        clearInterval(interval); // stop heartbeat for this socket

        if (e.code == 1001) {
            // code 1001: client closed socket, disconnect all clients and delete them
            for (var s in clients) {
                clients[s].close(4000, "Peer disconnected");
                clients[s] = undefined;
            }
        }
    };

    // establish ping-pong heartbeats
    socket.isAlive = true;
    socket.on("pong", () => {
        // ping-pong heartbeat
        console.log("pong at " + request.url);
        socket.isAlive = true; // a successful ping-pong means connection is still alive
    });

    var interval = setInterval(() => {
        if (socket.isAlive === false) {
            // didn't get a pong back within 10s
            socket.terminate(); // kill the socket in cold blood
            clients[
                request.url.slice(1) /* remove the / from the endpoint name */
            ] = undefined;
            return;
        }

        socket.isAlive = false; // first assume connection is dead
        socket.ping(); // do the "heartbeat" to 'revive' it
    }, 10000); // 10s
});
























// app.use(express.static(path.join(__dirname, 'public'))) // lets us serve static files from the "public" directory
// 	.get('/', (req, res) => { // respond to HTTP GET request. '/' is the root endpoint.
// res.sendFile(path.join(__dirname, 'public/pages/index.html')) // serve the landing static page
//     })

// .listen(PORT); // keep the server listening on port 5000
