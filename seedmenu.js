const mongoose = require('mongoose');
const Menu = require('./Backend/models/menu');

const menu = [
    {
    "name": "Margherita",
    "image": "pizza.png",
    "price": "250",
    "size": "small"
  },{
    "name": "Marinara",
    "image": "pizza.png",
    "price": "300",
    "size": "medium"
  },{
    "name": "Carbonara",
    "image": "pizza.png",
    "price": "200",
    "size": "small"
  },{
    "name": "Americana",
    "image": "pizza.png",
    "price": "500",
    "size": "large"
  },{
    "name": "Chicken Mushroom",
    "image": "pizza.png",
    "price": "350",
    "size": "medium"
  },{
    "name": "Paneer pizza",
    "image": "pizza.png",
    "price": "200",
    "size": "small"
  },{
    "name": "Vegies pizza",
    "image": "pizza.png",
    "price": "600",
    "size": "large"
  },{
    "name": "Pepperoni",
    "image": "pizza.png",
    "price": "500",
    "size": "medium"
  }
];


function seedmenu(){
  Menu.insertMany(menu)
  .then(() =>{
    console.log("DB Seeded");
  })
  .catch(e =>{
    console.log(e);
  })
}


module.exports = seedmenu;