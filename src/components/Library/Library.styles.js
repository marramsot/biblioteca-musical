import styled from "styled-components";
export const LibraryContainer = styled.div`
  margin-top: 40px;

  @media (max-width: 600px) {
    margin-top: 25px;
  }
`;
// Título de la sección Mi Biblioteca.
export const LibraryTitle = styled.h2`
  margin-bottom: 20px;
  padding-bottom: 10px;

  /* Apariencia del título */
  font-size: 24px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary};

  /* Línea decorativa debajo del título */
  border-bottom: 2px solid #E9D5FF;
`;