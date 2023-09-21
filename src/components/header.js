import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom';
import { Flex, Text, Link, Button, useBreakpointValue, IconButton, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerBody, VStack } from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import { getAuth, signOut } from 'firebase/auth';

function Header() {
    const location = useLocation();
    const navigate = useNavigate();
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false); // Ajouté pour gérer l'état de connexion de l'utilisateur
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const btnRef = useRef();
    const auth = getAuth();

    useEffect(() => {
      // Écoutez les changements d'état de l'utilisateur
      const unsubscribe = auth.onAuthStateChanged(user => {
          if (user) {
              // L'utilisateur est connecté
              setIsUserLoggedIn(true);
          } else {
              // L'utilisateur est déconnecté
              setIsUserLoggedIn(false);
          }
      });
  
      // Nettoyez l'écouteur lorsque le composant est démonté
      return () => unsubscribe();
  }, [auth]);  // Ajoutez 'auth' ici

    const handleLoginClick = () => {
      navigate('/login');
    }

    const handleLogoutClick = async () => {
        try {
            await signOut(auth);
            setIsUserLoggedIn(false);
            navigate('/');
        } catch (error) {
            console.error("Erreur lors de la déconnexion:", error);
        }
    }

    const handleDrawerOpen = () => {
      setIsDrawerOpen(true);
    };

    const handleDrawerClose = () => {
      setIsDrawerOpen(false);
    };

    const displayType = useBreakpointValue({ base: "mobile", md: "desktop" });

    return (
      <Flex as="header" justifyContent="space-between" alignItems="center" padding={4} bg="macchiato.peach" color="white" marginBottom="4">
        {/* Logo */}
        <RouterLink to="/">
          <Text fontSize="xl" fontWeight="bold">
            Hijab Friendly
          </Text>
        </RouterLink>

        {displayType === "desktop" ? (
          <Flex alignItems="center">
            <Link marginX={2}>Accueil</Link>
            <Link marginX={2}>À propos</Link>
            <Link marginX={2}>Contact</Link>
            {isUserLoggedIn ? (
              <Button marginLeft={4} colorScheme="red" onClick={handleLogoutClick}>Se déconnecter</Button>
            ) : (
              location.pathname !== '/login' && (
                <Button marginLeft={4} colorScheme="yellow" onClick={handleLoginClick}>Se connecter</Button>
              )
            )}
          </Flex>
        ) : (
          <>
            <IconButton ref={btnRef} icon={<HamburgerIcon />} onClick={handleDrawerOpen} />
            <Drawer isOpen={isDrawerOpen} placement="right" onClose={handleDrawerClose} finalFocusRef={btnRef}>
              <DrawerOverlay>
                <DrawerContent>
                  <DrawerCloseButton />
                  <DrawerBody>
                    <VStack spacing={4} mt={4}>
                      <Link onClick={handleDrawerClose}>Accueil</Link>
                      <Link onClick={handleDrawerClose}>À propos</Link>
                      <Link onClick={handleDrawerClose}>Contact</Link>
                      {isUserLoggedIn ? (
                        <Button colorScheme="red" onClick={handleLogoutClick}>Se déconnecter</Button>
                      ) : (
                        location.pathname !== '/login' && (
                          <Button colorScheme="yellow" onClick={handleLoginClick}>Se connecter</Button>
                        )
                      )}
                    </VStack>
                  </DrawerBody>
                </DrawerContent>
              </DrawerOverlay>
            </Drawer>
          </>
        )}
      </Flex>
    );
}

export default Header;
