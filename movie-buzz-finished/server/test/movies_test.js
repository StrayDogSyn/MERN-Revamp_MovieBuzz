const assert = require('assert');
const request = require('supertest');
const server = require('../server');
const mongoose = require('mongoose');
const Movie = mongoose.model('movie');

describe('Movies API', () => {

  it('GET /api/movies returns all seeded movies', done => {
    request(server)
      .get('/api/movies')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        assert(Array.isArray(res.body));
        assert(res.body.length >= 3);
        done();
      });
  });

  it('POST /api/movie/new creates a new movie and returns 201', done => {
    request(server)
      .post('/api/movie/new')
      .send({
        name: 'The Philadelphia Story',
        description: 'When a rich woman\u2019s ex-husband and a tabloid reporter turn up before her remarriage.',
        rating: 'NR',
        length: '112 minutes',
        year: 1940,
        genre: ['Romance', 'Comedy'],
        director: 'George Cukor',
        stars: ['Cary Grant', 'Katharine Hepburn', 'James Stewart']
      })
      .expect(201)
      .end((err, res) => {
        if (err) return done(err);
        assert.strictEqual(res.body.name, 'The Philadelphia Story');
        assert.strictEqual(res.body.length, '112 minutes');
        done();
      });
  });

  it('POST /api/movie/new returns 400 when name is missing', done => {
    request(server)
      .post('/api/movie/new')
      .send({ year: 2024, rating: 'PG' })
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);
        assert(res.body.error);
        done();
      });
  });

  it('PUT /api/movie/:id updates an existing movie', done => {
    const movie = new Movie({
      name: 'The Treasure of the Sierra Madre',
      description: 'Two down-on-their-luck Americans mine for gold in Mexico.',
      rating: 'NR', length: '126 minutes', year: 1948,
      genre: ['Western', 'Adventure'],
      director: 'John Huston',
      stars: ['Humphrey Bogart', 'Walter Huston']
    });
    movie.save()
      .then(() => {
        request(server)
          .put(`/api/movie/${movie._id}`)
          .send({ description: 'Updated description for Sierra Madre.' })
          .expect(200)
          .end((err, res) => {
            if (err) return done(err);
            assert.strictEqual(res.body.description, 'Updated description for Sierra Madre.');
            done();
          });
      })
      .catch(done);
  });

  it('DELETE /api/movie/:id removes the movie', done => {
    const movie = new Movie({
      name: 'Ran',
      description: 'An elderly warlord retires and hands power to his three sons.',
      rating: 'R', length: '162 minutes', year: 1985,
      genre: ['Drama', 'War'],
      director: 'Akira Kurosawa',
      stars: ['Tatsuya Nakadai', 'Akira Terao']
    });
    movie.save()
      .then(() => {
        request(server)
          .delete(`/api/movie/${movie._id}`)
          .expect(200)
          .end((err) => {
            if (err) return done(err);
            Movie.findOne({ name: 'Ran' })
              .then(data => {
                assert.strictEqual(data, null);
                done();
              })
              .catch(done);
          });
      })
      .catch(done);
  });

});
