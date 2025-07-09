const express = require('express');
const router = require('express').Router()

const Book = require('../models/book');
const Review = require('../models/review');


// controllers/books.js
// going to find all books in the database then include their owner's info, and show it on the books/index page
router.get('/', async (req, res) => {
    const populatedBooks = await Book.find({}).populate('owner');
    res.render('books/index.ejs', {
      books: populatedBooks,
    });
  });



router.get('/new', async (req, res) => {
    res.render('books/new.ejs');
});


router.post('/', async (req, res) => {
    req.body.owner = req.session.user._id;
    await Book.create(req.body);
    res.redirect('/books');
})

//displaying the information about owner 

// (in our case, the person who reviewed the book)
router.get('/:bookId', async (req, res) => {
    const populatedBooks = await Book.findById(
      req.params.bookId
    ).populate('owner').populate('reviews');

    res.render('books/show.ejs', {
      book: populatedBooks,
    });
  });


router.delete('/:bookId', async (req, res) => {
    const book = await Book.findById(req.params.bookId);
    if (book.owner.equals(req.session.user._id)) {
      await book.deleteOne();
      res.redirect('/books');
    } else {
      res.send("You don't have permission to do that.");
    }
  });


router.get('/:bookId/edit', async (req, res) => {
    const currentBook = await Book.findById(req.params.bookId);
    res.render('books/edit.ejs', {
      book: currentBook,
    });
  } 
  );


router.put('/:bookId', async (req, res) => {
    const currentBook = await Book.findById(req.params.bookId);
    if (currentBook.owner.equals(req.session.user._id)) {
      await currentBook.updateOne(req.body);
      res.redirect('/books');
    } else {
      res.send("You don't have permission to do that.");
    }
  });


router.get('/new', async (req, res) => {
    res.render('books/review.ejs');
});


router.post('/:bookId/add-review', async (req, res) => {
  const bookId = req.params.bookId;
  const book = await Book.findById(bookId)
  let review = await Review.create(req.body);
  book.reviews.push(review._id);
  await book.save();
  res.redirect(`/books/${bookId}`);
})


module.exports = router;
