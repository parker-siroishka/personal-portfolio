

var path = require('path'); 		// some convenient dir/path functions
const Gauge = require("svg-gauge");
var express = require('express');	// use the express module
var app = express();			// this is our express.js instance
const PORT = process.env.PORT || 5000 // Port should be 5000 by default

app.use(express.static(path.join(__dirname, 'public'))) // lets us serve static files from the "public" directory
	.get('/', (req, res) => { // respond to HTTP GET request. '/' is the root endpoint.
res.sendFile(path.join(__dirname, 'public/pages/index.html')) // serve the landing static page
    })

.listen(PORT); // keep the server listening on port 5000

// const {Pool, Client } = require('pg');
// const pool = new Pool({
//     user: process.env.DB_USER,
//     host: process.env.DB_HOST,
//     database: process.env.DB,
//     password: process.env.DB_PASSWORD,
//     port: process.env.DB_PORT
// });

// const client = new Client({
//     connectionString: process.env.DATABASE_URL,
//     ssl: {
//       rejectUnauthorized: false
//     }
//   });

//   client.query('SELECT table_schema,table_name FROM information_schema.tables;', (err, res) => {
//     if (err) throw err;
//     for (let row of res.rows) {
//       console.log(JSON.stringify(row));
//     }
//     client.end();
//   });