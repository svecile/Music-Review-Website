const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//structure for each db record
let SongSchema = new Schema({
    header: {type: String, Default: 'TAG', required: false, max: 3},
    title: {type: String, required: true, max: 30},
    artist: {type: String, required: true, max: 30},
    album: {type: String, required: false, max: 30},
    year: {type: Number, required: false, max: 9999},
    comment: {type: String, required: false, max: 30},
    zeroByte: {type: Number, required: false, max: 1},
    track: {type: Number, required: false},
    genre: {type: String, required: false, max:30},
    submittedBy: {type: String, required: false, max: 100},
    submittedOn: {type: Date, default:Date.now},
    numRatings: {type: Number, required: false},
    averageRating: {type: Number, required: false, max: 5},
    hidden: {type: Boolean, Default: false}
}, {collection:'song', versionKey: false}
);

SongSchema.index({'$**': 'text'});

// Sets the submitted on parameter equal to the current time
SongSchema.pre('save', function(next){
    now = new Date();
    this.submittedOn = now;
    if(!this.submittedOn) {
        this.submittedOn = now
    }
    next();
});



// create and export a js object with schema snd database instance
module.exports = mongoose.model('Song', SongSchema);