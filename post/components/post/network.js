const express = require('express');

const response = require('../../../network/response');
const Controller = require('./index');

const router = express.Router();

//Routes
router.get('/', list);
router.get('/:id', get);
router.post('/', upsert)
router.delete('/:id', remove)
router.put('/', upsert)
//Functions
function list(req, res, next) {
    Controller.list()
        .then(data => {
            response.success(req, res, data, 200)
        })
        .catch(next);
};

function get(req, res, next) {
    Controller.get(req.params.id)
        .then(post => {
            response.success(req, res, post, 200)
        })
        .catch(next);
};

function upsert(req, res, next) {
    Controller.upsert(req.body)
        .then((post) => {
            response.success(req, res, 'post created', 201);
        })
        .catch (next);
};

function remove(req, res, next) {
    Controller.remove(req.body)
        .then(post => {
            response.success(req, res, `Post ${req.params.id} deleted`, 200)
        })
        .catch(next);
};
module.exports = router;