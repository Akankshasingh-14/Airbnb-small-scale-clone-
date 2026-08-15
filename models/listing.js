
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review=require("./review.js");
const DEFAULT_IMAGE_URL = "https://images.unsplash.com/photo-1784407379957-7531c54fc4e4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDI2fHZ5WmNJc3lIdlowfHxlbnwwfHx8fHw%3D";

const listingSchema = new Schema({
    title: {
       type: String,
       required: true,
    },
    description: String,
    image: {
        filename: String,
        url: {
            type: String,
            default: DEFAULT_IMAGE_URL,
             set: (v) => !v || v.trim() === "" ? DEFAULT_IMAGE_URL : v,
        }
    },
    price: Number,
    location: String,
    country: String,
    reviews:[
        {
            type:Schema.Types.ObjectId,
            ref:"Review",
        },
    ],
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User",
    }
});

//Mongoose middlewear listing deletion
listingSchema.post("findOneAndDelete",async(listing)=>{
    if(listing){
    await Review.deleteMany({_id:{$in:listing.reviews}});
    }
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
