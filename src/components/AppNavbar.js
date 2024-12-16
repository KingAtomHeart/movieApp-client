import React, { useContext } from 'react';
import { Navbar, Nav, Button, Container } from 'react-bootstrap';
import { UserContext } from '../context/UserContext';

const AppNavbar = () => {
  const { user, logout } = useContext(UserContext);

  return (
    <Navbar bg="success" variant="dark" expand="lg" sticky="top" className="shadow-sm">
      <Container>
        <Navbar.Brand href="/">Movie Catalog</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto align-items-center">
            {user ? (
              <>
                {!user.isAdmin && (
                  <Nav.Link href="/" className="text-white">
                    Movies
                  </Nav.Link>
                )}
                {user.isAdmin && (
                  <Nav.Link href="/admin" className="text-white">
                    Admin Dashboard
                  </Nav.Link>
                )}
                <Button
                  variant="outline-light"
                  size="sm"
                  className="ms-2"
                  onClick={logout}
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Nav.Link href="/login" className="text-white">
                  Login
                </Nav.Link>
                <Nav.Link href="/register" className="text-white">
                  Register
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
