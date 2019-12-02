const PrivacyPolicy = require('../models/privacy.model');
const DMCAPolicy = require('../models/DMCA.model');

//get the most recent privacy policy for display
exports.get_pPolicy = function (req, res) {
    PrivacyPolicy.find({}, null, { sort: { submittedOn: -1 }, limit: 1 }, function (err, policy) { //get all reviews for a song
        if (err) return console.error(err);

        res.send(policy);
    });
};

//get the most recent DMCA policy for display
exports.get_policy = function (req, res) {
    DMCAPolicy.find({}, null, { sort: { submittedOn: -1 }, limit: 1 }, function (err, policy) { //get all reviews for a song
        if (err) return console.error(err);

        res.send(policy);
    });
};
