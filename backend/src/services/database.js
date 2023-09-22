const mysql = require("mysql2");

const config = require("config");

const connection = mysql.createConnection(config.get("db"));



// exports.asynconn;

module.exports = connection;