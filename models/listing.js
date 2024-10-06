const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
  title: {
    type: String,
  },
  description: String,
  image: {
    filename: { type: String, default: "defaultimage" },
    url: {
      type: String,
      default:
        "https://images.unsplash.com/photo-1618140052121-39fc6db33972?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bG9kZ2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
    },
  },
  price: {
    type: Number,
    default: 150, // Assign a default value to prevent `null`
  },
  location: String,
  country: String,
  reviews: [{
    type: Schema.Types.ObjectId,
    ref : "Review",
  }]
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
