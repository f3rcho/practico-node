const express = require('express');

const response = require('../../../network/response');
const Controller = require('./index');

const router = express.Router();

router.get('/', function(req, res) {
    Controller.list()
        .then((lista) => {
            response.success(req, res, lista, 200);
        })
        .catch ((err) => {
            response.error(req, res, err.message, 500);
        });
})
router.get('/:id', function(req, res) {
    Controller.get(req.params.id)
        .then((user) => {
            response.success(req, res, user, 200);
        })
        .catch ((err) => {
            response.error(req, res, err.message, 500);
        });
});
router.post('/', function(req, res) {
    Controller.upsert(req.body)
        .then((user) => {
            response.success(req, res, user, 201);
        })
        .catch((err) => {
            response.error(req, res, err.message, 500);
        })
});

router.delete('/:id', function(req, res) {
    console.log(req.params, 'network')
    Controller.remove(req.params.id)
        .then((user) => {
            response.success(req, res, user, 200);
        })
        .catch((err) => {
            response.error(req, res, err.message, 500);
        });
});

module.exports = router;