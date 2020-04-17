// default DB
const store = require('../../../store/mysql');
// controller
const ctrl = require('./controller');

// converting in a function, store injected
module.exports = ctrl(store);
