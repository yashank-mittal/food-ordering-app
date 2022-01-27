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
const passport = require('passport');
const Emitter = require('events');


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
    

app.use(expresslayouts);
app.set('views',path.join(__dirname,'/resources/views'))
app.set('view engine','ejs');
//Assets
app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json());


//Event emitter
const eventEmitter = new Emitter()
app.set('eventEmitter',eventEmitter);

//session config
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookies: {maxAge: 1000 * 60 * 60 *24}, //24 hours
    store: MongoDbStore.create({mongoUrl: process.env.MONGO_URL}),
    collectionName: 'session'
}))


//Passport Congig
const passportInit = require('./Backend/config/passport')
passportInit(passport)
app.use(passport.initialize())
app.use(passport.session())
//set Template engine
app.use(flash())


//Global middleware
app.use((req,res,next)=>{
    res.locals.session = req.session;
    res.locals.user = req.user;
    next();
})

//DB Seeded
// seedmenu();

//web routes
require('./routes/web')(app)



const PORT= process.env.PORT || 8080;

const server = app.listen(PORT,()=>{console.log(`Port is running on ${PORT}`)});


//Socket

const io = require('socket.io')(server)
io.on('connection', (socket) => {
      // Join
      socket.on('join', (roomname) => {
        //   console.log(roomname)
        socket.join(roomname)
      })
})

eventEmitter.on('orderUpdate',(data) => {
    io.to(`order_${data.id}`).emit('orderUpdate',data)
})

eventEmitter.on('orderPlaced',(data)=>{
    io.to('adminRoom').emit('orderPlaced',data)
})