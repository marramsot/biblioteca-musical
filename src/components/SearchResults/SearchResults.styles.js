import styled from "styled-components";
export const ResultsContainer = styled.div`
  margin-bottom: 40px;

  @media (max-width: 600px) {
    margin-bottom: 25px;
  }
`;
export const ResultsTitle = styled.h2`
  /* Espacio alrededor del título */
  margin-top: 0;
  margin-bottom: 20px;

  /* Apariencia del encabezado */
  font-size: 24px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary};

  /* Línea decorativa debajo del título */
  padding-bottom: 10px;
  border-bottom: 2px solid #E9D5FF;
`;