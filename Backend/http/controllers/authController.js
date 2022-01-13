const User = require('../../models/user');
const bcrypt = require('bcrypt')
const passport = require('passport');

function authController(){
    //factory function : that returns object
    return{
        login(req,res){
            res.render('auth/login');
        },
        postlogin(req,res,next){
             passport.authenticate('local',(err,user,info) =>{
                 if(err){
                     req.flash('error',info.message)
                     return next(err)
                 }

                 if(!user){
                     req.flash('error',info.message);
                     return res.redirect('/login')
                 }

                 req.logIn(user,(err)=>{
                    if(err){
                        req.flash('error',info.message)
                        return next(err)
                    }
                    return res.redirect('/');
                 })
             })(req,res,next)
        },
        register(req,res){
            res.render('auth/register');
        }, 
        async postregister(req,res){
            const { name,email,password } = req.body;
            // Validate Requested
            if(!name || !email || !password) {
                req.flash('error','All Fields are required')
                req.flash('name',name)
                req.flash('email',email)
                return res.redirect('/register')
            }

            //Check if Email exists
            User.exists({ email: email },(err,result)=>{
                if(result){
                    req.flash('error','Email ALready Exists')
                    req.flash('name',name)
                    req.flash('email',email)
                    return res.redirect('/register')
                }
            })

            //Hash Password
            const hassedPassword = await bcrypt.hash(password, 10)
            //Create a User
            const user = new User({
                name,
                email,
                password: hassedPassword
            })

            user.save().then((user)=>{
                // Login

                return res.redirect('/login');
            }).catch((e)=>{
                req.flash('error','Something went wrong')
                return res.redirect('/register')
            })
        },
        logout(req,res){
            req.logout()
            return res.redirect('/login')
        }
    }
}

module.exports = authController;