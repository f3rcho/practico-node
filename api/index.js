const express = require('express');
const config = require('../config.js');
const bodyParser= require('body-parser');
const app = express();
const user = require('./components/user/network');
const auth = require('./components/auth/network');

//middleware

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())
// ROUTES
app.use('/api/user', user);
app.use('/api/auth', auth);

// SERVER LISTENING
app.listen(config.api.port, () => {
    console.log(`Api listening on port http://localhost:${config.api.port}/api/user`);
});