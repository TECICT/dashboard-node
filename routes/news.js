var router = require('express').Router();
var mongoose = require('mongoose');
const https = require('https');
var parseString = require('xml2js').parseString;

router.get('/', function(req, res) {
  https.get('https://www.vrt.be/vrtnws/nl.rss.headlines.xml', (resp) => {

    let data = '';
    // A chunk of data has been recieved.
    resp.on('data', (chunk) => {
      data += chunk;
    });

    resp.on('end', () => {
      if (resp.statusCode === 200) {
        try {
          parseString(data, function(err, result) {
            return res.json(result);
          });
        } catch(e) {
          return res.json({error: e});
        }
      } else {
        return res.json({error: resp.statusCode});
      }
    });
  }).on('error', function(err) {
    console.log('Error: ', err);
    return res.json({error: err});
  })
});



module.exports = router;