const mongoose = require('mongoose');
const bookSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
   author: {
    type: String,
    required: true
  },
   review: {
    type: String,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});
//The owner property stores the ObjectId of a 
// user document. This pattern is known as 
// referencing, where a document in one collection 
// links to a document in another collection by 
// storing a record of its ObjectId.
const Book = mongoose.model('Book', bookSchema);
module.exports = Book;