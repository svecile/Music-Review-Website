const express = require('express'); //load express
const app = express();//create app using express
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors=require('cors');
var logger = require('morgan');

const uri = "mongodb+srv://svecile:hello12345@lab3-crop3.mongodb.net/lab5?retryWrites=true&w=majority";

//connect to mongoose
mongoose.connect(uri, {
    useNewUrlParser:true,
});

console.log('connected to the database (mongoose)');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());
app.use('/api/', function (req, res, next) {next()})
app.use(logger('dev'));

//import routes
const oRouter = require('./routes/open.route');
const uRouter = require('./routes/user.route');
const aRouter = require('./routes/admin.route');
oRouter.use(express.json());
uRouter.use(express.json());
aRouter.use(express.json());
app.use('/api/public', oRouter);
app.use('/api/user', uRouter);
app.use('/api/admin', aRouter);


const port = 8081; //get port from enviroment or use 8080

app.listen(port, () => {console.log(`Server is up and running on port number ${port}...`);});
