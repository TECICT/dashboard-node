var router = require('express').Router();
var fs = require('fs');
var multer = require('multer');
var cors = require('cors');
var mongoose = require('mongoose');
var Settings = mongoose.model('Settings');


router.get('/', function(req, res) {
  console.log('there is a GET request');
  Settings.find(function(err, settings) {
    var currentSettings;
      if (settings.length == 0) {
        currentSettings = new Settings();
      } else {
        currentSettings = settings[0];
      } 
      console.log(currentSettings);
      const path = currentSettings.video.split('./').pop();
      console.log(path);
      const stat = fs.statSync(path);
      console.log('stat');
      console.log(stat);
      const fileSize = stat.size;
      const range = req.headers.range;
      console.log('range');
      console.log(range);

      if (range) {
        const parts = range.replace(/bytes=/, "").split("-");
        console.log('parts');
        console.log(parts);
        var start = parseInt(parts[0], 10);
        const end = parts[1]
          ? parseInt(parts[1], 10)
          : fileSize-1

        
        if (start > fileSize - 1) {
            start = fileSize -1;
        } 

        console.log('start end');
        console.log(start);
        console.log(end);
        const chunksize = (end-start)+1
        const file = fs.createReadStream(path, {start, end})
        const head = {
          'Content-Range': `bytes ${start}-${end}/${fileSize}`,
          'Accept-Ranges': 'bytes',
          'Content-Length': chunksize,
          'Content-Type': 'video/mp4',
        }

        res.writeHead(206, head)
        file.pipe(res)
      } else {
        console.log('we are in the else statement');
        const head = {
          'Content-Length': fileSize,
          'Content-Type': 'video/mp4',
        }
        res.writeHead(200, head)
        fs.createReadStream(path).pipe(res)
      }
  })
  
});

module.exports = router;