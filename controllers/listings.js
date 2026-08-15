const Listing=require("../models/listing.js");

//index callback of listing
module.exports.index=async(req,res)=>{
   const allListings= await Listing.find({});
   res.render("./listings/index.ejs",{allListings});
};

//new route callback of listing
module.exports.renderNewForm=(req,res)=>{
    res.render("./listings/new.ejs");
};

//show route callback of listing
module.exports.showListing=async(req,res)=>{
    let {id}=req.params;
    const listing=await Listing.findById(id).populate({path:"reviews",populate:{path:"author"},}).populate("owner");
    if(!listing){
        req.flash("error","listing does not exist");
        return res.redirect("/listings");
    }
    console.log(listing);
    res.render("./listings/show.ejs",{listing});
};

//create route callback of listing
module.exports.createListing=async(req,res,next)=>{
    let url=req.file.path;
    let filename=req.file.filename;
    const newListing=new Listing(req.body.listing);
    newListing.owner=req.user._id;
    newListing.image={filename,url};
   await newListing.save();
   req.flash("success","New listing created!");
   res.redirect("/listings");
};

//edit route callback of listing
module.exports.editListing=async(req,res)=>{
    let {id}=req.params;
    const listing=await Listing.findById(id);
     if(!listing){
        req.flash("error","listing does not exist");
        return res.redirect("/listings");
    }
    let originalImageUrl=listing.image.url;
    if (originalImageUrl) {
    if (originalImageUrl.includes("/upload")) {
      // For Cloudinary uploads
      originalImageUrl = originalImageUrl.replace("/upload", "/upload/h_300,w_250");
    } else if (originalImageUrl.includes("images.unsplash.com")) {
      // For Unsplash default images, change the 'w' parameter
      originalImageUrl = originalImageUrl.replace(/w=\d+/, "w=250");
    }
  }
    res.render("./listings/edit.ejs",{listing,originalImageUrl});
};

//update route callback of listing
module.exports.updateListing=async(req,res)=>{
    let {id}=req.params;
    let listing= await Listing.findByIdAndUpdate(id,{...req.body.listing});
    if(typeof req.file!="undefined"){
    let url=req.file.path;
    let filename=req.file.filename;
    listing.image={filename,url};
    }
    await listing.save();
    req.flash("success"," listing updated!");
    res.redirect(`/listings/${id}`);
};

//delete route callback of listing
module.exports.deleteListing=async(req,res)=>{
    let {id}=req.params;
    let deleteListing=await Listing.findByIdAndDelete(id);
    console.log( deleteListing);
    req.flash("success"," listing deleted!");
    res.redirect("/listings");
};