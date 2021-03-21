const path = require('path'); 		// some convenient dir/path functions
const express = require('express');	// use the express module
const ws = require("ws");
const PORT = process.env.PORT || 5000 // Port should be 5000 by default
const DOMAIN = "https://parker-siroishka-portfolio.herokuapp.com/";

var app = express();			// this is our express.js instance

const MessageType = {
    SERVER_INFO: 0,
    CLIENT1: 1,
    CLIENT2: 2,
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

// app.use(express.static(path.join(__dirname, 'public'))) // lets us serve static files from the "public" directory
// 	.get('/', (req, res) => { // respond to HTTP GET request. '/' is the root endpoint.
// res.sendFile(path.join(__dirname, 'public/pages/index.html')) // serve the landing static page
//     })

// .listen(PORT); // keep the server listening on port 5000
