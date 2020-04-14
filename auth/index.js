const jwt = require('jsonwebtoken');

const config = require('../config')
const error = require('../utils/error');

const secret = config.jwt.secret;

function sign(data) {
    return jwt.sign(data, secret);
};

function verify(token) {
    return jwt.verify(token, secret)
}

const check = {
    own: function(req, owner) {
        // here where we will do all the checking
        const decoded = decodedHeader(req);
        console.log(decoded);
        // ckecking if decoded belong to user
        if (decoded.id !== owner) {
            throw error('Not allow', 401)
        }
    },
}

function getToken(auth) {
    // Bearer a6f5s1e3f5e3f53ef53ef51s3ef5 example
    if (!auth) {
        throw new Error('Not token');
    }
    //checking format token is correct
    if (auth.indexOf('Bearer ') === -1) {
        throw new Error('Invalid format')
    }
    // removing the first part of the token: 'Bearer '
    let token = auth.replace('Bearer ', '');

    return token;
}

function decodedHeader(req) { //receives the request
    //receives authorization header or ''
    const authorization = req.headers.authorization || '';
    // taking out the header
    const token = getToken(authorization);
    // verifying valid token
    const decoded = verify(token);

    req.user = decoded;

    return decoded;
}

module.exports = {
    sign,
    check,
}