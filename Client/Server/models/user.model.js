const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//structure for each db record
let UserSchema = new Schema({
    email: {type: String, required: true, max: 100},
    password: {type: String, required: true},
    isVerified:{type: Boolean, default: false},
    deactivated: {type: Boolean, Default: false},
    admin:{type: Boolean, default: false}
}, {collection:'user', versionKey: false}
);

// create and export a js object with schema snd database instance
module.exports = mongoose.model('User', UserSchema);