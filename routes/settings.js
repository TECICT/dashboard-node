// test
var router = require('express').Router();
var mongoose = require('mongoose');
var Settings = mongoose.model('Settings');
var auth = require('./auth');

router.get('/', function(req, res) {
  Settings.find(function(err, settings) {
    var currentSettings;
    if (settings.length == 0) {
      currentSettings = new Settings();
    } else {
      currentSettings = settings[0];
    }
    return res.json(currentSettings.toJSON());
  });
});

router.put('/', auth.required, function(req, res) {
  Settings.find(function(err, settings) {
    var currentSettings;
    console.log('put');
    console.log(req.body.settings);
    if (settings.length == 0) {
      currentSettings = new Settings();
    } else {
      currentSettings = settings[0];
    }
    if (typeof req.body.settings.location_weather !== 'undefined') {
      currentSettings.location_weather = req.body.settings.location_weather;
    }
    if (typeof req.body.settings.location_maps !== 'undefined') {
      currentSettings.location_maps = req.body.settings.location_maps;
    }
    currentSettings.save().then(function(settings) {
      return res.json(settings.toJSON());
    })
  });
});

module.exports = router;