const Listing=require("./models/listing.js");
const Review=require("./models/review.js");
const ExpressError=require("./utils/ExpressError.js");
const {listingSchema}=require("./schema.js");
const {reviewSchema}=require("./schema.js");


module.exports.isLoggedIn=(req,res,next)=>{
    console.log(req.user);
     if(!req.isAuthenticated()){
        //redirecturl save
        req.session.redirectUrl=req.originalUrl;
        req.flash("error","You must be logged in to proceed!");
        return res.redirect("/login");
    }
    next();
}

module.exports.saveRedirectUrl=(req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl=req.session.redirectUrl;
    }
    next();
}


//check whether the user is listing owner or not
module.exports.isOwner=async(req,res,next)=>{
    let{id}=req.params;
    let listing=await Listing.findById(id);
    if(!listing.owner.equals(res.locals.currUser._id)){
        req.flash("error","You are not authorized!");
        return res.redirect(`/listings/${id}`);
    }
    next();
}


//Server side listing Validation
module.exports. validateListing=(req,res,next)=>{
    let {error}=listingSchema.validate(req.body);
    if(error){
        let errMsg=error.details.map((el)=>
            el.message).join(",");
        throw new ExpressError(400,errMsg);
    }
    else{
        next();
    }
};

//Server side review validation
module.exports. validateReview=(req,res,next)=>{
    let {error}=reviewSchema.validate(req.body);
    if(error){
        let errMsg=error.details.map((el)=>
            el.message).join(",");
        throw new ExpressError(400,errMsg);
    }
    else{
        next();
    }
};

//check whether the user is review owner or not
module.exports.isReviewOwner=async(req,res,next)=>{
    let{id,reviewId}=req.params;
    let review=await Review.findById(reviewId);
    if(!review.author.equals(res.locals.currUser._id)){
        req.flash("error","You are not authorized!");
        return res.redirect(`/listings/${id}`);
    }
    next();
}