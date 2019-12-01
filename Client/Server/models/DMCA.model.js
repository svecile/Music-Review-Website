const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//structure for each db record
let DMCASchema = new Schema({
    name: {type: String, required: true},
    policy: {type: String, required: true},
    submittedOn: {type: Date, default:Date.now}
}, {collection:'DMCAPolicy', versionKey: false}
);

// Sets the submitted on parameter equal to the current time
DMCASchema.pre('save', function(next){
    now = new Date();
    this.submittedOn = now;
    if(!this.submittedOn) {
        this.submittedOn = now
    }
    next();
});
// create and export a js object with schema snd database instance
module.exports = mongoose.model('DMCAPolicy', DMCASchema)