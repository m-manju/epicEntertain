const path = require('path');
const booksModel = require('../models/books');
const upload = require('../../config/multer');

const addBookWithImage = async (req, res) => {
  try {
    const { name, description, author_id, isbn, publication_year } = req.body;
    if (!req.file) {
      return res.status(400).json({ error: 'Image file is required' });
    }
    const imageUrl = req.file.path;
    const bookId = await booksModel.addBook(name, description, author_id, isbn, publication_year, imageUrl);
    console.log('Book added successfully');
    res.status(201).json({ message: 'Book added successfully', bookId });
  } catch (error) {
    console.error('Error adding book with image:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const editBook = async (req, res) => {
  try {
    const bookId = req.params.bookId;
    const { name, description, author_id, isbn, publication_year } = req.body;
    const existingBook = await booksModel.getBookDetailsById(bookId);
    if (!existingBook) {
      return res.status(404).json({ error: 'Book not found' });
    }
    const result = await booksModel.editBook(bookId, name, description, author_id, isbn, publication_year);

    if (result) {
      console.log('Book edited successfully');
      res.status(200).json({ message: 'Book edited successfully' });
    } else {
      res.status(500).json({ error: 'Failed to edit book' });
    }
  } catch (error) {
    console.error('Error editing book:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const deleteBook = async (req, res) => {
  try {
    const bookId = req.params.bookId;

    const existingBook = await booksModel.getBookDetailsById(bookId);
    if (!existingBook) {
      return res.status(404).json({ error: 'Book not found' });
    }
    const result = await booksModel.deleteBook(bookId);

    if (result) {
      console.log('Book deleted successfully');
      res.status(200).json({ message: 'Book deleted successfully' });
    } else {
      res.status(500).json({ error: 'Failed to delete book' });
    }
  } catch (error) {
    console.error('Error deleting book:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  addBookWithImage,
  upload,
  editBook,
  deleteBook,
};
