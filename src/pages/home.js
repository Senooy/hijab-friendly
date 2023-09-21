import React, { useState, useEffect } from "react";
import { Box, Text, Input, Image, Button, Grid, GridItem, VStack } from "@chakra-ui/react"; 
import { useNavigate } from "react-router-dom";
import { db } from "../firebaseConfig"; // Assurez-vous que ce chemin est correct
import { collection, getDocs } from "firebase/firestore";

function Home() {
  const [companies, setCompanies] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const companyCollection = collection(db, "companies");
      const companySnapshot = await getDocs(companyCollection);
      const companyList = companySnapshot.docs.map(doc => doc.data());
      setCompanies(companyList);
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (searchValue.length >= 3) {
      const results = companies.filter(company =>
        company.name.toLowerCase().includes(searchValue.toLowerCase())
      );
      setFilteredCompanies(results);
    } else {
      setFilteredCompanies(companies);
    }
  }, [searchValue, companies]);

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
      <Input 
        placeholder="Rechercher une entreprise..." 
        marginBottom={4} 
        width="80%" 
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />

      {/* Bouton pour ajouter une entreprise */}
      <Button marginBottom={4} colorScheme="blue" onClick={() => navigate("/add-company")}>
       Ajouter une entreprise
     </Button>


      {/* Grille des entreprises */}
      <Grid templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(3, 1fr)", lg: "repeat(6, 1fr)" }} gap={4} width="100%">
        {filteredCompanies.map((company, index) => (
          <GridItem key={index} bg="white" padding={2} borderRadius="md" boxShadow="sm" height="auto">
            <VStack align="start" spacing={2}>
              <Text fontWeight="bold">{company.name}</Text>
              <Text>{company.address}</Text>
              <Text>{company.city}, {company.zipCode}</Text>
              <Text>{company.policy === "accepted" ? "Accepte le voile" : "N'accepte pas le voile"}</Text>
              <Text>Email: {company.contactEmail}</Text>
              <Text>Tél: {company.contactPhone}</Text>
            </VStack>
          </GridItem>
        ))}
      </Grid>
    </Box>
  );
}

export default Home;