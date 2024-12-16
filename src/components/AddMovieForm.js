import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { addMovie } from '../utils/FetchHelper';

const AddMovieForm = ({ onAddMovie }) => {
  const [show, setShow] = useState(false);
  const [movie, setMovie] = useState({
    title: '', director: '', year: '', description: '', genre: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMovie((prevMovie) => ({ ...prevMovie, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addMovie(movie).then(() => {
      setShow(false);
      onAddMovie();  // Call the function to refetch movies
    });
  };

  return (
    <>
      <Button onClick={() => setShow(true)}>Add Movie</Button>
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Movie</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" name="title" value={movie.title} onChange={handleChange} />
            </Form.Group>
            <Form.Group controlId="director">
              <Form.Label>Director</Form.Label>
              <Form.Control type="text" name="director" value={movie.director} onChange={handleChange} />
            </Form.Group>
            <Form.Group controlId="year">
              <Form.Label>Year</Form.Label>
              <Form.Control type="number" name="year" value={movie.year} onChange={handleChange} />
            </Form.Group>
            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control type="text" name="description" value={movie.description} onChange={handleChange} />
            </Form.Group>
            <Form.Group controlId="genre">
              <Form.Label>Genre</Form.Label>
              <Form.Control type="text" name="genre" value={movie.genre} onChange={handleChange} />
            </Form.Group>
            <Button type="submit">Submit</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AddMovieForm;