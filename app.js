if(process.env.NODE_ENV!="production"){
    require('dotenv').config();
}


const express=require("express");
const app=express();
const mongoose=require("mongoose");
const path=require("path");
const methodOverride=require("method-override");
const ejsMate=require("ejs-mate");
const ExpressError=require("./utils/ExpressError.js");
const session=require("express-session");
const MongoStore = require("connect-mongo").default;
const flash=require("connect-flash");
const passport=require("passport");
const localStrategy=require("passport-local");
const User=require("./models/user.js");

//restructing listing Express Router
const listings=require("./routes/listing.js");

//restructing review Express Router
const reviews=require("./routes/review.js");

//restructing user Express Router
const userRouter=require("./routes/user.js");



app.use(methodOverride("_method"));
app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.engine('ejs',ejsMate);
app.use(express.static(path.join(__dirname,"public")))

const dbUrl=process.env.ATLASDB_URL;

main()
.then(()=>{
    console.log("connection succesful");
})
.catch(err => console.log(err));
async function main() {
  await mongoose.connect(dbUrl);
}

const store=MongoStore.create({
    mongoUrl:dbUrl,
    crypto:{
        secret:process.env.SECRET,
    },
    touchAfter:24*3600,
});

store.on("error",(err)=>{
    console.log("ERROR in MONGO SESSION STORE",err);
});

const sessionOption={
    store,
    secret:process.env.SECRET,
    resave:false,
    saveUninitialized:true,
    cookie:{
        expires:Date.now()+7*24*60*60*1000,
        maxAge:7*24*60*60*1000,
        httpOnly:true,
    }
};


app.use(session(sessionOption));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use((req,res,next)=>{
    res.locals.success=req.flash("success");
    res.locals.error=req.flash("error");
    res.locals.currUser=req.user;
    next();
});


//Root path
app.get("/", (req, res) => {
    res.redirect("/listings");
});


//restructing listing Express Router
app.use("/listings",listings);
//restructing review Expree Router
app.use("/listings/:id/reviews",reviews);
app.use("/",userRouter);


app.all('/*all',(req,res,next)=>{
    next(new ExpressError(404,"Page not found"));
});

//Error handling Middlewear
app.use((err,req,res,next)=>{
    let{status=500,message="Something went wrong"}=err;
    res.status(status).render("error.ejs",{message});
    // res.status(status).send(message);
});

app.listen(8080,()=>{
    console.log("server is listening to port 8080");
});