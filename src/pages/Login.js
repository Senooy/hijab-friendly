import React, { useState } from 'react';
import { auth, provider } from '../firebaseConfig';
import { signInWithPopup } from 'firebase/auth';
import { Button, VStack, Heading, Text, Spinner, Input, FormControl, FormLabel, FormErrorMessage } from '@chakra-ui/react';

function Login() {
  const [isSignIn, setIsSignIn] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

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
    // Traiter la connexion ou l'inscription
    // Pour l'inscription, vérifiez d'abord si le mot de passe et confirmPassword correspondent.
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
