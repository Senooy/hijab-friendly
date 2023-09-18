import './App.css';
import { ChakraProvider, Box, Heading } from '@chakra-ui/react';
import theme from './theme';

function App() {
  return (
    <ChakraProvider theme={theme}>
    </ChakraProvider>
  );
}

export default App;
