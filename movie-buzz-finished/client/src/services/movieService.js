import axios from 'axios';

const BASE = '/api/movies';

export const movieService = {
  getMovies: () =>
    axios.get(BASE).then(res => res.data),

  getMovie: (id) =>
    axios.get(`${BASE}/${id}`).then(res => res.data),

  createMovie: (movieData) =>
    axios.post(BASE, movieData).then(res => res.data),

  updateMovie: (id, movieData) =>
    axios.put(`${BASE}/${id}`, movieData).then(res => res.data),

  deleteMovie: (id) =>
    axios.delete(`${BASE}/${id}`).then(res => res.data),
};
