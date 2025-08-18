const Book = require('../models/books');



// @desc    Create new book
// @route   POST /api/books
exports.createBook = async (req, res) => {
  try {
    const { title, author, genre, rating, publishedYear } = req.body;
    const userId = req.userId; // Assuming user ID is available in req.user after authentication
    const newBook = new Book({
      userId,
      title,
      author,
      genre,
      rating,
      publishedYear,
    });

    const savedBook = await newBook.save();
    res.status(201).json(savedBook);
  } catch (err) {
    res.status(400).json({ message: 'Error creating book' });
  }
};

// Get all books by logged-in user
exports.getMyBooks = async (req, res) => {
  try {
    const books = await Book.find({ userId: req.userId });
    res.status(200).json(books);
  } catch (err) {
    res.status(500).json({ message: "Error fetching books" });
  }
};

// @desc    Update a book
// @route   PUT /api/books/:id
// @access  Private (only owner)
exports.updateBook = async (req, res) => {
  try {
    const { id } = req.params; // book id from URL
    const userId = req.userId; // from JWT middleware
    const updates = req.body;  // fields to update

    // Check if book exists and belongs to user
    const book = await Book.findOne({ _id: id, userId });
    if (!book) {
      return res.status(404).json({ message: "Book not found or not authorized" });
    }

    // Apply updates
    Object.assign(book, updates);

    const updatedBook = await book.save();
    console.log("Book updated successfully:", updatedBook);
    res.status(200).json(updatedBook);
  } catch (err) {
    console.error("Error updating book:", err);
    res.status(500).json({ message: "Error updating book" });
  }
};


// @desc    Delete a book
// @route   DELETE /api/books/:id
exports.deleteBook = async (req, res) => {
  try {
    const bookId = req.params.id;
    const userId = req.userId; // middleware se aaya

    // Sirf usi book ko delete karo jo current user ki hai
    const deletedBook = await Book.findOneAndDelete({
      _id: bookId,
      userId: userId,
    });

    if (!deletedBook) {
      return res.status(404).json({ message: "Book not found or not yours" });
    }

    res.json({ message: "Book deleted successfully" });
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({ message: "Error deleting book" });
  }
};

