const mongoose = require("mongoose");

// create a model class
const Book = mongoose.Schema(
  {
    Title: String,
    Description: String,
    Price: Number,
    Author: String,
    Genre: String,
  },
  {
    collection: "books",
  }
);

module.exports = mongoose.model("Book", Book);
