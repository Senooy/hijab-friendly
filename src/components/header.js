// src/components/Header.js

import React from 'react';
import { Box, Flex, Text, Link } from '@chakra-ui/react';

function Header() {
  return (
    <Flex as="header" justifyContent="space-between" alignItems="center" padding={4} bg="macchiato.peach" color="white">
      {/* Logo */}
      <Text fontSize="xl" fontWeight="bold">
        Hijab Friendly
      </Text>

      {/* Navigation */}
      <Box>
        <Link marginX={2}>Accueil</Link>
        <Link marginX={2}>À propos</Link>
        <Link marginX={2}>Contact</Link>
      </Box>
    </Flex>
  );
}

export default Header;
