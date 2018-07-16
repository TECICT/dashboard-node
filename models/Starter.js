var mongoose = require('mongoose');
var User = mongoose.model('User');

var StarterSchema = new mongoose.Schema({
    firstName: {type: String},
    lastName: {type: String},
    function: {type: String},
    startDate: {type: Date},
    customer: {type: String},
    administrationDone: {type: Boolean},
    accountManager: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
}, {timestamps: true});

StarterSchema.methods.toJSON = function(){
  return {
    firstName: this.firstName,
    lastName: this.lastName,
    function: this.function,
    startDate: this.startDate,
    customer: this.customer,
    administrationDone: this.administrationDone,
    accountManager: this.accountManager
  };
};

mongoose.model('Starter', StarterSchema);
