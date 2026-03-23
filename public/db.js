const mysql = require("mysql2");

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "trackwise",
    port: 3307   // 👈 since we changed port
});

db.connect((err) => {
    if (err) {
        console.log("Database error");
    } else {
        console.log("MySQL Connected");
    }
});

module.exports = db;