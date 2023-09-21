import './App.css';
import { React, useContext } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AuthProvider from './AuthProvider';
import AuthContext from './AuthContext'; // Remplacez 'path-to-your-AuthContext-file' par le chemin relatif vers votre fichier AuthContext
import theme from './theme';
import Home from './pages/home.js';
import Header from './components/header';
import AddCompany from './pages/AddCompany'; 
import Login from './pages/Login'; 

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Router>
      <AuthProvider>
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
        </AuthProvider>
      </Router>
      
    </ChakraProvider>
  );
}


function PrivateWrapper({ children }) {
  const { isUserLoggedIn } = useContext(AuthContext); // Utilisez le contexte d'authentification

  if (!isUserLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return children;
}



export default App;
