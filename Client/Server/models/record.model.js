const mongoose = require('mongoose');
const Schema = mongoose.Schema;


let RecordSchema = new Schema({
    song: { type: String, required: true, max: 30 },
    type: { type: String, required: true, max: 30 },
    info: { type: String, required: true },
    submittedOn: { type: Date, default: Date.now },
}, { collection: 'records', versionKey: false }
);

//automatically record the date of the notice/request/dispute
RecordSchema.pre('save', function (next) {
    now = new Date();
    this.submittedOn = now;
    if (!this.submittedOn) {
        this.submittedOn = now
    }
    next();
});

module.exports = mongoose.model('Record', RecordSchema);