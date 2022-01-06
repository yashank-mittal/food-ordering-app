const express = require('express');
const app = express();
const ejs = require('ejs');
const expresslayouts = require('express-ejs-layouts');
const path = require('path');



//Assets
app.use(express.static('public'))

app.get('/',(req,res)=>{
    res.render('home')
})



//set Template engine
app.use(expresslayouts);
app.set('views',path.join(__dirname,'/resources/views'))
app.set('view engine','ejs');


const PORT= process.env.PORT || 8080;
app.listen(PORT,()=>{console.log(`Port is running on ${PORT}`)});