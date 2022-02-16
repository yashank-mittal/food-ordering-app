import axios from "axios";
import Noty from 'noty';


export function placeOrder(formObject){
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
        // console.log(formObject)
        // console.log(formdata.entries)
        // console.log(e);
}