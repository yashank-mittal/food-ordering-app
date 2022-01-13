require('dotenv').config()
const express = require('express');
const app = express();
const ejs = require('ejs');
const expresslayouts = require('express-ejs-layouts');
const path = require('path');
const seedmenu = require('./seedmenu')
const mongoose = require('mongoose');
const session = require('express-session');
const flash = require('express-flash');
const MongoDbStore = require('connect-mongo');



//session config
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookies: {maxAge: 1000 * 60 * 60 *24}, //24 hours
    store: MongoDbStore.create({mongoUrl: process.env.MONGO_URL}),
    collectionName: 'session'
}))

//set Template engine
app.use(expresslayouts);
app.set('views',path.join(__dirname,'/resources/views'))
app.set('view engine','ejs');


app.use(flash())

//Assets
app.use(express.static('public'))
app.use(express.json());


//Global middleware
app.use((req,res,next)=>{
    res.locals.session = req.session
    next();
})

//Database stuff
mongoose.connect(process.env.MONGO_URL, 
{
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    // useFindAndModify : true
})
.then(() => {
    console.log("DB Connected")
})
.catch(e => {console.log("Error Occur");console.log(e);});

//DB Seeded
// seedmenu();



//web routes
require('./routes/web')(app)



const PORT= process.env.PORT || 8080;
app.listen(PORT,()=>{console.log(`Port is running on ${PORT}`)});