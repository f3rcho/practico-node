// default DB
// const store = require('../../../store/mysql');
const config = require('../../../config');

let store, cache;

if (config.remoteDB === true) {
    store = require('../../../store/remote-mysql')
    cache = require('../../../store/remote-cache')
} else {
    store = require('../../../store/mysql')
    cache = require('../../../store/redis')
}

// controller
const ctrl = require('./controller');

// converting in a function, store injected
module.exports = ctrl(store, cache);
