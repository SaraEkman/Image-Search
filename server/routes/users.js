var express = require('express');
var router = express.Router();
const { getUsers } = require('../controllers/users.controller');

/* GET users listing. */
router.get('/', getUsers);

module.exports = router;
