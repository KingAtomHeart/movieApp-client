import React, { useEffect, useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import AddMovieForm from './AddMovieForm';
import UpdateMovieForm from './UpdateMovieForm';
import { fetchMovies, deleteMovie } from '../utils/FetchHelper';
import { Notyf } from 'notyf'; 

const AdminDashboard = () => {
  const [movies, setMovies] = useState([]);
  const notyf = new Notyf(); 

  const fetchAndSetMovies = () => {
    fetchMovies().then(data => {
      setMovies(data.movies);
    });
  };

  useEffect(() => {
    fetchAndSetMovies();
  }, []);

  const handleDelete = (id) => {
    deleteMovie(id).then(() => {
      setMovies(movies.filter(movie => movie._id !== id));
      notyf.success('Movie deleted successfully!');
    });
  };

  const handleAddMovie = () => {
    notyf.success('Movie added successfully!'); 
    fetchAndSetMovies(); 
  };

  const handleUpdateMovie = () => {
    notyf.success('Movie updated successfully!'); 
    fetchAndSetMovies();
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <AddMovieForm onAddMovie={handleAddMovie} />
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Title</th>
            <th>Director</th>
            <th>Year</th>
            <th>Description</th> {/* New Description column */}
            <th>Genre</th> {/* New Genre column */}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {movies.map(movie => (
            <tr key={movie._id}>
              <td>{movie.title}</td>
              <td>{movie.director}</td>
              <td>{movie.year}</td>
              <td>{movie.description}</td> {/* Display Description */}
              <td>{movie.genre}</td> {/* Display Genre */}
              <td>
                <UpdateMovieForm movie={movie} onUpdateMovie={handleUpdateMovie} />
                <Button variant="danger" onClick={() => handleDelete(movie._id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default AdminDashboard;