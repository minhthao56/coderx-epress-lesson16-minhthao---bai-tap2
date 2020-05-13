
var shortid = require('shortid');
var db = require('../db');



//List book
module.exports.book = function (req, res) {
    res.render("books/book", {
        titles: db.get("titles").value()
    });
};
// Find
module.exports.find = function(req, res){
    var q = req.query.q;
    var filterlistbook = db.get("titles").filter(function(book){
      var lowercase = book.tl.toLowerCase();
       return lowercase.indexOf(q) !==-1;
    }).write();
    res.render('books/book',{
        titles: filterlistbook
    });
  };
// Detail
module.exports.detail = function (req, res) {
    var id = req.params.id;
    var detailbook = db.get("titles").find({id: id}).value()
    res.render("books/detail", {
        title: detailbook
    })    
  };
  //Add book
module.exports.getAdd = function(req, res){
    res.render('books/add')
};
module.exports.postAdd =function(req, res){
    req.body.id=shortid.generate();
    db.get('titles').push(req.body).write()
    res.redirect('/books')
  };
//Detele
module.exports.dislaydetele = function (req, res) {
    res.render("books/delete", {
        titles: db.get("titles").value()
    });
};
module.exports.deteleitem = function (req, res) {
    var id = req.params.id;
    db.get("titles").remove({id: id}).write();
    res.redirect('/books/delete');
};
//  Update
module.exports.displayupdate = function (req, res) {
    res.render("books/update", {
        titles: db.get("titles").value()

    });
};