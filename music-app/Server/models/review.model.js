const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//structure for each db record
let ReviewSchema = new Schema({
    song: {type: String, required: true, max: 30},
    rating: {type: Number, required: true, max: 5},
    submittedBy: {type: String, required: true, max: 100},
    submittedOn: {type: Date, required: true},
}, {collection:'review'}
);

// create and export a js object with schema snd database instance
module.exports = mongoose.model('Review', ReviewSchema);