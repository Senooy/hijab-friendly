import React, { useState } from 'react';
import { auth, provider } from '../firebaseConfig';
import { signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { Button, Icon, VStack, Heading, Text, Spinner, Input, FormControl, FormLabel, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure } from '@chakra-ui/react';
import ReCAPTCHA from "react-google-recaptcha";
import { FaGoogle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function Login() {
  
  const [isSignIn, setIsSignIn] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [captchaValue, setCaptchaValue] = useState(''); 
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();

  const handleCaptchaResponse = (value) => {
    setCaptchaValue(value);
  };

  const isValidEmail = (email) => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return regex.test(email);
  };

  const isValidPassword = (password) => {
    const regex = /^(?=.*[a-zA-Z]).{8,}$/;
    return regex.test(password);
  };

  const passwordsMatch = (password, confirmPassword) => {
    return password === confirmPassword;
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      const result = await signInWithPopup(auth, provider);
      console.log(result.user);
      onOpen();
    } catch (error) {
      console.error(error);
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async () => {
    // Vérification du reCAPTCHA
    if (!captchaValue) {
      setErrorMessage('Veuillez confirmer que vous n\'êtes pas un robot.');
      return;
    }
    
    // Validation de l'email
    if (!isValidEmail(email)) {
      setErrorMessage('L\'email est invalide.');
      return;
    }
    
    // Validation du mot de passe
    if (!isValidPassword(password)) {
      setErrorMessage('Le mot de passe doit contenir au moins 8 caractères, dont une lettre.');
      return;
    }
    
    // Vérification de la correspondance des mots de passe en mode inscription
    if (!isSignIn && !passwordsMatch(password, confirmPassword)) {
      setErrorMessage('Les mots de passe ne correspondent pas.');
      return;
    }

    setIsLoading(true);
    try {
        if (isSignIn) {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            console.log("Utilisateur connecté:", userCredential.user);
            onOpen();
        } else {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            console.log("Utilisateur inscrit:", userCredential.user);
            onOpen();
        }
    } catch (error) {
        console.error("Erreur:", error);
        setErrorMessage(error.message);
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <VStack spacing={6} mt={16} width="100%" maxWidth="400px" margin="auto">
      <Heading as="h1">{isSignIn ? "Connexion" : "Inscription"}</Heading>

      {errorMessage && <Text color="red.500">{errorMessage}</Text>}

      <FormControl>
        <FormLabel>Email</FormLabel>
        <Input
          type="email"
          placeholder="Votre email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>

      <FormControl>
        <FormLabel>Mot de passe</FormLabel>
        <Input
          type="password"
          placeholder="Votre mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </FormControl>

      {!isSignIn && (
        <FormControl>
          <FormLabel>Confirmer le mot de passe</FormLabel>
          <Input
            type="password"
            placeholder="Confirmez votre mot de passe"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </FormControl>
      )}

      <ReCAPTCHA
        sitekey={process.env.REACT_APP_GOOGLE_RECAPTCHA_KEY}
        onChange={handleCaptchaResponse}
      />

      {isLoading ? (
        <Spinner size="xl" />
      ) : (
        <>
          <Button width="100%" onClick={handleSubmit}>
            {isSignIn ? "Se connecter" : "S'inscrire"}
          </Button>
          <Button width="100%" onClick={handleGoogleSignIn} leftIcon={<Icon as={FaGoogle} boxSize={5} />}>
            Se connecter avec Google
          </Button>
          <Button width="100%" variant="link" onClick={() => setIsSignIn(!isSignIn)}>
            {isSignIn ? "Pas encore inscrit ? S'inscrire" : "Déjà inscrit ? Se connecter"}
          </Button>
          
          <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Inscription réussie !</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Félicitations, votre inscription a été effectuée avec succès.
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" onClick={() => {
              onClose();
              navigate('/');
            }}>
              Retour à l'accueil
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
        </>
      )}
    </VStack>
  );
}

export default Login;
