const User = require('../models/user.model');
const Song = require('../models/song.model');
const PrivacyPolicy=require('../models/privacy.model')
//make a user an admin
exports.set_admin = function (req, res) {
    User.updateOne({ email: req.body.word }, { admin: true }, function (err, results) {
        if (results == null) {
            res.send(JSON.stringify(`cannot find ${req.body.word} usr account`));
            console.log('User doesnt exist');

        } else if (err) {
            res.send(JSON.stringify('User doesnt exist'));
            return console.error(err);
        }
        res.send(JSON.stringify(req.body.word + ' is now an admin'))
    });
};

exports.set_hidden_flag = function (req, res) {

    Song.update({ title: req.body.title, artist: req.body.artist }, { hidden: req.body.hidden }, function (err, results) {
        if (results == null) {
            res.send(JSON.stringify('Song not found'));
            return console.log('song not found');

        } else if (err) {
            return console.error(err);
        }
        res.send(JSON.stringify('Song hidden flag sucessfully updated'));
        return;
    });
};

//set user account as active or deactiveated
exports.set_user_activity = function (req, res) {
    User.updateOne({ email: req.body.email }, { deactivated: req.body.deactivated }, function (err, results) {
        if (results == null) {
            res.status(401).send(` ${req.body.email} user doesnt exist`);
            console.log('User doesnt exist');

        } else if (err) {
            return console.error(err);
        }
        res.send(JSON.stringify(req.body.email + ' activity level changed'))
    });
};

exports.policy_create = function (req, res) {
    let policy = new PrivacyPolicy(
        {
            name:req.body.name,
            policy: req.body.policy
        }
    );

    //save data to database
    policy.save(function (err) {
        if (err) {
            res.send(JSON.stringify('Error policy and name must be entered!'))
            return console.error(err);
        }else{
            console.log('Policy Created Sucessfully');
            res.send(JSON.stringify('Policy created successfully'));
        }
    });
};

exports.update_policy = function (req, res) {
    PrivacyPolicy.update({name: req.body.name}, { policy: req.body.policy }, function (err) {
        if (err) console.log(err);
        else{
        res.send(JSON.stringify("Update sucessful"));
        }
    });
};