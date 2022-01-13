const homeController = require('../Backend/http/controllers/homeController');
const authController = require('../Backend/http/controllers/authController');
const cartControllers = require('../Backend/http/controllers/customer/cartControllers');


function initRoutes(app){
    app.get('/',homeController().index)
    
    app.get('/login',authController().login)
    
    app.get('/register',authController().register)

    app.get('/cart',cartControllers().cart);

    app.post('/update-cart', cartControllers().update)
 }


 module.exports = initRoutes;