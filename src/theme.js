// theme.js
import { extendTheme } from "@chakra-ui/react";
import "typeface-poppins";

const macchiatoColors = {
  rosewater: "#f4dbd6",
  flamingo: "#f0c6c6",
  pink: "#f5bde6",
  mauve: "#c6a0f6",
  red: "#ed8796",
  maroon: "#ee99a0",
  peach: "#f5a97f",
  yellow: "#eed49f",
  green: "#a6da95",
  teal: "#8bd5ca",
  sky: "#91d7e3",
  sapphire: "#7dc4e4",
  blue: "#8aadf4",
  lavender: "#b7bdf8",
  text: "#cad3f5",
  subtext1: "#b8c0e0",
  subtext0: "#a5adcb",
  overlay2: "#939ab7",
  overlay1: "#8087a2",
  overlay0: "#6e738d",
  surface2: "#5b6078",
  surface1: "#494d64",
  surface0: "#363a4f",
  base: "#24273a",
  mantle: "#1e2030",
  crust: "#181926",
};

const theme = extendTheme({
  colors: {
    macchiato: macchiatoColors,
  },

  fonts: {
    body: "Poppins, sans-serif",
    heading: "Poppins, sans-serif",
  },

  components: {
    Heading: {
      baseStyle: {
        fontWeight: "400", // Poids par défaut pour tous les titres
      },
      sizes: {
        "2xl": { fontSize: "2.5rem", fontWeight: "700" },  // h1
        xl:   { fontSize: "2rem",   fontWeight: "700" },  // h2
        lg:   { fontSize: "1.5rem", fontWeight: "600" },  // h3
        md:   { fontSize: "1.25rem",fontWeight: "600" },  // h4
        sm:   { fontSize: "1rem",   fontWeight: "500" },  // h5
        xs:   { fontSize: "0.875rem",fontWeight: "500" }  // h6
      },
    },
  },
});

export default theme;