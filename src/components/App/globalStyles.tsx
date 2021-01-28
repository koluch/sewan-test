import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  :root {
    font-family: 'Open Sans', sans-serif;
    --color-1: #11b0c8;
  }
  
  *, *::before, *::after {
    box-sizing: border-box;
  }
  
  a {
    &,
    &:hover,
    &:active,
    &:visited {
      color: black;
    }
  }
`;

export default GlobalStyle;
