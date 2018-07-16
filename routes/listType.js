var router = require('express').Router();
var mongoose = require('mongoose');
var ListType = mongoose.model('ListType');
var auth = require('./auth');

// preload the params
router.param('listName', function(req, res, next, listName) {
  ListType.findOne({ listName: listName})
    .then(function (list) {
      if (!list) { return res.sendStatus(404); }

      req.list = list;

      return next();
    }).catch(next);
});

// get all the lists
router.get('/', function(req, res) {
  ListType.find()
  .then(function(allLists){
    return res.json(allLists);
  })
});

router.post('/', function(req, res) {
  var newListType = new ListType(req.body);
  return newListType.save(function(err, listType) {
    if (err) return res.json(err);
    return res.json(listType);
  })
});

router.put('/:listname', function(req, res) {
  ListType.findOne(req.list)
  .then(function(list) {
    Object.keys(req.body).forEach(function(element) {
      if (JSON.stringify(list[element]) !== JSON.stringify(req.body[element])) {
        list[element] = req.body[element];
      }
    })
    list.save().then(function(list) {
      return res.json(list);
    })
  })
});

router.get('/:listName', function(req, res) {
  ListType.findOne(req.list)
  .then(function(list){
    return res.json(list);
  })
});

router.delete('/:listName', function(req, res) {
  ListType.findOne(req.list)
  .then(function(list){
    list.remove()
    .then(function() {
      return res.sendStatus(204);
    })
  })
});

module.exports = router;