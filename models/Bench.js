var mongoose = require('mongoose');
var User = mongoose.model('User');

var BenchSchema = new mongoose.Schema({
    firstName: {type: String},
    lastName: {type: String},
    function: {type: String},
    since: {type: String},
    accountManager: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
}, {timestamps: true});

BenchSchema.methods.toJSON = function(){
  return {
    firstName: this.firstName,
    lastName: this.lastName,
    function: this.function,
    since: this.since,
    accountManager: this.accountManager
  };
};

mongoose.model('Bench', BenchSchema);
