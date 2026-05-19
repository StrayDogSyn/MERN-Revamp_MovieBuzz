const mongoose = require('mongoose');
const { Types } = mongoose;

if (process.env.NODE_ENV !== 'test') {
  throw new Error('test_helper loaded outside of test environment. NODE_ENV must be "test".');
}

const TEST_DB_URI = 'mongodb://127.0.0.1/movie-buzz-test';

before(done => {
  mongoose.connect(TEST_DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
    .then(() => done())
    .catch(err => {
      console.error(`Test database connection error: ${err}`);
      done(err);
    });
});

beforeEach(done => {
  const { movies } = mongoose.connection.collections;
  if (!movies) return done();

  movies.drop()
    .then(() => movies.insertMany([
      {
        "_id": new Types.ObjectId("615f1f525cd505b8f0777f04"),
        "name": "Die Hard",
        "description": "An NYPD officer tries to save his wife and several others taken hostage by German terrorists during a Christmas party at the Nakatomi Plaza in Los Angeles.",
        "rating": "R", "length": "2h 12m", "year": 1988,
        "genre": ["Action", "Thriller"],
        "director": "John McTiernan",
        "stars": ["Bruce Willis", "Alan Rickman", "Bonnie Bedelia"]
      },
      {
        "_id": new Types.ObjectId("615f219d5cd505b8f0777f05"),
        "name": "Legend",
        "description": "A young man must stop the Lord of Darkness from destroying daylight.",
        "rating": "PG", "length": "1h 34m", "year": 1985,
        "genre": ["Adventure", "Fantasy", "Romance"],
        "director": "Ridley Scott",
        "stars": ["Tom Cruise", "Mia Sara", "Tim Curry"]
      },
      {
        "_id": new Types.ObjectId("615f219d5cd505b8f0777f06"),
        "name": "Crouching Tiger, Hidden Dragon",
        "description": "A young Chinese warrior steals a sword from a famed swordsman.",
        "rating": "PG-13", "length": "2h", "year": 2000,
        "genre": ["Action", "Adventure", "Fantasy"],
        "director": "Ang Lee",
        "stars": ["Chow Yun-Fat", "Michelle Yeoh", "Ziyi Zhang"]
      }
    ]))
    .then(() => done())
    .catch(err => {
      // On first run, collection may not exist — that's fine
      if (err.codeName === 'NamespaceNotFound') return done();
      done(err);
    });
});