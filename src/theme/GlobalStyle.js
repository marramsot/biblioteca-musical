import { createGlobalStyle } from "styled-components";
const GlobalStyle=createGlobalStyle
`
  * {
    box-sizing: border-box;
  }

    body {
    margin: 0;
    font-family: Arial, sans-serif;
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
  }
    code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New",
    monospace;
}
`
;

export default GlobalStyle;