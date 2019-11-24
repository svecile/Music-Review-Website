const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//structure for each db record
let SongSchema = new Schema({
    header: {type: String, Default: 'TAG', required: true, max: 3},
    title: {type: String, required: true, max: 30},
    artist: {type: String, required: true, max: 30},
    album: {type: String, required: false, max: 30},
    year: {type: Number, required: false, max: 9999},
    comment: {type: String, required: false, max: 30},
    zeroByte: {type: Number, required: false},
    track: {type: Number, required: false},
    genre: {type: Number, required: false},
    submittedBy: {type: String, required: false, max: 100},
    submittedOn: {type: Date, required: false},
    numratings: {type: Number, required: false},
    averageRating: {type: Number, required: false, max: 5},
    hidden: {type: Boolean, Default: false, required: false}
}, {collection:'song'}
);

// create and export a js object with schema snd database instance
module.exports = mongoose.model('Song', SongSchema);