const express = require('express');
const router = express.Router();
const response = require('../../../network/response');

router.get('/', function(req, res) {

    response.success(req, res, 'Todo correcto', 200);
});

module.exports = router;