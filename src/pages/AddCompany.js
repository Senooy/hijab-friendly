import React, { useState } from 'react';
import { db } from '../firebaseConfig';
import { collection, query, where, getDocs, addDoc } from 'firebase/firestore';
import { Button, FormControl, FormLabel, Input, VStack, Textarea, Select, Box, HStack, Heading } from '@chakra-ui/react';

function AddCompany() {
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [city, setCity] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [policy, setPolicy] = useState('noInfo'); // valeur par défaut à 'Pas d'information'
    const [comments, setComments] = useState('');
    const [lastUpdate, setLastUpdate] = useState('');
    const [contactEmail, setContactEmail] = useState('');
    const [contactPhone, setContactPhone] = useState('');
    
  
    const handleNameChange = async (e) => {
      const inputValue = e.target.value;
      setName(inputValue);
  
      // Si l'inputValue est non vide, recherchez les entreprises correspondantes
      if (inputValue) {
        const q = query(collection(db, 'companies'), where('name', '>=', inputValue), where('name', '<=', inputValue + '\uf8ff'));
        const querySnapshot = await getDocs(q);
        const companies = [];
        querySnapshot.forEach((doc) => {
          companies.push(doc.data().name);
        });
        setSearchResults(companies);
      } else {
        setSearchResults([]);
      }
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();

    try {
      const docRef = await addDoc(collection(db, 'companies'), {
        name,
        address,
        city,
        zipCode,
        policy,
        comments,
        lastUpdate,
        contactEmail,
        contactPhone
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <VStack spacing={4} width="100%" maxWidth="600px" margin="auto">
      <Heading as="h2">Ajouter une entreprise</Heading>
      
      <FormControl>
        <FormLabel>Nom de l'entreprise</FormLabel>
        <Input value={name} onChange={(e) => setName(e.target.value)} />
      </FormControl>

      <HStack spacing={4} width="100%">
        <FormControl flex="1">
          <FormLabel>Adresse</FormLabel>
          <Input value={address} onChange={(e) => setAddress(e.target.value)} />
        </FormControl>
        <FormControl flex="1">
          <FormLabel>Code postal</FormLabel>
          <Input value={zipCode} onChange={(e) => setZipCode(e.target.value)} />
        </FormControl>
      </HStack>

      <FormControl>
        <FormLabel>Ville</FormLabel>
        <Input value={city} onChange={(e) => setCity(e.target.value)} />
      </FormControl>

      <FormControl>
        <FormLabel>Politique sur le port du voile</FormLabel>
        <Select value={policy} onChange={(e) => setPolicy(e.target.value)}>
          <option value="accepted">Accepté</option>
          <option value="notAccepted">Non accepté</option>
          <option value="noInfo">Pas d'information</option>
        </Select>
      </FormControl>

      <FormControl>
        <FormLabel>Commentaires / Témoignages</FormLabel>
        <Textarea value={comments} onChange={(e) => setComments(e.target.value)} />
      </FormControl>

      <HStack spacing={4} width="100%">
        <FormControl flex="1">
          <FormLabel>Email de contact (entreprise)</FormLabel>
          <Input type="email" value={contactEmail} onChange={(e) => setContactEmail(e.target.value)} />
        </FormControl>
        <FormControl flex="1">
          <FormLabel>Téléphone de contact (entreprise)</FormLabel>
          <Input type="tel" value={contactPhone} onChange={(e) => setContactPhone(e.target.value)} />
        </FormControl>
      </HStack>

      <FormControl>
        <FormLabel>Date de la dernière mise à jour</FormLabel>
        <Input type="date" value={lastUpdate} onChange={(e) => setLastUpdate(e.target.value)} />
      </FormControl>

      <Button colorScheme="blue" onClick={handleSubmit}>Ajouter</Button>
    </VStack>
  );
}

export default AddCompany;
