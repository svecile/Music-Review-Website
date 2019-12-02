const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//token schema for verifying email
let TokenSchema = new Schema({
    _userId: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    token: { type: String, required: true },
    createdAt: { type: Date, required: true, default: Date.now, expires: 43200 }
}, { collection: 'verificationTokens', versionKey: false }
);

// Sets the submitted on parameter equal to the current time
TokenSchema.pre('save', function (next) {
    now = new Date();
    this.createdAt = now;
    if (!this.createdAt) {
        this.createdAt = now
    }
    next();
});

module.exports = mongoose.model('VerificationToken', TokenSchema);