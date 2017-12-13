var mongoose = require('mongoose');

var SettingsSchema = new mongoose.Schema({
  video: {type: String, default: './'},
  location_weather: {type: String, default: 'Brussels'},
  location_maps: {type: String, default: 'Grimbergen'}
}, {timestamps: true});

SettingsSchema.methods.toJSON = function(){
  return {
    video: this.video,
    location_weather: this.location_weather,
    location_maps: this.location_maps
  };
};

mongoose.model('Settings', SettingsSchema);
