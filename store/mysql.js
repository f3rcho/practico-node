const mysql = require('mysql')
const config = require('../config')

const dbconfig = {
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database,
};
// empty connection
let connection;

// connection handler
function handleCon() {
    // our connection will be
    connection = mysql.createConnection(dbconfig);
    // connecting
    connection.connect((err) => {
        // handling error first
        if (err) {
            console.error('[db err ]', err);
            // trying again the connection if theres an error
            setTimeout(handleCon, 2000);
        } else {
            console.log('DB connected');``
        }
    });
    //during connection
    connection.on('error', err => {
        console.error('[db err]', err);
        // if connection is lost
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
        // try it again
            handleCon();
        } else {
            throw err;
        }
    })
}

handleCon();

function list(table) {
    return new Promise((resolve, reject) =>{
        connection.query(` SELECT * FROM ${table}`, (err, data) => {
            if (err) return reject(err)
            resolve (data)
        })
    })
}

function get(table, id) {
    return new Promise((resolve, reject) =>{
        connection.query(` SELECT * FROM ${table} WHERE id='${id}'`, (err, data) => {
            if (err) return reject(err)
            resolve (data)
        })
    })
}

function insert(table, data) {
    return new Promise((resolve, reject) =>{
        connection.query(`INSERT INTO ${table} SET ?`, data, (err, result) => {
            if (err) return reject(err)
            resolve (result);
        });
    });
};

function update(table, data) {
    return new Promise((resolve, reject) =>{
        connection.query(`UPDATE ${table} SET ? WHERE id=?`, [data, data.id], (err, result) => {
            if (err) return reject(err)
            resolve (result);
        });
    });
};

function upsert(table, data) {
    if (data && data.id) {
        return update(table, data);
    } else {
        return insert(table, data);
    }
};

function query(table, query) {
    console.log(query, 'query')
    console.log(table, 'table')

    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM ${table} WHERE ?`, query, (err, res) => {
            if (err) return reject(err);
            resolve(res[0] || null);
        })
    })
}
module.exports = {
    list,
    get,
    upsert,
    query,
}