// modules required for routing
let express = require("express");
let router = express.Router();
let mongoose = require("mongoose");
const path = require("path");
const fs = require("fs");

// define the book model
const Book = require("../models/books");

/* GET books List page. READ */
router.get("/", async (req, res, next) => {
  // find all books in the books collection

  Book.find((err, books) => {
    if (err) {
      return console.error(err);
    } else {
      res.render("books/index", {
        title: "Books",
        books: books,
      });
    }
  });
});

//  GET the Book Details page in order to add a new Book
router.get("/add", async (req, res, next) => {
  /*****************
   * ADD CODE HERE *
   *****************/
  // await res.render("books/details", {
  //   title: "Add Book",
  //   book: {},
  // });
  try {
    const books = {};
    res.render("books/details", {
      title: "Add Book",
      books: books,
    });
  } catch (error) {
    console.error("Error rendering add book page:", error);
    // Handle the error and display an appropriate error message
  }
});

// POST process the Book Details page and create a new Book - CREATE
router.post("/add", async (req, res, next) => {
  /*****************
   * ADD CODE HERE *
   *****************/
  let newBook = new Book({
    Title: req.body.Title,
    Description: req.body.Description,
    Price: req.body.Price,
    Author: req.body.Author,
    Genre: req.body.Genre,
  });

  await newBook.save((err, book) => {
    if (err) {
      console.error(err);
      return next(err);
    }

    console.log("Book saved");
    res.redirect("/books");
  });
});

// GET the Book Details page in order to edit an existing Book
router.get("/:id", async (req, res, next) => {
  /*****************
   * ADD CODE HERE *
   *****************/
  let id = req.params.id;

  await Book.findById(id, (err, book) => {
    if (err) {
      console.error(err);
      return next(err);
    }
    if (!book) {
      return res.sendStatus(404);
    } else {
      res.render("books/details", {
        title: "Edit Book",
        books: book,
      });
    }
  });
});

// POST - process the information passed from the details form and update the document
router.post("/:id", async (req, res, next) => {
  /*****************
   * ADD CODE HERE *
   *****************/
  let id = req.params.id;

  let updatedBook = new Book({
    _id: id,
    Title: req.body.Title,
    Description: req.body.Description,
    Price: req.body.Price,
    Author: req.body.Author,
    Genre: req.body.Genre,
  });

  await Book.findByIdAndUpdate({ _id: id }, updatedBook, (err) => {
    if (err) {
      console.error(err);
      return next(err);
    }
    console.log("Book Updated");
    res.redirect("/books");
  });
});

// GET - process the delete by user id
router.get("/delete/:id", async (req, res, next) => {
  /*****************
   * ADD CODE HERE *
   *****************/
  let id = req.params.id;

  await Book.remove({ _id: id }, (err) => {
    if (err) {
      console.error(err);
    } else {
      res.redirect("/books");
      console.log("Book Deleted");
    }
  });
});

module.exports = router;
