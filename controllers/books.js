const express = require('express');
const router = require('express').Router()

const Book = require('../models/book');


// controllers/books.js

router.get('/', async (req, res) => {
  try {
    const populatedBooks = await Book.find({}).populate('owner');

    // Add the following:
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

// router.get('/:bookId', async (req, res) => {
//     const listing = await Listing.findById(req.params.listingId).populate('owner');
//     const userHasFavorited = listing.favoritedByUser.some((user) => 
//       user.equals(req.session.user._id)
//     );

//     res.render('books/show.ejs', {listing});
// });

// // controllers/listings.js

// router.delete('/:bookId', async (req, res) => {
//   try {
//     const book = await Book.findById(req.params.bookId);
//     if (book.owner.equals(req.session.user._id)) {
//       await book.deleteOne();
//       res.redirect('/books');
//     } else {
//       res.send("You don't have permission to do that.");
//     }
//   } catch (error) {
//     console.error(error);
//     res.redirect('/');
//   }
// });

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
