import express, { Router } from 'express';
const router = Router();
import { createConnection } from 'mysql';
const app = express();

const HTTP_PORT = process.env.PORT || 8080;

var con = createConnection({
  host: "127.0.0.1",
  port: "3306",
  user: "root",
  password: "therookie49", 
  database: "mySchema"
});

function testQuery () {
    con.query("SELECT * FROM Person", function(err, result, fields) {
        if (err) throw err; 
        console.log(result); 
    })
}


function onHttpStart() {
    console.log("Express http server listing on: " + HTTP_PORT);
}

app.use(router);

router.get("/test", (res, req) => {
    testQuery();
});

app.listen(HTTP_PORT, onHttpStart);