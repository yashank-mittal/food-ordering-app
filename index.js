const express = require('express');
const app = express();
const ejs = require('ejs');
const expresslayouts = require('express-ejs-layouts');
const path = require('path');


//set Template engine
app.use(expresslayouts);
app.set('views',path.join(__dirname,'/resources/views'))
app.set('view engine','ejs');




//Assets
app.use(express.static('public'))

app.get('/',(req,res)=>{
    res.render('home')
})

app.get('/cart',(req,res)=>{
    res.render('customers/cart');
})

app.get('/login',(req,res)=>{
    res.render('auth/login')
})

app.get('/register',(req,res)=>{
    res.render('auth/register')
})

const PORT= process.env.PORT || 8080;
app.listen(PORT,()=>{console.log(`Port is running on ${PORT}`)});