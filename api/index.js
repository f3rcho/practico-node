const express = require('express');
const config = require('../config.js');
const app = express();
const user = require('./components/user/network');
// ROUTES
app.use('/api/user', user);

// SERVER LISTENING
app.listen(config.api.port, () => {
    console.log(`Api listening on port http://localhost:${config.api.port}/api/user`);
});