const express=require("express");
const router=express.Router({mergeParams:true});
const wrapAsync=require("../utils/wrapAsync.js");
const ExpressError=require("../utils/ExpressError.js");
const Review=require("../models/review.js");
const Listing=require("../models/listing.js");
const {validateReview,isLoggedIn,isReviewOwner}=require("../middlewear.js");
const reviewController=require("../controllers/reviews.js");

//Review Route
router.post("/",isLoggedIn,validateReview,wrapAsync(reviewController.reviewRoute));


// Delete review route
router.delete("/:reviewId",isLoggedIn,isReviewOwner,wrapAsync(reviewController.deleteRoute));

module.exports=router;