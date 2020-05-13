var express = require('express');
var router = express.Router();
var db = require('../db');
var shortid = require('shortid');
var controller = require("../controllers/contronller.user");
var validation = require("../validation/validation.user")
var loginmiddleware = require("../middleware/middleware.login")


// List user
router.get("/",loginmiddleware.mustlogin,controller.user);
//Find
router.get ('/find' ,controller.find);
//Detail
router.get('/detail/:id', controller.detail);
// Add user
router.get('/add', controller.getAdd)
router.post('/add',validation.postAdd, controller.postAdd);

//Delete user
router.get("/delete", controller.dislaydetele);
router.get('/delete/:id', controller.deteleitem);
//Update
router.get("/update", controller.displayupdate);
router.get('/update/:id', function (req, res) {
    var id = req.params.id;
    var edituser = db.get("users").find({id: id}).value()
    res.render("users/edit",{
        user: edituser
    });
    router.post('/update/:id', function(req, res){
        db.get('users')
            .find({id: id})
            .assign({name: req.body.name})
            // .assign({description: req.body.description})
            .write()
        res.redirect('/users/update')
    });
});


module.exports = router;