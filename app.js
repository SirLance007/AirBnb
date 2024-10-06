const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require ("./models/listing.js")
const path = require("path");
const MONGO_URL = 'mongodb://127.0.0.1:27017/delta-majorproject';
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const wrapAsync = require("./utils/wrapAsync.js");
const Review = require ("./models/review.js");

main()
.then( () => {
    console.log("Connected to Mongo");
})

.catch( (err) => {
    console.log(err)
});
async function main () {
    await mongoose.connect(MONGO_URL);
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine("ejs" , ejsMate);
app.use(express.static(path.join(__dirname,"/public")));

app.use((err,req,res,next) => {
    res.send("Something went wrong");
})

// Index Route
app.get("/listings" , async (req, res) => {
    const alllistings = await Listing.find({})
    res.render("./listings/index.ejs" , {alllistings})
})

app.put("/listings/:id/edit", async (req, res) => {
    let { id } = req.params;

    // Ensure you are spreading only necessary fields, particularly for nested fields
    const updatedData = {
        title: req.body.listing.title,
        description: req.body.listing.description,
        // If image is a nested object
        image: {
            url: req.body.listing.image.url,
            alt: req.body.listing.image.alt
        },
        price: req.body.listing.price,
        location: req.body.listing.location,
        country: req.body.listing.country,
        // Add other fields as necessary
    };
    try {
        await Listing.findByIdAndUpdate(id,updatedData);
        res.redirect(`/listings/`); // Redirect to the updated listing's page
    } catch (error) {
        console.error("Error updating listing:", error);
        res.status(500).send("An error occurred while updating the listing.");
    }
});

//New Route
app.get("/listing/new", async (req, res) => {
    res.render("./listings/new.ejs");
})

// SHOW ROUTE
app.get("/listing/:id" , async (req,res) => {
    let {id} = req.params;
    const listing = await Listing.findById(id).populate("reviews");
    res.render("./listings/show.ejs" , {listing});
})

app.delete("/listings/:id" , async (req,res) => {
    let {id} = req.params;
    await Listing.findByIdAndDelete(id);
    res.redirect("/listings");
});


app.get("/listings/:id/edit", async (req, res) =>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs" , {listing})
})

// Create Route
app.post("/listings/new" , async (req,res) =>{
    try{
        const newListing = new Listing(req.body.listing);
        await newListing.save();
        res.redirect("/listings");
    }catch(err){
        next(err);
    }
    
})

// Post Route
app.post("/listing/:id/reviews", async (req, res) =>{
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);
    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();
    console.log("new review saved");
    res.send("new review saved");

})

app.get("/" , (req,res) => {
    res.send("Hello, World!");
})

app.listen(8080 , () => {
    console.log("Server started on port 8080");
})

