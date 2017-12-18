const express = require('express');
const fs = require('fs-extra');
const path = require('path');
var bodyParser = require('body-parser');
const app = express();
var multer = require('multer');
var cors = require('cors');
var mongoose = require('mongoose');

var counter = 0;

var mongoDB = 'mongodb://localhost/conduit';

app.use(function(req, res, next) { //allow cross origin requests
    res.setHeader("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
    res.header("Access-Control-Allow-Origin", "http://localhost:4200");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Credentials", true);
    next();
});
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
 


mongoose.connect(mongoDB, {
  useMongoClient: true
});
mongoose.Promise = global.Promise;
var db = mongoose.connection;
mongoose.set('debug', true);
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

require('./models/Video');
require('./models/Settings');

app.use(require('./routes'));


var storage = multer.diskStorage({ //multers disk storage settings
    destination: function (req, file, cb) {
        cb(null, './assets/');
    },
    filename: function (req, file, cb) {
        var datetimestamp = Date.now();
        cb(null, 'video_' + counter + '_' + file.originalname); 
    }
});

var upload = multer({ //multer settings
                        storage: storage
                    }).single('file');

var Video = mongoose.model('Video');
var Settings = mongoose.model('Settings');

app.post('/video/upload', cors(), function(req, res) {
    upload(req,res,function(err){
        Settings.find(function(err, settings) {
          var currentSettings;
          if (settings.length == 0) {
            currentSettings = new Settings();
          } else {
            currentSettings = settings[0];
            fs.removeSync(currentSettings.video);
          }

          currentSettings.video = req.file.destination + 'video_' + counter + '_' + req.file.originalname;
          currentSettings.save(function(err, settings) {
            if(err){
              res.json({error_code:1,err_desc:err});
              return;
            }
            counter = counter + 1;
            console.log('new video file');
            res.json({error_code:0,err_desc:null});
          })
        })
    });
});

// te

app.listen(process.env.PORT || 3000, function () {
  console.log('Listening on port 3000!')
});