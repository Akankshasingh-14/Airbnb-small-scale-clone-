const express=require("express");
const router=express.Router();
const Listing=require("../models/listing.js");
const wrapAsync=require("../utils/wrapAsync.js");
const {isLoggedIn}=require("../middlewear.js");
const {isOwner,validateListing}=require("../middlewear.js");
const listingController=require("../controllers/listings.js");
const multer  = require('multer');
const {storage}=require("../cloudconfig.js");
const upload = multer({ storage });


//Index and create route
router.route("/")
//Index route
.get(wrapAsync(listingController.index))
//Create route
.post(isLoggedIn,upload.single('listing[image][url]'),validateListing,wrapAsync(listingController.createListing));


//New Route
router.get("/new",isLoggedIn,listingController.renderNewForm);


//Show,Update and Delete route
router.route("/:id")
//Show route
.get(wrapAsync(listingController.showListing))
//Update route
.put(isLoggedIn,isOwner,upload.single('listing[image][url]'),validateListing,wrapAsync(listingController.updateListing))
//Delete route
.delete(isLoggedIn,isOwner,wrapAsync(listingController.deleteListing));


//Edit Route
router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(listingController.editListing));


module.exports=router;