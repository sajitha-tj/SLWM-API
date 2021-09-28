const express = require("express");
const UserController = require("../controller/UserController");

const router = express.Router();

router.post('/saveUser',UserController.saveUser);
router.put('/updateUser',UserController.updateUser);
router.delete('/deleteUser',UserController.deleteUser);
router.get('/getUser',UserController.getUser);
router.get('/getAllUsers',UserController.getAllUsers);

module.exports = router;