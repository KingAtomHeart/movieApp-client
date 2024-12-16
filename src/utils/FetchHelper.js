const BASE_URL = 'https://movieapp-api-lms1.onrender.com';

// Fetch all movies
export const fetchMovies = async () => {
  const res = await fetch(`${BASE_URL}/movies/getMovies`);
  return res.json();
};

// Add a new movie
export const addMovie = async (movie) => {
  const token = localStorage.getItem('token');
  const res = await fetch(`${BASE_URL}/movies/addMovie`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(movie)
  });
  return res.json();
};

// Delete a movie by ID
export const deleteMovie = async (id) => {
  const token = localStorage.getItem('token');
  const res = await fetch(`${BASE_URL}/movies/deleteMovie/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.json();
};

// Update a movie by ID (new function)
export const updateMovie = async (id, updatedMovie) => {
  const token = localStorage.getItem('token');
  const res = await fetch(`${BASE_URL}/movies/updateMovie/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(updatedMovie)
  });
  return res.json();
};