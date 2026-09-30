import styled from "styled-components";
export const AppContainer = styled.div`
  font-family: "Avenir Next", Avenir, sans-serif;
  width: 90%;
  max-width: 700px;
  margin: 0 auto;
  padding: 30px 20px;

  @media (max-width: 600px) {
    width: 100%;
    padding: 20px 10px;
  }
`;