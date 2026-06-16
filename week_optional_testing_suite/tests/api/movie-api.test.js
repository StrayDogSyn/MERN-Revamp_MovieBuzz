/**
 * Movie API Tests
 * Tests all CRUD operations for the Movie Buzz API endpoints.
 *
 * Designed for the reference implementation in movie-buzz-finished/.
 * Routes follow REST plural convention:
 *   GET    /api/movies          — all movies
 *   POST   /api/movies          — create
 *   GET    /api/movies/:id      — read one
 *   PUT    /api/movies/:id      — update
 *   DELETE /api/movies/:id      — delete
 */

const request = require('supertest');
const mongoose = require('mongoose');

describe('Movie API Tests', () => {
  const API_BASE = global.testConfig.apiBaseUrl.replace('/api', '');
  let testMovieId;
  let createdMovieIds = [];

  beforeAll(async () => {
    console.log('🎬 Starting Movie API Tests...');
  });

  afterAll(async () => {
    for (const id of createdMovieIds) {
      try {
        await request(API_BASE).delete(`/api/movies/${id}`);
      } catch (error) {
        // Ignore cleanup errors
      }
    }
    console.log('🧹 Movie API Tests completed');
  });

  describe('GET /api/movies', () => {
    test('should retrieve all movies', async () => {
      const response = await request(API_BASE)
        .get('/api/movies')
        .expect(200);

      expect(response.body).toBeDefined();
      expect(Array.isArray(response.body)).toBe(true);

      if (response.body.length > 0) {
        const movie = response.body[0];
        expect(movie).toHaveProperty('name');
        expect(movie).toHaveProperty('rating');
        expect(movie).toHaveProperty('genre');
        expect(movie).toHaveProperty('stars');
        expect(Array.isArray(movie.genre)).toBe(true);
        expect(Array.isArray(movie.stars)).toBe(true);
      }
    });

    test('should return movies with proper array fields', async () => {
      const response = await request(API_BASE)
        .get('/api/movies')
        .expect(200);

      if (response.body.length > 0) {
        response.body.forEach(movie => {
          expect(Array.isArray(movie.genre)).toBe(true);
          expect(Array.isArray(movie.stars)).toBe(true);

          if (movie.genre.length > 0) {
            expect(typeof movie.genre[0]).toBe('string');
          }
          if (movie.stars.length > 0) {
            expect(typeof movie.stars[0]).toBe('string');
          }
        });
      }
    });
  });

  describe('POST /api/movies', () => {
    test('should create a new movie with valid data', async () => {
      const newMovie = global.testMovies[0];

      const response = await request(API_BASE)
        .post('/api/movies')
        .send(newMovie)
        .expect(201);

      expect(response.body).toHaveProperty('_id');
      expect(response.body.name).toBe(newMovie.name);
      expect(response.body.rating).toBe(newMovie.rating);
      expect(response.body.genre).toEqual(newMovie.genre);
      expect(response.body.stars).toEqual(newMovie.stars);

      testMovieId = response.body._id;
      createdMovieIds.push(testMovieId);
    });

    test('should handle array fields correctly in creation', async () => {
      const movieWithArrays = {
        ...global.testMovies[1],
        name: 'Test Array Movie ' + Date.now()
      };

      const response = await request(API_BASE)
        .post('/api/movies')
        .send(movieWithArrays)
        .expect(201);

      expect(Array.isArray(response.body.genre)).toBe(true);
      expect(Array.isArray(response.body.stars)).toBe(true);
      expect(response.body.genre).toEqual(movieWithArrays.genre);
      expect(response.body.stars).toEqual(movieWithArrays.stars);

      createdMovieIds.push(response.body._id);
    });

    test('should reject movie with empty name', async () => {
      const invalidMovie = {
        name: '',
        rating: 'R'
      };

      await request(API_BASE)
        .post('/api/movies')
        .send(invalidMovie)
        .expect(400);
    });

    test('should reject movie with name shorter than 2 characters', async () => {
      const invalidMovie = { name: 'X' };

      await request(API_BASE)
        .post('/api/movies')
        .send(invalidMovie)
        .expect(400);
    });

    test('should reject movie with invalid rating enum', async () => {
      const invalidMovie = {
        name: 'Valid Title',
        rating: 'INVALID'
      };

      await request(API_BASE)
        .post('/api/movies')
        .send(invalidMovie)
        .expect(400);
    });
  });

  describe('GET /api/movies/:id', () => {
    test('should retrieve a specific movie by ID', async () => {
      if (!testMovieId) {
        const response = await request(API_BASE)
          .post('/api/movies')
          .send(global.testMovies[0])
          .expect(201);
        testMovieId = response.body._id;
        createdMovieIds.push(testMovieId);
      }

      const response = await request(API_BASE)
        .get(`/api/movies/${testMovieId}`)
        .expect(200);

      expect(response.body).toHaveProperty('_id', testMovieId);
      expect(response.body).toHaveProperty('name');
    });

    test('should return 400 for invalid ObjectId', async () => {
      await request(API_BASE)
        .get('/api/movies/invalid-id')
        .expect(400);
    });

    test('should return 404 for non-existent movie', async () => {
      const fakeId = new mongoose.Types.ObjectId();
      await request(API_BASE)
        .get(`/api/movies/${fakeId}`)
        .expect(404);
    });
  });

  describe('PUT /api/movies/:id', () => {
    test('should update an existing movie', async () => {
      if (!testMovieId) {
        const response = await request(API_BASE)
          .post('/api/movies')
          .send(global.testMovies[0])
          .expect(201);
        testMovieId = response.body._id;
        createdMovieIds.push(testMovieId);
      }

      const updatedData = {
        name: 'Updated Test Movie',
        rating: 'PG',
        genre: ['Comedy', 'Drama'],
        stars: ['Updated Actor 1', 'Updated Actor 2']
      };

      const response = await request(API_BASE)
        .put(`/api/movies/${testMovieId}`)
        .send(updatedData)
        .expect(200);

      expect(response.body.name).toBe(updatedData.name);
      expect(response.body.rating).toBe(updatedData.rating);
      expect(response.body.genre).toEqual(updatedData.genre);
      expect(response.body.stars).toEqual(updatedData.stars);
    });

    test('should handle array field updates correctly', async () => {
      const arrayUpdateData = {
        genre: ['Action', 'Adventure', 'Sci-Fi'],
        stars: ['New Star 1', 'New Star 2', 'New Star 3']
      };

      const response = await request(API_BASE)
        .put(`/api/movies/${testMovieId}`)
        .send(arrayUpdateData)
        .expect(200);

      expect(Array.isArray(response.body.genre)).toBe(true);
      expect(Array.isArray(response.body.stars)).toBe(true);
      expect(response.body.genre).toEqual(arrayUpdateData.genre);
      expect(response.body.stars).toEqual(arrayUpdateData.stars);
    });

    test('should return 400 for invalid ObjectId in update', async () => {
      await request(API_BASE)
        .put('/api/movies/invalid-id')
        .send({ name: 'Test Update' })
        .expect(400);
    });

    test('should return 404 for non-existent movie update', async () => {
      const fakeId = new mongoose.Types.ObjectId();
      await request(API_BASE)
        .put(`/api/movies/${fakeId}`)
        .send({ name: 'Test Update' })
        .expect(404);
    });
  });

  describe('DELETE /api/movies/:id', () => {
    test('should delete an existing movie', async () => {
      const response = await request(API_BASE)
        .post('/api/movies')
        .send({
          ...global.testMovies[2],
          name: 'Movie to Delete ' + Date.now()
        })
        .expect(201);

      const movieToDeleteId = response.body._id;

      await request(API_BASE)
        .delete(`/api/movies/${movieToDeleteId}`)
        .expect(200);

      await request(API_BASE)
        .get(`/api/movies/${movieToDeleteId}`)
        .expect(404);
    });

    test('should return 400 for invalid ObjectId in delete', async () => {
      await request(API_BASE)
        .delete('/api/movies/invalid-id')
        .expect(400);
    });

    test('should return 404 for non-existent movie delete', async () => {
      const fakeId = new mongoose.Types.ObjectId();
      await request(API_BASE)
        .delete(`/api/movies/${fakeId}`)
        .expect(404);
    });
  });

  describe('Data Integrity Tests', () => {
    test('should maintain data consistency across Create → Read → Update → Read → Delete', async () => {
      const originalMovie = {
        ...global.testMovies[3],
        name: 'Integrity Test Movie ' + Date.now()
      };

      // Create
      const createResponse = await request(API_BASE)
        .post('/api/movies')
        .send(originalMovie)
        .expect(201);

      const movieId = createResponse.body._id;

      // Read
      const readResponse = await request(API_BASE)
        .get(`/api/movies/${movieId}`)
        .expect(200);

      expect(readResponse.body.name).toBe(originalMovie.name);
      expect(readResponse.body.genre).toEqual(originalMovie.genre);

      // Update
      const updateData = { name: 'Updated Integrity Movie' };
      const updateResponse = await request(API_BASE)
        .put(`/api/movies/${movieId}`)
        .send(updateData)
        .expect(200);

      expect(updateResponse.body.name).toBe(updateData.name);

      // Read again — confirm persistence
      const readAgainResponse = await request(API_BASE)
        .get(`/api/movies/${movieId}`)
        .expect(200);

      expect(readAgainResponse.body.name).toBe(updateData.name);

      // Delete
      await request(API_BASE)
        .delete(`/api/movies/${movieId}`)
        .expect(200);
    });
  });
});
