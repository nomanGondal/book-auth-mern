import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';

// Import your components
import Home from "./components/Home";
import Signup from './components/Signup';
import Login from './components/Login';
import Mainpage from './components/Mainpage';
import ProtectedRoute from './components/ProtectedRoute';
import { GoogleOAuthProvider } from '@react-oauth/google';

function AppRoutes() {

  const navigate = useNavigate();
  const location = useLocation();

  

  return (
    <Routes>
      <Route path="/" element={<GoogleOAuthProvider clientId="169216277182-vm697dsul8o0fkcpn9di68lt380aujej.apps.googleusercontent.com"><Home /></GoogleOAuthProvider>} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/mainpage"
        element={
          <ProtectedRoute>
            <Mainpage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default function App() {

  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}
