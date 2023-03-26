const User = require('../models/user');

module.exports.profile = function(req,res){
    if(req.cookies.user_id){
        User.findById(req.cookies.user_id).then(user =>{
            if(user){
                return res.render('user_profile',{
                    title: "Profile",
                    name: user.name,
                    email: user.email
                })
            }else{
                return res.render('/user/sign-in');
            }
        })
    }else{
        return res.redirect('/users/sign-in');
    }
}

module.exports.signUp = function(req,res){
    return res.render('user_sign_up',{
        title: "Sign Up"
    });
}

module.exports.signIn = function(req,res){
    return res.render('user_sign_in',{
        title: "Sign In"
    })
}

module.exports.create = function(req,res){
    if(req.body.password != req.body.confirm_password){
        return res.redirect('/users/sign-up');
    }
    try {
        User.findOne({email: req.body.email}).then(user =>{
            if(!user){
                User.create(req.body).then(user => {
                    return res.redirect('/users/sign-in');
                })
            }else{
                return res.redirect('back');
            }
        })   
    } catch (error) {
        console.log("Error in signing up the page.");
        return;
    }
}

module.exports.createSession = function(req,res){
    try { 
        User.findOne({email: req.body.email}).then(user => {
            if(!user){
                return res.redirect('back');
            }else{
                if(user.password != req.body.password){
                    return res.redirect('back');
                }
                res.cookie('user_id', user.id);
                return res.redirect('/users/profile');
            }
        })
    } catch (error) {
        console.log("Error in signing in the page.");
        return;
    }
}

module.exports.signOut = function(req,res){
    res.clearCookie('user_id');
    return res.redirect('/users/sign-in');
}