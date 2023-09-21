import React from "react";
import { Box, Text, Input, List, ListItem, Image, Button } from "@chakra-ui/react"; 
import { useNavigate } from "react-router-dom";




function Home() {
  // Données fictives pour les entreprises
  const companies = [
    { name: "Entreprise A", acceptsHijab: true },
    { name: "Entreprise B", acceptsHijab: false },
    { name: "Entreprise C", acceptsHijab: true },
    // ... ajoute autant d'entreprises que nécessaire
  ];

  const navigate = useNavigate();
  
  return (
    <Box 
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      padding={4}
      textAlign="center"
    >
      {/* Logo */}
      <Image src="path_to_your_logo.png" alt="Hijab Friendly" marginBottom={4} width="100px" />

      {/* Texte */}
      <Text marginBottom={4}>
        Trouvez facilement des entreprises qui acceptent le voile.
      </Text>

      {/* Champ de recherche */}
      <Input placeholder="Rechercher une entreprise..." marginBottom={4} width="80%" />

      {/* Bouton pour ajouter une entreprise */}
      <Button marginBottom={4} colorScheme="blue" onClick={() => navigate("/add-company")}>
       Ajouter une entreprise
     </Button>


      {/* Liste des entreprises */}
      <List width="80%" spacing={3}>
        {companies.map((company, index) => (
          <ListItem key={index} padding={2} borderRadius="md" boxShadow="sm" bg="white">
            {company.name} - {company.acceptsHijab ? "Accepte le voile" : "N'accepte pas le voile"}
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

export default Home;
