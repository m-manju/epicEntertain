const path = require('path');
const booksModel = require('../models/books');
const upload = require('../../config/multer');
const xlsx = require('xlsx');


const addBooksFromExcel = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Excel file is required' });
    }
    const excelFile = req.file.path;
    const workbook = xlsx.readFile(excelFile); 
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const bookData = xlsx.utils.sheet_to_json(sheet);
    if (bookData.length === 0) {
      return res.status(400).json({ error: 'Excel file is empty' });
    }
    for (const book of bookData) {
      const { name, description, author_id, isbn, publication_year, image_url } = book;
      const bookId = await booksModel.addBook(name, description, author_id, isbn, publication_year, image_url);
    }
    console.log('Books added successfully from Excel');
    res.status(201).json({ success: true, message: 'Books added successfully from Excel' });
  } catch (error) {
    console.error('Error adding books from Excel:', error);
    res.status(500).json({success: false, error: 'Internal server error' });
  }
};

const addBookWithImage = async (req, res) => {
  try {
    const { name, description, author_id, isbn, publication_year } = req.body;
    if (!req.file) {
      return res.status(400).json({ error: 'Image file is required or image size should not be more than 2 Mb' });
    }
    const imageUrl = req.file.path;
    const bookId = await booksModel.addBook(name, description, author_id, isbn, publication_year, imageUrl);
    console.log('Book added successfully');
    res.status(201).json({success: true, message: 'Book added successfully', bookId });
  } catch (error) {
    console.error('Error adding book with image:', error);
    res.status(500).json({success: false, error: 'Internal server error' });
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
      res.status(200).json({success: true, message: 'Book edited successfully' });
    } else {
      res.status(500).json({ error: 'Failed to edit book' });
    }
  } catch (error) {
    console.error('Error editing book:', error);
    res.status(500).json({success: false, error: 'Internal server error' });
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
      res.status(200).json({success: true, message: 'Book deleted successfully' });
    } else {
      res.status(500).json({ error: 'Failed to delete book' });
    }
  } catch (error) {
    console.error('Error deleting book:', error);
    res.status(500).json({success: false, error: 'Internal server error' });
  }
};

const addBookWithFile = async (req, res) => {
  try {
    const { name, description, author_id, isbn, publication_year } = req.body;
    if (!req.file) {
      return res.status(400).json({ error: 'Book file is required' });
    }
    const bookFileUrl = req.file.path;
    const bookId = await booksModel.addBookWithFile(name, description, author_id, isbn, publication_year, bookFileUrl);
    console.log('Book added successfully');
    res.status(201).json({success: true, message: 'Book added successfully', bookId });
  } catch (error) {
    console.error('Error adding book with file:', error);
    res.status(500).json({success: false, error: 'Internal server error' });
  }
};

const getBookFile = async (req, res) => {
  try {
    const bookId = req.params.bookId;
    const bookFileUrl = await booksModel.getBookFileUrlById(bookId);
    if (!bookFileUrl) {
      return res.status(404).json({ error: 'Book not found' });
    }
    res.status(200).json({success: true, bookFile: bookFileUrl });
  } catch (error) {
    console.error('Error getting book file URL:', error);
    res.status(500).json({success: false, error: 'Internal server error' });
  }
};

module.exports = {
  addBooksFromExcel,
  addBookWithImage,
  upload,
  editBook,
  deleteBook,
  addBookWithFile,
  getBookFile,
};

