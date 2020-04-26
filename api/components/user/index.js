// default DB
// const store = require('../../../store/mysql');
const store = require('../../../store/remote-mysql')
// controller
const ctrl = require('./controller');

// converting in a function, store injected
module.exports = ctrl(store);
