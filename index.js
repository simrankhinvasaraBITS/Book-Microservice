const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors'); // Import CORS middleware
const Book = require('./models/Book');

dotenv.config();

const app = express();

// Enable CORS for all routes
app.use(cors()); // Allow requests from any origin
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/user-service', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to User-Service DB'))
  .catch(err => console.error('Could not connect to DB:', err));

// Basic health check route
app.get('/', (req, res) => {
  res.send('Books Microservice is up and running!');
});

app.use(cors({
    origin: 'http://localhost:4200' // Replace with the URL of your Angular app
}));
  
// CRUD Routes for Books

// Create a new book
app.post('/books', async (req, res) => {
    try {
      const book = new Book(req.body);
      const savedBook = await book.save();
      res.status(201).json(savedBook);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
  
  // Get all books
  app.get('/books', async (req, res) => {
    try {
      const books = await Book.find();
      res.status(200).json(books);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  // Get a single book by ID
  app.get('/books/:id', async (req, res) => {
    try {
      const book = await Book.findById(req.params.id);
      if (!book) {
        return res.status(404).json({ error: 'Book not found' });
      }
      res.status(200).json(book);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  // Update a book by ID
  app.put('/books/:id', async (req, res) => {
    try {
      const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
      if (!book) {
        return res.status(404).json({ error: 'Book not found' });
      }
      res.status(200).json(book);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

  // Delete a book by ID
  app.delete('/books/:id', async (req, res) => {
    try {
      const book = await Book.findByIdAndDelete(req.params.id);
      if (!book) {
        return res.status(404).json({ error: 'Book not found' });
      }
      res.status(200).json({ message: 'Book deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // Delete all books
app.delete('/books', async (req, res) => {
    try {
      const result = await Book.deleteMany({});
      res.status(200).json({ message: 'All books deleted successfully', deletedCount: result.deletedCount });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  

// Start the server
const PORT = 3002;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
