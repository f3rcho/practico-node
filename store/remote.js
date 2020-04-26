const request = require('request');

//function constructed
function createRemoteDB(host, port) {
    // url base to all
    const URL = 'http://' + host + ':' + port;

    //functions
    function list(table) {
        //request type GET
        return req('GET', table);
    };

    function get(table, id) {
        return req('GET', table, id);
    };

    function insert(table, data) {
        console.log(table, 'insert');

        return req('POST', table, data)
    }

    function update(table, data) {
        return req('PUT', table, data)
    }

    function upsert(table, data) {
        if (data.id) {
            return update(table, data);
        }
        return insert(table, data);
    };

    function query(table, query, join) {
        return req('POST', table + '/query', { query, join });
    };

    function remove(table, id) {
        return req('DELETE', table, id);
    };

    function req(method, table, data) {
        //setting url
        let url = URL + '/' + table;
        body = '';

        if (method === 'GET' && data) {
            url += '/' + data;
        } else if (data) {
            body = JSON.stringify(data)
        // console.log(body, 'body req')
        }
        //execute the request
        return new Promise((resolve, reject) => {
            request({
                url,
                method,
                body,
                headers: {
                    'content-type': 'application/json'
                }
            },(err, req, body) => {
                // console.log(body, 'body req 2')

                if (err) {
                    console.error('Remote base error', err)
                    return reject(err.message);
                }
                // const res = JSON.stringify(body)
                const resp = JSON.parse(body);
                console.log(body, 'resp');

                return resolve(resp.body);
            })
        })

    }

    return {
        list,
        get,
        upsert,
        remove,
        query,
    }
}

module.exports = createRemoteDB;