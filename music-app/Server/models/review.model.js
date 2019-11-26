const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//structure for each db record
let ReviewSchema = new Schema({
    song: {type: String, required: true, max: 30},
    rating: {type: Number, required: true, max: 5},
    review: {type: String, required: false},
    submittedBy: {type: String, required: true, max: 100},
    submittedOn: {type: Date, default:Date.now},
}, {collection:'review'}
);

// Sets the submitted on parameter equal to the current time
ReviewSchema.pre('save', function(next){
    now = new Date();
    this.submittedOn = now;
    if(!this.submittedOn) {
        this.submittedOn = now
    }
    next();
});

// create and export a js object with schema snd database instance
module.exports = mongoose.model('Review', ReviewSchema);