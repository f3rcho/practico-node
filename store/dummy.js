const db = {
    'user': [
        { id: '1', name: 'Carlos'},
        { id: '2', name: 'Fernando'},
    ],
};

async function list(tabla) {
    return db[tabla] || [];
};

async function remove(tabla, id) {
    console.log(id, 'async')

    for(let i = 0; i < db.user.length; i++){
        if(db.user[i].id == id){
            idRemoved = db.user[i].id;
            console.log(idRemoved, 'if')
            delete db.user[i];
            return `User with the id:${idRemoved} deleted`;
        }
    }
};
async function get(tabla, id) {
    let col = await list(tabla);
    return col.filter( item => item.id === id)[0] || null;
};

async function upsert(tabla, data) {
    if(!db[tabla]) {
        db[tabla] = [];
    }
    db[tabla].push(data);
    console.log(db);
};
async function query(tabla, q) {
    let col = await list(tabla);
    let keys = Object.keys(q);
    let key = keys[0];
    console.log(col, 'col')
    console.log(key, 'key')
    console.log(keys, 'keys')
    return col.filter( item => item[key] === q[key])[0] || null;
};


module.exports = {
    list,
    get,
    upsert,
    remove,
    query,
};