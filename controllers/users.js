const User=require("../models/user.js");


//callback of get signup user
module.exports.getSignup=(req,res)=>{
    res.render("./users/signup.ejs");
};

//callback of post signup user
module.exports.postSignup=async(req,res)=>{
try{
    let {username,email,password}=req.body;
    const newUser=new User({username,email});
    const registeredUser=await User.register(newUser,password);
    console.log(registeredUser);
    req.login(registeredUser,(err)=>{
        if(err){
            return next(err);
        }
        req.flash("success","Successfully registered,Welcome to wanderlust!");
        res.redirect("/listings");
    })
}
catch(e){
    req.flash("error",e.message);
    res.redirect("/signup");
}
};

//callback of get login user
module.exports.getLogin=(req,res)=>{
    res.render("./users/login.ejs");
};

//callback of post login user
module.exports.postLogin=async(req,res)=>{
    req.flash("success","Welcome to Wanderlust!");
    let redirectUrl = res.locals.redirectUrl || "/listings"; 
    res.redirect(redirectUrl);
};

//callback of logout user
module.exports.logout=(req,res,next)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }
    req.flash("success","You are logged out!");
    res.redirect("/listings");
    })
};