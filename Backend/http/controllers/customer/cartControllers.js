function cartControllers(){
    return{
        cart(req,res){
            res.render('customers/cart');
        }
    }
}

module.exports = cartControllers;