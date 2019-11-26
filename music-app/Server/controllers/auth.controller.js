const User = require('../models/user.model');
const authRoute = express.Router();
const bcrypt = require('bcrypt');
const saltRounds = 10;
const secret = process.env.JWT_KEY;

exports.new_user = function (req, res) {
	let email = req.body.email; //user info from body
    console.log(`Creating user ${email}`);
    User.findOne({email: req.body.email}, function(err, results){
        if(results){
            res.status(400).send(`Username ${req.body.email} not available`);
        }else if (err) {
            return console.error(err);
        }else{
            bcrypt.hash(req.body.password, saltRounds, function(err, hash){

                if (err) return console.error(err);

                res.send(hash);
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
                });
            })
        }
    })
};
