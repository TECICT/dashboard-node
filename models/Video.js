var mongoose = require('mongoose');

var VideoSchema = new mongoose.Schema({
  filename: String,

}, {timestamps: true});

VideoSchema.methods.toJSONFor = function(){
  return {
    filename: this.filename
  };
};

mongoose.model('Video', VideoSchema);