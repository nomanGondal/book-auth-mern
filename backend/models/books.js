const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId, // 👈 User ki id (ref to users collection)
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    author: {
      type: String,
      required: true,
      trim: true,
    },
    genre: {
      type: String,
      default: "General",
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0,
    },
    publishedYear: {
      type: Number,
    },
  },
  {
    timestamps: true, // createdAt & updatedAt auto-added
    collection: "books", //  explicit collection name
  }
);

const Book = mongoose.model("Book", bookSchema); //  singular model name
module.exports = Book;
