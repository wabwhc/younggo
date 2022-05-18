const mysql = require('mysql');
const env = require('dotenv')


env.config()
const conn = mysql.createConnection({
    host: process.env.host,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database,
    multipleStatements: true 
})
module.exports =  conn
