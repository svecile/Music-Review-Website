const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const secret =  'hello'; //process.env.JWT_KEY;
const jwt = require('jsonwebtoken');

exports.new_user = function (req, res) {
    let email = req.body.email; //user info from body
    console.log(`Creating user ${email}`);
    User.findOne({ email: req.body.email }, function (err, results) {
        if (results) {
            res.status(400).send(`Username ${req.body.email} not available`);
        } else if (err) {
            return console.error(err);
        } else {
            bcrypt.hash(req.body.password, saltRounds, function (err, hash) {

                if (err) return console.error(err);

                let user = new User(
                    {
                        email: req.body.email,
                        password: hash,
                    }
                );

                //save data to database
                user.save(function (err) {
                    if (err) {
                        return console.error(err);
                    }
                    console.log('User Created Sucessfully');

                    res.send('user created sucessfully')
                });
 
            });
        }
    });
};

exports.validate_user = function (req, res) {

    console.log(`Validating user ${req.body.email}`);

    User.findOne({ email: req.body.email }, function (err, results) {
        if (results == null) {
            res.status(401).send(`Access denied for ${req.body.email}`);
            console.log('User doesnt exist');

        } else if (err) {
            return console.error(err);
        }

        bcrypt.compare(req.body.password, results.password, function (err, val) {
            if (val == true) {
                var payload;
                if(results.admin==true){
                    payload = { username: req.body.email, admin: true };
                }
                payload = { username: req.body.email, admin: false }; // make up a payload for JWT
                let token = jwt.sign(payload, secret);		// make a token
                res.json(token);							// send it
                console.log('token: ' + token);
            } else if (err){
                return console.error(err);
            }else{
                res.status(401).send(`Access denied for ${req.body.email}`);
                console.log('Hashes don\'t match');
            }
        });
    });
};

exports.make_admin = function(req, res){
    User.updateOne({ "email": req.body.email }, {admin: true }, function (err, results) {
        if (results == null) {
            res.status(401).send(`Access denied for ${req.body.email}`);
            console.log('User doesnt exist');

        } else if (err) {
            return console.error(err);
        }
        res.send(req.body.email +' is now an admin')
    });
};