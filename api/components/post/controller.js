const nanoid = require('nanoid');
const TABLA = 'post';

module.exports = function(injectedStore) {
    // validating if store exist
    let store = injectedStore;
    if (!store) {
        store = require('../../../store/dummy');
    }
    // one validation is false use the function require from db
    function list() {
        return store.list(TABLA)
    }

    function get(id) {
        return store.get(TABLA, id);
    }

    async function upsert(body) {
        const post = {
            text: body.text,
            user: body.user,
        }
        if (body.id) {
            post.id = body.id
        } else {
            post.id = nanoid()
        }
        if (body.password || body.username) {
            await auth.upsert({
                id: user.id,
                username: user.username,
                password: body.password,
            })
        }

        return store.upsert(TABLA, post);
    };

    function remove(id) {
        return store.remove(TABLA, id);
    }

    return {
        list,
        get,
        upsert,
        remove,
    }
}