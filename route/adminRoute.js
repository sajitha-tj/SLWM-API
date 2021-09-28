const express = require('express');
const AdminController = require('../controller/adminController');

const router = express.Router();

router.post('/register',AdminController.register);
router.get('/login',AdminController.login);
router.get('/changePassword',AdminController.changePassword);
router.get('/getAccData',AdminController.getAccData);

module.exports = router;