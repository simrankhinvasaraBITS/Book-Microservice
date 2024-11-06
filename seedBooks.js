const axios = require('axios');

const books = [
  {
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    genre: "Fiction",
    description: "A novel about teenage rebellion and angst.",
    publishYear: 1951,
    available: true
  },
  {
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    genre: "Historical Fiction",
    description: "A novel about racism and injustice in the Deep South.",
    publishYear: 1960,
    available: true
  },
  {
    title: "1984",
    author: "George Orwell",
    genre: "Dystopian",
    description: "A dystopian novel about totalitarianism and surveillance.",
    publishYear: 1949,
    available: false
  },
  {
    title: "Pride and Prejudice",
    author: "Jane Austen",
    genre: "Classic Romance",
    description: "A romantic novel that critiques the British landed gentry at the end of the 18th century.",
    publishYear: 1813,
    available: true
  },
  {
    title: "Moby-Dick",
    author: "Herman Melville",
    genre: "Adventure",
    description: "The narrative of Captain Ahab’s obsessive quest to avenge the whale that ‘reaped’ his leg.",
    publishYear: 1851,
    available: false
  }
];

async function seedBooks() {
  for (const book of books) {
    try {
      const response = await axios.post('http://localhost:3002/books', book);
      console.log('Book added:', response.data);
    } catch (error) {
      console.error('Error adding book:', error.response ? error.response.data : error.message);
    }
  }
}

seedBooks();
