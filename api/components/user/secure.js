const auth = require('../../../auth');
// return a new function
module.exports = function checkAuth(action) {

    function middleware(req, res, next) {
        switch(action) {
            //setting all public things
            case 'update':
                const owner = req.body.id;
                auth.check.own(req, owner);
                next();
                break;
            default:
                next();
        }
    }

    return middleware;
}