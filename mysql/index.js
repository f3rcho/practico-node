const express = require('express');
const bodyParser = require('body-parser');

const config = require('../config');
const router = require('./network')

const app = express();

app.use(bodyParser.json());

//routes
app.use('/', router)

app.listen(config.mysqlService.port, () => {
    console.log('mysql service listening on port', config.mysqlService.port)
})