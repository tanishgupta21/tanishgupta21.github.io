const express = require("express");
const router = express.Router();
const mysql = require("mysql");
const cors = require("cors");
const fs = require("fs");
const http = require("http");
const https = require("https");
const { dirname } = require("path");
const bcrypt = require("bcryptjs");
const app = express();


const HTTP_PORT = process.env.PORT || 8090;
const HTTPS_PORT = 4433;
const SSL_KEY_FILE = "localhost.decrypted.key";
const SSL_CRT_FILE = "localhost.crt";

const http_options = {
    key: fs.readFileSync(__dirname + "/cert/CA/localhost/" + SSL_KEY_FILE),
    cert: fs.readFileSync(__dirname + "/cert/CA/localhost/" + SSL_CRT_FILE)
}

const mode = "DEV";

var con = mysql.createConnection({
  host: "127.0.0.1",
  port: "3306",
  user: "root",
  password: "therookie49", 
  database: "prodDB"
});

var whitelist = ['http://127.0.0.1:5500', "http://192.168.0.217:5500"];

var corsOptions = {
    origin: function (ori, callback) {
        console.log(ori)
        if (whitelist.indexOf(ori) !== -1 || !ori || mode === "DEV") {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by cors"));
        }
    }
}

function onHttpStart() {
    console.log("Express http server listing on: " + HTTP_PORT);
}

function onHttpsStart() {
    console.log("Express http server listing on: " + HTTPS_PORT);
}

app.use(cors(corsOptions));
app.use(router);

router.get("/test/:id", (req, res) => {
    console.log(req.params.id);

    con.query("SELECT * FROM Product WHERE ProductID = '" + req.params.id + "'", function(err, result, fields) {
        if (err) throw err; 
        res.status(200).send(result);   
    })
});

//http.createServer(app).listen(HTTP_PORT, onHttpStart);
//https.createServer(http_options, app).listen(HTTPS_PORT, onHttpsStart);

app.listen(HTTP_PORT, onHttpStart);


// SELECT * FROM Product WHERE Location = ""; 



