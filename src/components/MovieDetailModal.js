import React from 'react';
import { Modal, Button, Card } from 'react-bootstrap';

const MovieDetailModal = ({ movie, show, handleClose }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{movie.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Card>
          <Card.Body>
            <Card.Subtitle className="mb-2"><strong>Year: </strong>{movie.year}</Card.Subtitle>
            <Card.Text>{movie.description}</Card.Text>
            <Card.Text><strong>Director:</strong> {movie.director}</Card.Text>
            <Card.Text><strong>Genre:</strong> {movie.genre}</Card.Text>
          </Card.Body>
        </Card>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={handleClose}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default MovieDetailModal;