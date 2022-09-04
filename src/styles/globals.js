import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  body {
    padding: 0;
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
      Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    font-size: ${({ theme }) => theme.fontSize.l};
    overflow-y: scroll;
  }



  a {
    color: inherit;
    text-decoration: none;
  }

  *,::after,::before {
    box-sizing: border-box;
  }

  ul, li {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  h1,h2,h3,h4,h5,h6 {
    padding: 0;
    margin: 0;
  }

  @media(max-width: ${({ theme }) => theme.breakpoints.smallMobile} )  {
    body {
      font-size: ${({ theme }) => theme.fontSize.m};
    }
  }
    
`;
