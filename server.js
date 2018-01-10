const express = require('express');
const fs = require('fs-extra');
const path = require('path');
var bodyParser = require('body-parser');
const app = express();
var multer = require('multer');
var cors = require('cors');
var mongoose = require('mongoose');
var passport = require('passport');

var counter = 0;

var mongoDB = 'mongodb://localhost/dashboard';

app.use(function(req, res, next) { //allow cross origin requests
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS, PUT, DELETE, GET");
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Credentials", true);
    next();
});
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('assets'));
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
require('./models/User');
require('./config/passport');

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
        console.log('helloo');
        console.log(req);
        Settings.find(function(err, settings) {
          var currentSettings;
          if (settings.length == 0) {
            currentSettings = new Settings();
          } else {
            currentSettings = settings[0];
            fs.removeSync(currentSettings.video);
          }

          currentSettings.video = 'assets/video_' + counter + '_' + req.file.originalname;
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

// test

app.listen(process.env.PORT || 3000, function () {
  console.log('Listening on port 3000!')
});