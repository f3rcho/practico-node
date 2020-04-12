const TABLA = 'auth';

// auth entity
module.exports = function(injectedStore) {
    // validating if store exist
    let store = injectedStore;
    if (!store) {
        store = require('../../../store/dummy');
    }

    function upsert(data) {
        // make sure id is coming
        const authData = {
            id: data.id,
        }
        // spliting to create only data we need
        if (data.username) {
            authData.username = data.username;
        }

        if (data.password) {
            authData.password = data.password;
        }
        return store.upsert(TABLA, authData);
    }

    return {
        upsert,
    }
};