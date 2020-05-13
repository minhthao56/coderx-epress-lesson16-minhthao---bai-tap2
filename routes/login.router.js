var express = require('express');
var router = express.Router();
var shortid = require('shortid');
var controller = require("../controllers/controller.login")
var db = require('../db');
var validation = require("../validation/validation.user")



router.get("/login", controller.getlogin);

router.post("/login", validation.checkWrongpass,controller.postlogin);

module.exports = router;
