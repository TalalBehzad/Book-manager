const express = require('express');
const router = require('express').Router()

const Book = require('../models/book');
const Review = require('../models/review');


// controllers/books.js

router.get('/', async (req, res) => {
  try {
    const populatedBooks = await Book.find({}).populate('owner');

  
    res.render('books/index.ejs', {
      books: populatedBooks,
    });
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});



router.get('/new', async (req, res) => {
    res.render('books/new.ejs');
});


router.post('/', async (req, res) => {
    req.body.owner = req.session.user._id;
    await Book.create(req.body);
    res.redirect('/books');
})

//add on too review. fa instead of book you should add review bas change the words and regarding the first one you need too change the new.ejs to review.ejs



//displaying the information about owner 
// (in our case, the person who reviewed the book)
router.get('/:bookId', async (req, res) => {
  try {
    const populatedBooks = await Book.findById(
      req.params.bookId
    ).populate('owner');
    const review = await Review.find({book: req.params.bookId}
    ).populate('owner'); 

    res.render('books/show.ejs', {
      book: populatedBooks,
      review: review
    });
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});



// // controllers/listings.js

router.delete('/:bookId', async (req, res) => {
  try {
    const book = await Book.findById(req.params.bookId);
    if (book.owner.equals(req.session.user._id)) {
      await book.deleteOne();
      res.redirect('/books');
    } else {
      res.send("You don't have permission to do that.");
    }
  } catch (error) {
    console.error(error);
    res.redirect('/');
  }
});


router.get('/:bookId/edit', async (req, res) => {
  try {
    const currentBook = await Book.findById(req.params.bookId);
    res.render('books/edit.ejs', {
      book: currentBook,
    });
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});


router.put('/:bookId', async (req, res) => {
  try {
    const currentBook = await Book.findById(req.params.bookId);
    if (currentBook.owner.equals(req.session.user._id)) {
      await currentBook.updateOne(req.body);
      res.redirect('/books');
    } else {
      res.send("You don't have permission to do that.");
    }
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});


router.get('/new', async (req, res) => {
    res.render('books/review.ejs');
});


router.post('/', async (req, res) => {
    req.body.owner = req.session.user._id;
    await Review.create(req.body);
    res.redirect('/books');
})



// router.get('/:listingId/edit', async (req, res) => {
//   try {
//     const currentListing = await Listing.findById(req.params.listingId);
//     res.render('listings/edit.ejs', {
//       listing: currentListing,
//     });
//   } catch (error) {
//     console.log(error);
//     res.redirect('/');
//   }
// });

// router.put('/:listingId', async (req, res) => {
//   try {
//     const currentListing = await Listing.findById(req.params.listingId);
//     if (currentListing.owner.equals(req.session.user._id)) {
//       await currentListing.updateOne(req.body);
//       res.redirect('/listings');
//     } else {
//       res.send("You don't have permission to do that.");
//     }
//   } catch (error) {
//     console.log(error);
//     res.redirect('/');
//   }
// });

module.exports = router;
