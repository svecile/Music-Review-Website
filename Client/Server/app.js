const express = require('express'); //load express
const app = express();//create app using express
const bodyParser = require('body-parser');
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


//import routes
const oRouter = require('./routes/open.route');
const uRouter = require('./routes/user.route');
const aRouter = require('./routes/admin.route');
oRouter.use(express.json());
uRouter.use(express.json());
aRouter.use(express.json());
app.use('/open', oRouter);
app.use('/user', uRouter);
app.use('/admin', aRouter);


const port = 8081; //get port from enviroment or use 8080

app.listen(port, () => {console.log(`Server is up and running on port number ${port}...`);});
