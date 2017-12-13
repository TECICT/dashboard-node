var router = require('express').Router();
var mongoose = require('mongoose');
const http = require('http')

var appId = '82a201e18dca26b6f031f84cc4c43eb2';
var baseUrl ='http://api.openweathermap.org/data/2.5/';
var units = 'metric';

router.get('/:city', function(req, res) {
  http.get(baseUrl +
           'weather?q='+ req.params.city +
           '&appid='+ appId +
           '&units=' + units, (resp) => {

    let data = '';
    // A chunk of data has been recieved.
    resp.on('data', (chunk) => {
      data += chunk;
    });

    resp.on('end', () => {
      if (resp.statusCode === 200) {
        try {
          var json = JSON.parse(data);
          return res.json(json);
        } catch(e) {
          return res.json({error: e});
        }
      } else {
        return res.json({error: resp.statusCode});
      }
    });
  }).on('error', function(err) {
    console.log('Error: ', err);
  })
});



module.exports = router;