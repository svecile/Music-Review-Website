const express = require('express'); //load express
const app = express();//create app using express
const bodyParser = require('body-parser');

var jwt = require('express-jwt');
var jwks = require('jwks-rsa');

const admin = require('./routes/admin.route'); //import routes
const user = require('./routes/user.route');
const open = require('./routes/open.route');

const mongoose = require('mongoose');
const cors=require('cors');


const uri = "mongodb+srv://svecile:Mwwd576%21@lab3-crop3.mongodb.net/lab5?retryWrites=true&w=majority";

//connect to mongoose
mongoose.connect(uri, {
    useNewUrlParser:true,
});

console.log('connected to the database (mongoose)');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());

var jwtCheck = jwt({
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: 'https://dev-ayxvjao9.auth0.com/.well-known/jwks.json'
  }),
  audience: 'http://localhost:8083/api/',
  issuer: 'https://dev-ayxvjao9.auth0.com/',
  algorithms: ['RS256']
});

app.use(jwtCheck);
app.get('/authorized', function (req, res) {
    res.send('Secured Resource');
});

app.use('/open', open);
app.use('/admin', admin);
app.use('/user', user);



const port = 8083; //get port from enviroment or use 8080

app.listen(port, () => {console.log(`Server is up and running on port number ${port}...`);});
