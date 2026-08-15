const express=require("express");
const router=express.Router();
const User=require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
const passport=require("passport");
const {saveRedirectUrl}=require("../middlewear.js");
const userController=require("../controllers/users.js");

//Signup route
router.route("/signup")
.get(userController.getSignup)
.post(wrapAsync(userController.postSignup));


//Login route
router.route("/login")
.get(userController.getLogin)
.post(saveRedirectUrl,passport.authenticate("local",{failureRedirect:"/login",failureFlash:true}),
userController.postLogin);

//logout route
router.get("/logout",userController.logout);


module.exports=router;