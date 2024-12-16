import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { updateMovie } from '../utils/FetchHelper';

const UpdateMovieForm = ({ movie, onUpdateMovie }) => {
  const [show, setShow] = useState(false);
  const [updatedMovie, setUpdatedMovie] = useState(movie);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedMovie((prevMovie) => ({ ...prevMovie, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateMovie(movie._id, updatedMovie).then(() => {
      setShow(false);
      onUpdateMovie();  // Call the function to refetch movies
    });
  };

  return (
    <>
      <Button variant="warning" onClick={() => setShow(true)}>Edit</Button>
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Update Movie</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" name="title" value={updatedMovie.title} onChange={handleChange} />
            </Form.Group>
            <Form.Group controlId="director">
              <Form.Label>Director</Form.Label>
              <Form.Control type="text" name="director" value={updatedMovie.director} onChange={handleChange} />
            </Form.Group>
            <Form.Group controlId="year">
              <Form.Label>Year</Form.Label>
              <Form.Control type="number" name="year" value={updatedMovie.year} onChange={handleChange} />
            </Form.Group>
            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control type="text" name="description" value={updatedMovie.description} onChange={handleChange} />
            </Form.Group>
            <Form.Group controlId="genre">
              <Form.Label>Genre</Form.Label>
              <Form.Control type="text" name="genre" value={updatedMovie.genre} onChange={handleChange} />
            </Form.Group>
            <Button type="submit">Save Changes</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default UpdateMovieForm;