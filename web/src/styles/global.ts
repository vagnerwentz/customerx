import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: 0;
  }

  body {
    background: #fff;
    color: #fff;
    -webkit-font-smoothing: antialiased;
  }

  body, input, button {
    font-family: 'Roboto Slab', serif;
    font-size: 16px;
  }

  h1, h2, h3, h4, h5, h6, strong {
    font-weight: 500;
  }

  button {
    cursor: pointer;
  }

  :root {
    --color-background: #4c2782;
    --color-button-text: #FFFFFF;
    --color-button: #3ed62a;
    --color-button-hover: #77ff95
    --color-background-input: ##f5f5f5;
    --color-additional: #4a2181;
  }
`;
