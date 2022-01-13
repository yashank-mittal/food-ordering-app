const homeController = require('../Backend/http/controllers/homeController');
const authController = require('../Backend/http/controllers/authController');
const cartControllers = require('../Backend/http/controllers/customer/cartControllers');
const guest = require('../Backend/http/middelwares/guest')

function initRoutes(app){
    app.get('/',homeController().index)
    
    app.get('/login',guest,authController().login)


    app.post('/login',authController().postlogin)
    
    app.get('/register',guest,authController().register)

    app.post('/register',authController().postregister);
    app.post('/logout',authController().logout);

    app.get('/cart',cartControllers().cart);

    app.post('/update-cart', cartControllers().update)
 }


 module.exports = initRoutes;