const Review=require("../models/review.js");
const Listing=require("../models/listing.js");

//review route callback 
module.exports.reviewRoute=async(req,res)=>{
    let {id}=req.params;
    const listing=await Listing.findById(id);
    let newReview=new Review(req.body.review);
    newReview.author=req.user._id;
    listing.reviews.push(newReview);
    console.log(newReview);
    await newReview.save();
    await listing.save();
    req.flash("success","New review created!");
    res.redirect(`/listings/${id}`);
};

//delete route callback
module.exports.deleteRoute=async(req,res)=>{
    let {id,reviewId}=req.params;
    await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});
    await Review.findByIdAndDelete(reviewId);
    req.flash("success"," Review deleted!");
    res.redirect(`/listings/${id}`);
};