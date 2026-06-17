import axios from 'axios';

const BASE_URL = '/api/movies';

export async function getMovies() {
  const res = await axios.get(BASE_URL);
  return res.data;
}

export async function getMovie(id) {
  const res = await axios.get(`${BASE_URL}/${id}`);
  return res.data;
}

export async function createMovie(movieData) {
  const res = await axios.post(BASE_URL, movieData);
  return res.data;
}

export async function updateMovie(id, movieData) {
  const res = await axios.put(`${BASE_URL}/${id}`, movieData);
  return res.data;
}

export async function deleteMovie(id) {
  const res = await axios.delete(`${BASE_URL}/${id}`);
  return res.data;
}
