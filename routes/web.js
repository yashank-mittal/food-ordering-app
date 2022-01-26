const homeController = require('../Backend/http/controllers/homeController');
const authController = require('../Backend/http/controllers/authController');
const cartControllers = require('../Backend/http/controllers/customer/cartControllers');
const orderContoller = require('../Backend/http/controllers/customer/orderController');
const AdminOrderContoller = require('../Backend/http/controllers/admin/orderController');
const statusController = require('../Backend/http/controllers/admin/statusController');

//Middleware
const guest = require('../Backend/http/middelwares/guest')
const auth = require('../Backend/http/middelwares/auth')
const Admin = require('../Backend/http/middelwares/admin');


function initRoutes(app){
    app.get('/',homeController().index)
    
    app.get('/login',guest,authController().login)


    app.post('/login',authController().postlogin)
    
    app.get('/register',guest,authController().register)

    app.post('/register',authController().postregister);
    app.post('/logout',authController().logout);

    app.get('/cart',cartControllers().cart);

    app.post('/update-cart', cartControllers().update);

    //Customer routes
    app.post('/orders',auth,orderContoller().store);
    app.get('/customer/orders',auth,orderContoller().index);
    app.get('/customer/orders/:id',auth,orderContoller().show);

    //Admin routes

    app.get('/admin/orders',Admin,AdminOrderContoller().index);
    app.post('/admin/order/status',Admin,statusController().update);
 }


 module.exports = initRoutes;