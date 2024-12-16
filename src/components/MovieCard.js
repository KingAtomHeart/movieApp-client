import React from 'react';
import { Card, Button } from 'react-bootstrap';

const MovieCard = ({ movie, onShowDetails, isLoggedIn }) => {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>{movie.title}</Card.Title>
        <Card.Subtitle className="mb-2"><strong>Year: </strong>{movie.year}</Card.Subtitle>
        <Card.Text>{movie.description}</Card.Text>
        <Card.Text><strong>Director:</strong> {movie.director}</Card.Text>
        <Card.Text><strong>Genre:</strong> {movie.genre}</Card.Text>
        {isLoggedIn && (
          <Button variant="primary" onClick={() => onShowDetails(movie)}>Details</Button>
        )}
      </Card.Body>
    </Card>
  );
};

export default MovieCard;