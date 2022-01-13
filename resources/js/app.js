import axios from "axios";
import Noty from 'noty';
const AddToCart = document.querySelectorAll('.add-to-cart');
const cartCounter = document.querySelector('#cartCounter');

function updateCart(pizza){
    axios.post('/update-cart', pizza).then(res =>{
        // console.log(res);
        cartCounter.innerText = res.data.totalQty;
        new Noty({
            type: 'success',
            timeout: 1000,
            text: "Item Added to cart"
          }).show();
          
    }).catch((e)=>{
        new Noty({
            type: 'error',
            timeout: 1000,
            text: "Something Went Wrong"
          }).show();
    })
}

AddToCart.forEach((btn)=>{
    btn.addEventListener('click',(e)=>{
        // console.log(e);
        let pizza = JSON.parse(btn.dataset.pizza);
        updateCart(pizza);
        // console.log(pizza)
    })
})