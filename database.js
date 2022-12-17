const mysql = require('mysql2');
const chalk = require('chalk');
const config = require('./config.json');
const database = new mysql.createConnection({
    host: config.mysql.host,
    user: config.mysql.user,
    port: config.mysql.port,
    password: config.mysql.password,
    database: config.mysql.database
});

database.connect(function(err) {
    if(err) throw err;

    console.log(chalk.blueBright('--> database connected'));
});

module.exports = database;