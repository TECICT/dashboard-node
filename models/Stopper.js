var mongoose = require('mongoose');
var User = mongoose.model('User');

var StopperSchema = new mongoose.Schema({
    firstName: {type: String},
    lastName: {type: String},
    function: {type: String},
    topDate: {type: Date},
    confirmed: {type: Boolean},
    replaceable: {type: Boolean},
    accountManager: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
}, {timestamps: true});

StopperSchema.methods.toJSON = function(){
  return {
    firstName: this.firstName,
    lastName: this.lastName,
    function: this.function,
    topDate: this.topDate,
    confirmed: this.confirmed,
    replaceable: this.replaceable,
    accountManager: this.accountManager
  };
};

mongoose.model('Stopper', StopperSchema);
