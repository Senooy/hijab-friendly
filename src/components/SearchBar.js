import React from "react";
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons"; // Ici, nous importons l'icône de recherche

function SearchBar() {
    return (
      <InputGroup mt={8}>
        <InputLeftElement children={<SearchIcon />} /> {/* Utilise directement l'icône ici */}
        <Input placeholder="Rechercher une entreprise..." />
      </InputGroup>
    );
}

export default SearchBar;
