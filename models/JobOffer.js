var mongoose = require('mongoose');
var User = mongoose.model('User');

var JobOfferSchema = new mongoose.Schema({
    name: {type: String},
    customer: {type: String},
    accountManager: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
}, {timestamps: true});

JobOfferSchema.methods.toJSON = function(){
  return {
    name: this.name,
    customer: this.customer,
    accountManager: this.accountManager
  };
};

mongoose.model('JobOffer', JobOfferSchema);
