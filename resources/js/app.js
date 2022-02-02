import axios from "axios";
import Noty from 'noty';
import { initAdmin } from './admin';
import moment from 'moment'

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


//Remove alert message after X sec
const alertMsg = document.querySelector('#success-alert')
if(alertMsg){
    setTimeout(()=>{
        alertMsg.remove()
    },2000)
}


// Change order status
let statuses = document.querySelectorAll('.status_line')
let hiddenInput = document.querySelector('#hiddenInput')
let order = hiddenInput ? hiddenInput.value : null
order = JSON.parse(order)
let time = document.createElement('small');

function updateStatus(order) {
    statuses.forEach((status) => {
        status.classList.remove('step-completed')
        status.classList.remove('current')
    })
    let stepCompleted = true;
    statuses.forEach((status) => {
       let dataProp = status.dataset.status
       if(stepCompleted) {
            status.classList.add('step-completed')
       }
       if(dataProp === order.status) {
            stepCompleted = false
            time.innerText = moment(order.updatedAt).format('hh:mm A')
            status.appendChild(time)
           if(status.nextElementSibling) {
            status.nextElementSibling.classList.add('current')
           }
       }
    })

}

updateStatus(order);


//Ajax Call

const paymentForm = document.querySelector('#payment-form');
if(paymentForm){
    paymentForm.addEventListener('submit',(e)=>{
        e.preventDefault();
        let formdata = new FormData(paymentForm);
        let formObject = {};
        for(let [key,value] of formdata.entries()){
            formObject[key] = value;
            // console.log(key,value);
        }
        axios.post('/orders',formObject).then((res)=>{
            // console.log(res.data);
            new Noty({
                type: 'success',
                timeout: 1000,
                text: res.data.message,
                progressBar: false
              }).show();

              setTimeout(()=>{
                  window.location.href = '/customer/orders';
              },1000)

        }).catch((e)=>{
            new Noty({
                type: 'error',
                timeout: 1000,
                text: e.res.data.message,
                progressBar: false
              }).show();
            console.log(e)
        })
        console.log(formObject)
        // console.log(formdata.entries)
        // console.log(e);
    })
}


// Socket
let socket = io()

// Join
if(order) {
    socket.emit('join', `order_${order._id}`)
}
//order_hdhdhshshsdhdhhdhd

let adminAreaPath = window.location.pathname;
// console.lof(adminAreaPath)
if(adminAreaPath.includes('admin')){
    initAdmin(socket);
    socket.emit('join','adminRoom');
}

socket.on('orderUpdate',(data)=>{
    const updatedOrder = { ...order };
    updatedOrder.updatedAt = moment().format()
    updatedOrder.status = data.status;
    updateStatus(updatedOrder);
    new Noty({
        type: 'success',
        timeout: 1000,
        text: "Order updated",
        progressBar: false,
      }).show();  
})