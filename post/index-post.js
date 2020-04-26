const express = require('express');
const bodyParser= require('body-parser');

const config = require('../config.js');
const app = express();

const post = require('./components/post/network');
const errors = require('../network/errors');

//middleware

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// ROUTES
app.use('/api/post', post);

app.use(errors);

// SERVER LISTENING
app.listen(config.post.port, () => {
    console.log(`Post service listening on port http://localhost:${config.post.port}/api/post`);
});