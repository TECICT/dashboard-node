var mongoose = require('mongoose');

var ListTypeSchema = new mongoose.Schema({
    listName: {type: String, unique: true},
    labels: [new mongoose.Schema({
        key: {type: String},
        type: {type: String, enum: ['text', 'number', 'checkbox', 'Date']},
        critical: {type: String, enum: ['no', 'yes', 'reverse'], default: 'no'},
    })],
    items: [mongoose.Schema.Types.Mixed]
}, {timestamps: true});

mongoose.model('ListType', ListTypeSchema);
