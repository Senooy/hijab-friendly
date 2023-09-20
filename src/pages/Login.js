import React, { useState } from 'react';
import { auth, provider } from '../firebaseConfig';
import { signInWithPopup } from 'firebase/auth';
import { Button, VStack, Heading, Text, Spinner, Input, FormControl, FormLabel, FormErrorMessage } from '@chakra-ui/react';
import ReCAPTCHA from "react-google-recaptcha";

function Login() {
  
  const [isSignIn, setIsSignIn] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [captchaValue, setCaptchaValue] = useState(''); 
  const handleCaptchaResponse = (value) => {
    setCaptchaValue(value);
};

const isValidEmail = (email) => {
  const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return regex.test(email);
};

const isValidPassword = (password) => {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
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
    } catch (error) {
      console.log(error);
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = () => {
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
      setErrorMessage('Le mot de passe doit contenir au moins 8 caractères, dont une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial.');
      return;
    }
    
    // Vérification de la correspondance des mots de passe en mode inscription
    if (!isSignIn && !passwordsMatch(password, confirmPassword)) {
      setErrorMessage('Les mots de passe ne correspondent pas.');
      return;
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
          <Button width="100%" onClick={handleGoogleSignIn}>Se connecter avec Google</Button>
          <Button width="100%" variant="link" onClick={() => setIsSignIn(!isSignIn)}>
            {isSignIn ? "Pas encore inscrit ? S'inscrire" : "Déjà inscrit ? Se connecter"}
          </Button>
        </>
      )}
    </VStack>
  );
}


export default Login;
