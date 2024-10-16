const { beforeEach } = require('node:test');
const { getMovies, getMoviesById } = require('../controllers');
let { app } = require('../index.js');

let http = require('http');
let request = require('supertest');

jest.mock('../controllers', () => ({
  ...jest.requireActual('../controllers'),
  getMovies: jest.fn(),
  getMoviesById: jest.fn(),
}));

let server;

beforeAll((done) => {
  server = http.createServer(app);
  server.listen(3001, done);
});

afterAll((done) => {
  server.close(done);
});

describe('API endpints testing', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('should get all employees', async () => {
    let mockData = [
      {
        movieId: 1,
        title: 'Inception',
        genre: 'Sci-Fi',
        director: 'Christopher Nolan',
      },
      {
        movieId: 2,
        title: 'The Shawshank Redemption',
        genre: 'Drama',
        director: 'Frank Darabont',
      },
      {
        movieId: 3,
        title: 'The Godfather',
        genre: 'Crime',
        director: 'Francis Ford Coppola',
      },
    ];
    getMovies.mockReturnValue(mockData);
    let result = await request(server).get('/movies');
    expect(result.statusCode).toBe(200);
    expect(result.body).toEqual(mockData);
    expect(result.body.length).toBe(3);
  });

  it('should get employee by id', async () => {
    let mockData = {
      movieId: 1,
      title: 'Inception',
      genre: 'Sci-Fi',
      director: 'Christopher Nolan',
    };
    getMoviesById.mockReturnValue(mockData);
    let result = await request(server).get('/movies/details/1');
    expect(result.statusCode).toBe(200);
    expect(result.body).toEqual(mockData);
  });
});

describe('function mock testing', () => {
  it('getMovies should get all movies', async () => {
    let mockData = [
      {
        movieId: 1,
        title: 'Inception',
        genre: 'Sci-Fi',
        director: 'Christopher Nolan',
      },
      {
        movieId: 2,
        title: 'The Shawshank Redemption',
        genre: 'Drama',
        director: 'Frank Darabont',
      },
      {
        movieId: 3,
        title: 'The Godfather',
        genre: 'Crime',
        director: 'Francis Ford Coppola',
      },
    ];
    getMovies.mockReturnValue(mockData);
    let result = await getMovies();
    expect(result).toEqual(mockData);
  });
});
