const homeController = require('../Backend/http/controllers/homeController');
const authController = require('../Backend/http/controllers/authController');
const cartControllers = require('../Backend/http/controllers/customer/cartControllers');


function initRoutes(app){
    app.get('/',homeController().index)

    app.get('/cart',cartControllers().cart);
    
    app.get('/login',authController().login)
    
    app.get('/register',authController().register)
 }


 module.exports = initRoutes;