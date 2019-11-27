const User = require('../models/user.model');
const Song = require('../models/song.model');

//make a user an admin
exports.set_admin = function (req, res) {
    User.updateOne({ email: req.body.email }, { admin: true }, function (err, results) {
        if (results == null) {
            res.status(401).send(`cannot find ${req.body.email} usr account`);
            console.log('User doesnt exist');

        } else if (err) {
            return console.error(err);
        }
        res.send(req.body.email + ' is now an admin')
    });
};

exports.set_hidden_flag = function (req, res) {
    Song.updateOne({ title: req.body.title, artist: req.body.artist }, { hidden: req.body.hidden }, function (err, results) {
        if (results == null) {
            res.status(401).send('song not found');
            console.log('song not found');

        } else if (err) {
            return console.error(err);
        }
        res.send('Flag sucessfully updated')
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
        res.send(req.body.email + ' activity level changed')
    });
};