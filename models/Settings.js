var mongoose = require('mongoose');

var SettingsSchema = new mongoose.Schema({
  video: String,
}, {timestamps: true});

SettingsSchema.methods.toJSONFor = function(){
  return {
    video: this.video
  };
};

mongoose.model('Settings', SettingsSchema);
