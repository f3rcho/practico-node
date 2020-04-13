const auth = require('../../../auth')
const TABLA = 'auth';

// auth entity
module.exports = function(injectedStore) {
    // validating if store exist
    let store = injectedStore;
    if (!store) {
        store = require('../../../store/dummy');
    }

    async function login(username, password) {
        //defining where is the dat a coming
        const data = await store.query(TABLA, { username: username })
        console.log(data, 'auth controller');
        if (data.password === password) {
            // generate token
            return auth.sign(data);
        } else {
            throw new Error('Invalid information')
        }
    }
    function upsert(data) {
        // make sure id is coming
        const authData = {
            id: data.id,
        }
        // sorting out to create only data we need
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
        login,
    }
};