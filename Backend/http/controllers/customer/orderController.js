const Order = require('../../../models/order');
const moment = require('moment');

function orderContoller(){
    return{
        store(req,res){
            //Validate requestData
            const { phone, address} = req.body;
            if(!phone || !address){
                req.flash('error','All Fields are required');
                return res.redirect('/cart');
            }
            
            const order = new Order({
                customerId: req.user._id,
                item: req.session.cart.item,
                phone: phone,
                address: address
            })

            order.save().then(result=>{
                // console.log(result);
                req.flash('success','Order Placed successfully');
                delete req.session.cart;
                return res.redirect('/customer/orders');
            }).catch(e => {
                req.flash('error','Something went wrong')
                return res.redirect('/cart')
            })
        },
        async index(req,res){
            const orders = await Order.find({customerId: req.user._id},
                null,
                {sort: { 'createdAt': -1 }});
            
            res.header('Cache-Control','no-cache,private,no-store,must-revalidate,max-stale=0,post-check=0,pre-check=0')
            // console.log(orders);
            res.render('customers/orders',{orders: orders, moment: moment});
        }
    }
}


module.exports = orderContoller;