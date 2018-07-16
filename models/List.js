var mongoose = require('mongoose');
var User = mongoose.model('User');

var ListSchema = new mongoose.Schema({
    bench: [{type: mongoose.Schema.Types.ObjectId, ref: 'Bench'}],
    jobOffers: [{type: mongoose.Schema.Types.ObjectId, ref: 'JobOffer'}],
    acutes: [{type: mongoose.Schema.Types.ObjectId, ref: 'Acute'}],
    starters: [{type: mongoose.Schema.Types.ObjectId, ref: 'Starter'}],
    stoppers: [{type: mongoose.Schema.Types.ObjectId, ref: 'Stopper'}],
}, {timestamps: true});


mongoose.model('List', ListSchema);
