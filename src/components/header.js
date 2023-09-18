// src/components/Header.js

import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { Box, Flex, Text, Link, Button } from '@chakra-ui/react';

function Header() {
    const location = useLocation();
    const navigate = useNavigate();
  
    const handleLoginClick = () => {
      navigate('/login');
    }
  
    return (
      <Flex as="header" justifyContent="space-between" alignItems="center" padding={4} bg="macchiato.peach" color="white">
      {/* Logo */}
      <Text fontSize="xl" fontWeight="bold">
        Hijab Friendly
      </Text>

      {/* Navigation */}
      <Flex alignItems="center">
        <Link marginX={2}>Accueil</Link>
        <Link marginX={2}>À propos</Link>
        <Link marginX={2}>Contact</Link>
      {/* Bouton Se connecter */}
      {location.pathname !== '/login' && (
        <Button marginLeft={4} colorScheme="yellow" onClick={handleLoginClick}>Se connecter</Button>
      )}
    </Flex>
    </Flex>
    );
}

export default Header;
