import React, { useEffect, useState, useContext } from 'react';
import { Row, Col } from 'react-bootstrap';
import MovieCard from '../components/MovieCard';
import MovieDetailModal from '../components/MovieDetailModal';
import { fetchMovies } from '../utils/FetchHelper';
import { UserContext } from '../context/UserContext';

const HomePage = () => {
  const { isLoggedIn } = useContext(UserContext); // Get isLoggedIn from UserContext
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchMovies().then(data => setMovies(data.movies));
  }, []);

  const handleShowDetails = (movie) => {
    setSelectedMovie(movie);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedMovie(null);
  };

  return (
    <div>
      <h1>Movies</h1>
      <Row>
        {movies.map(movie => (
          <Col key={movie._id} sm={12} md={6} lg={4}>
            <MovieCard 
              movie={movie} 
              onShowDetails={handleShowDetails} 
              isLoggedIn={isLoggedIn} 
            />
          </Col>
        ))}
      </Row>
      {selectedMovie && (
        <MovieDetailModal 
          movie={selectedMovie} 
          show={showModal} 
          handleClose={handleCloseModal} 
        />
      )}
    </div>
  );
};

export default HomePage;