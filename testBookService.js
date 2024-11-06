const axios = require('axios');

const baseURL = 'http://localhost:3002';
let bookId; // To store the ID of the created book

// Add a New Book
async function addBook() {
  try {
    const response = await axios.post(`${baseURL}/books`, {
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      genre: 'Fiction',
      description: 'A novel about the American dream and the disillusionment of the Jazz Age.',
      publishYear: 1925,
      available: true
    });
    console.log('Add Book Response:', response.data);
    bookId = response.data._id; // Save the book ID for later tests
  } catch (error) {
    console.error('Error Adding Book:', error.response?.data || error.message);
  }
}

// Get All Books
async function getAllBooks() {
  try {
    const response = await axios.get(`${baseURL}/books`);
    console.log('All Books:', response.data);
  } catch (error) {
    console.error('Error Fetching All Books:', error.response?.data || error.message);
  }
}

// Get Book by ID
async function getBookById() {
  try {
    if (!bookId) {
      console.error('No book ID available to fetch a book.');
      return;
    }
    const response = await axios.get(`${baseURL}/books/${bookId}`);
    console.log(`Book Details for ID ${bookId}:`, response.data);
  } catch (error) {
    console.error('Error Fetching Book by ID:', error.response?.data || error.message);
  }
}

// Update a Book
async function updateBook() {
  try {
    if (!bookId) {
      console.error('No book ID available to update a book.');
      return;
    }
    const response = await axios.put(`${baseURL}/books/${bookId}`, {
      available: false,
      description: 'Updated: A revised description of the book.'
    });
    console.log('Update Book Response:', response.data);
  } catch (error) {
    console.error('Error Updating Book:', error.response?.data || error.message);
  }
}

// Delete a Book
async function deleteBook() {
  try {
    if (!bookId) {
      console.error('No book ID available to delete a book.');
      return;
    }
    const response = await axios.delete(`${baseURL}/books/${bookId}`);
    console.log('Delete Book Response:', response.data);
  } catch (error) {
    console.error('Error Deleting Book:', error.response?.data || error.message);
  }
}

// Execute Tests Sequentially
async function runTests() {
  console.log('Starting Books Microservice Tests...');
  await addBook(); // Add a new book
  await getAllBooks(); // Fetch all books
  await getBookById(); // Fetch the added book by ID
  await updateBook(); // Update the book's availability and description
  await deleteBook(); // Delete the book
  console.log('Finished Books Microservice Tests.');
}

runTests();
