import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Notyf } from 'notyf';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const notyf = new Notyf();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const parsedUser = JSON.parse(atob(token.split('.')[1]));
      setUser(parsedUser);
    }
  }, []);

  const login = async (email, password) => {
    try {
      const res = await fetch('https://movieapp-api-lms1.onrender.com/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`HTTP error! status: ${res.status} - ${errorText}`);
      }

      const data = await res.json();
      if (data.access) {
        localStorage.setItem('token', data.access);
        const parsedUser = JSON.parse(atob(data.access.split('.')[1]));
        setUser(parsedUser);
        notyf.success('Logged in successfully');
        navigate('/');
      }
    } catch (error) {
      console.error("Login failed:", error);
      notyf.error('Login failed: ' + error.message);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
  };

  const isLoggedIn = user !== null; // Check if user is logged in

  return (
    <UserContext.Provider value={{ user, login, logout, isLoggedIn }}>
      {children}
    </UserContext.Provider>
  );
};