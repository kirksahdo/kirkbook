import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  html, body {
    margin: 0;
    padding: 0;
    background-color: ${props => props.theme.backgroundColor};
    height: 100%;
  }

  #root {
    height: 100%;
  }
  
  body {
    &::-webkit-scrollbar {
      width: 8px;
    }

    &::-webkit-scrollbar-track {
      background-color: ${props => props.theme.backgroundColor};
    }

    &::-webkit-scrollbar-thumb {
      background-color: ${props => props.theme.secondaryBackgroundColor};
      border-radius: 20px;
    }

    &::-webkit-scrollbar-thumb {
      box-shadow: inset 0 0 6px rgba(0,0,0,.3);
    }
  }
`;