const nanoid = require('nanoid');
const auth = require('../auth')

// variable TABLE for user
const TABLA = 'user';

// function created to injec the store
module.exports = function(injectedStore) {
    // validating if store exist
    let store = injectedStore;
    if (!store) {
        store = require('../../../store/dummy');
    }
    // one validation is false use the function require from db
    function list() {
        return store.list(TABLA);
    }
    function get(id) {
        return store.get(TABLA, id);
    }

    async function upsert(body) {
        const user = {
            name: body.name,
            username: body.username,
        }
        if (body.id) {
            user.id = body.id
        } else {
            user.id = nanoid()
        }
        // checking if password exist
        if (body.password || body.username) {
            await auth.upsert({
                id: user.id,
                username: user.username,
                password: body.password,
            })
        }

        return store.upsert(TABLA, user);
    }

    function remove(id) {
        return store.remove(TABLA, id);
    }


    return {
        list,
        get,
        upsert,
        remove,
    };
};