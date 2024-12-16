import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const navigate = useNavigate();
  const notyf = new Notyf();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const { email, password, confirmPassword } = formData;

    if (password !== confirmPassword) {
      notyf.error('Passwords do not match');
      return;
    }

    try {
      const response = await fetch('https://movieapp-api-lms1.onrender.com/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        notyf.success('Registration successful');
        navigate('/login');
      } else {
        notyf.error('Registration failed');
      }
    } catch (error) {
      notyf.error('An error occurred during registration');
    }
  };

  return (
    <Container className="mt-5">
      <h1 className="mb-4">Register</h1>
      <Form onSubmit={handleRegister}>
        <Form.Group controlId="email" className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="Enter email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group controlId="password" className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="Enter password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group controlId="confirmPassword" className="mb-3">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            name="confirmPassword"
            placeholder="Confirm password"
            value={formData.confirmPassword}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Button variant="primary" type="submit">Register</Button>
      </Form>
    </Container>
  );
};

export default RegisterPage;
