var mongoose = require('mongoose');
var User = mongoose.model('User');

var AcuteSchema = new mongoose.Schema({
    firstName: {type: String},
    lastName: {type: String},
    function: {type: String},
    availability: {type: String},
    payroll: {type: Boolean},
    accountManager: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
}, {timestamps: true});

AcuteSchema.methods.toJSON = function(){
  return {
    id: this._id,
    firstName: this.firstName,
    lastName: this.lastName,
    function: this.function,
    availability: this.availability,
    payroll: this.payroll,
    accountManager: this.accountManager
  };
};

mongoose.model('Acute', AcuteSchema);
