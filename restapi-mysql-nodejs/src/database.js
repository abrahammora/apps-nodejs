const mysql = require('mysql');

const mysqlConnection = mysql.createConnection({
    host:'127.0.0.1',
    user: 'root',
    password: '',
    database: 'company'
});

mysqlConnection.connect((err) => {
    if(err){
        console.error(err);
        return;
    }else{
        console.log('Connected DB.....');
    }
});

module.exports = mysqlConnection;
