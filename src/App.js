import './App.css';
import React from 'react';
import { ChakraProvider, Box, Heading } from '@chakra-ui/react';
import theme from './theme';
import Home from './pages/home.js';
import Header from './components/header';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Header />
      <Home />
    </ChakraProvider>
  );
}

export default App;
