const express = require('express'); //load express
const app = express();//create app using express
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors=require('cors');
const logger = require('morgan');
const expAutoSan = require('express-autosanitizer');
const port = process.env.PORT;

const uri = "mongodb+srv://svecile:hello12345@lab3-crop3.mongodb.net/lab5?retryWrites=true&w=majority";

//connect to mongoose
mongoose.connect(uri, {
    useNewUrlParser:true,
});

console.log('connected to the database (mongoose)');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(expAutoSan.allUnsafe); //sanitizes user input on all routes so it cant be interperted as html or javascript
app.use(cors());
app.use('/api/', function (req, res, next) {next()})
app.use(logger('dev'));

//import routes, routes are all seperate so sme can require validation
const oRouter = require('./routes/open.route');
const uRouter = require('./routes/user.route');
const aRouter = require('./routes/admin.route');
const pRouter = require('./routes/policy.route')
oRouter.use(express.json());
uRouter.use(express.json());
aRouter.use(express.json());
pRouter.use(express.json());
app.use('/api/public', oRouter);
app.use('/api/user', uRouter);
app.use('/api/admin', aRouter);
app.use('/api/policy', pRouter);

app.listen(port, () => {console.log(`Server is up and running on port number ${port}...`);});
