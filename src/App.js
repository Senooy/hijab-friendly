import './App.css';
import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import theme from './theme';
import Home from './pages/home.js';
import Header from './components/header';
import AddCompany from './pages/AddCompany'; 
import Login from './pages/Login'; 

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/add-company" element={
            <PrivateWrapper>
              <AddCompany />
            </PrivateWrapper>
          } />
        </Routes>
      </Router>
    </ChakraProvider>
  );
}


function PrivateWrapper({ children }) {
  const isAuthenticated = false; // Remplace cela par ta logique d'authentification

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}



export default App;
