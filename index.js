const express = require('express');
const { getMovies, getMoviesById } = require('./controllers');

const cors = require('cors');
const app = express();
app.use(cors());

app.use(express.json());

// Exercise 1: Retrieve All Movies

app.get('/movies', (req, res) => {
  let result = getMovies();
  if (result.length === 0) {
    return res.status(404).json({ error: 'Data not found!' });
  }
  res.json(result);
});

// Exercise 2: Retrieve Movie by ID

app.get('/movies/details/:id', (req, res) => {
  let id = parseInt(req.params.id);
  let result = getMoviesById(id);
  if (result.length === 0) {
    return res.status(404).json({ error: 'Data not found!' });
  }
  res.json(result);
});

module.exports = { app };
