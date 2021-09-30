import { createConnection } from 'mysql';
//var mysql = require('mysql'); 
var con = createConnection({
    host: "127.0.0.1",
    port: "3306",
    user: "root",
    password: "therookie49", 
    database: "mySchema"
});

con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");

});

con.query("SELECT * FROM Person", function (err, result) {
    if (err) throw err;
    console.log(result);
});

// var globalVariable = {
//     x : 'variable from demo_db_conn' 
// };

// window.x = "variable from demo_db_conn";

// let x = "variable from demo_db_conn"; 
// export { x }; 