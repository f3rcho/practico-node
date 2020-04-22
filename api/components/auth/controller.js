const bcrypt = require('bcrypt');
const auth = require('../../../auth')
const TABLA = 'auth';
const error = require('../../../utils/error')

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
        console.log(password, 'auth controller');
        console.log(data, 'auth data controller');
        console.log(data.password, 'auth data.pass')
        return bcrypt.compare(password, data.password)
            .then(sonIguales => {
                if (sonIguales === true) {
                    // generate token
                    console.log(data, 'inner data')
                    return auth.sign({ ...data});
                } else {
                    throw error('Invalid information')
                }
            })
    }
    async function upsert(data) {
        // make sure id is coming
        const authData = {
            id: data.id,
        }
        // sorting out to create only data we need
        if (data.username) {
            authData.username = data.username;
        }

        if (data.password) {
            authData.password = await bcrypt.hash(data.password, 10);
        }
        return store.upsert(TABLA, authData);
    }

    return {
        upsert,
        login,
    }
};