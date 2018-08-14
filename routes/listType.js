var router = require('express').Router();
var mongoose = require('mongoose');
var ListType = mongoose.model('ListType');
var auth = require('./auth');

// preload the params
router.param('listId', function(req, res, next, listId) {
  ListType.findOne({ _id: listId})
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

router.put('/:listId', function(req, res) {
  console.log(req.list);
  Object.keys(req.body).forEach(function(element) {
    if (JSON.stringify(req.list[element]) !== JSON.stringify(req.body[element])) {
      req.list[element] = req.body[element];
    }
  })
  req.list.save().then(function(list) {
    return res.json(list);
  })
});

router.get('/:listId', function(req, res) {
  return res.json(req.list);
});

router.delete('/:listId', function(req, res) {
  req.list.remove()
  .then(function() {
    return res.sendStatus(204);
  })
});

module.exports = router;