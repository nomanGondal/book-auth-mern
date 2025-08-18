const express = require('express');
const router = express.Router();
const { createBook ,getMyBooks,updateBook, deleteBook} = require('../controllers/bookcontroller');
const auth = require('../middelware/bookmiddelware');
// POST a new book
router.post('/addnew',auth, createBook);
router.get('/mybooks', auth, getMyBooks);
router.put('/updatebook/:id', auth, updateBook ); // Assuming you want to use the same controller for update
router.delete('/deletebook/:id', auth, deleteBook); // Assuming you want to add delete functionality
module.exports = router;