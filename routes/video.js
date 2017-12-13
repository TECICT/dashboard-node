var router = require('express').Router();
var fs = require('fs');
var multer = require('multer');
var cors = require('cors');
var mongoose = require('mongoose');
var Settings = mongoose.model('Settings');


router.get('/', function(req, res) {
  Settings.find(function(err, settings) {
    var currentSettings;
    if (settings.length == 0) {
      currentSettings = new Settings();
    } else {
      currentSettings = settings[0];
    }

    const path = currentSettings.video.split('./').pop();
    console.log(path);
    const stat = fs.statSync(path);
    console.log(stat);
    const fileSize = stat.size;
    const range = req.headers.range;

    if (range) {
      const parts = range.replace(/bytes=/, "").split("-");
      var start = parseInt(parts[0], 10);
      const end = parts[1]
        ? parseInt(parts[1], 10)
        : fileSize-1

      
      if (start > fileSize - 1) {
          start = fileSize -1;
      } 

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