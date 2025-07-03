// GlobalStyle.ts
import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    background-color: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.text};
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    transition: background-color 0.3s ease, color 0.3s ease;
  }

.react-resizable-handle::after {
    border-right: 2px solid ${({ theme }) => theme.buttonText} !important;
    border-bottom: 2px solid ${({ theme }) => theme.buttonText} !important;
  }
`;
