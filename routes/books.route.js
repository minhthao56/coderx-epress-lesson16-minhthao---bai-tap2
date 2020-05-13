var express = require('express');
var router = express.Router();
var shortid = require('shortid');
var controller = require("../controllers/controller.book")
var db = require('../db');



// List book and find
router.get("/", controller.book);
//Find
router.get ('/find', controller.find);
//Detail
router.get('/detail/:id', controller.detail);
// Add book
router.get('/add', controller.getAdd)
router.post('/add', controller.postAdd);
//Delete book
router.get("/delete",controller.dislaydetele);
router.get('/delete/:id', controller.deteleitem);
//Update
router.get("/update", controller.displayupdate);

router.get('/update/:id', function (req, res) {
    var id = req.params.id;
    var editbook = db.get("titles").find({id: id}).value()
    console.log(editbook);
    res.render("books/edit",{
        title: editbook
    });
    router.post('/update/:id', function(req, res){
        db.get('titles')
            .find({id: id})
            .assign({tl: req.body.tl})
            .assign({description: req.body.description})
            .write()
        res.redirect('/books/update')
    });
});

module.exports = router;
