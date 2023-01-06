const mysql = require('mysql')
const db = mysql.createConnection({
host: "localhost:3306",
user: "root",
password: "",
database:"dmei_sys" 
})

module.exports = db;