const nanoid = require('nanoid');
const auth = require('../auth')

// variable TABLE for user
const TABLA = 'user';

// function created to injec the store
module.exports = function(injectedStore, injectedCache) {
    // validating if store exist
    let store = injectedStore;
    let cache = injectedCache
    if (!store) {
        store = require('../../../store/dummy');
    }
    if (!cache) {
        cache = require('../../../store/dummy');
    }
    // one validation is false use the function require from db
    async function list() {
        let users = await cache.list(TABLA);

        if (!users) {
            console.log('No estaba en cache. Buscando en DB')
            users = await store.list(TABLA)
            cache.upsert(TABLA, users);
        } else {
            console.log('nos traemos de cache');
        }
        return users;
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

    function follow(from, to) {
        return store.upsert(TABLA + '_follow', {
            user_from: from,
            user_to: to,
        })
    }

    async function following(user) {
        const join = {}
        join[TABLA] = 'user_to'; // { user: 'user_to' }
        const query = { user_from: user };

        return await store.query(TABLA + '_follow', query, join)
    }

    return {
        list,
        get,
        upsert,
        remove,
        follow,
        following,
    };
};