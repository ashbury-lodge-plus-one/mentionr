'use strict';

var express = require('express');
var controller = require('./word.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.delete('/:user/:id', controller.removeWord);
router.post('/', controller.addWord);

module.exports = router;
