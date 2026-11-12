import styled from "styled-components";
export const SearchForm = styled.form`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 20px;
`;
export const SearchInput = styled.input`
  /* Espacio interior y tamaño del buscador */
  padding: 12px 16px;
  width: 280px;
  max-width: 100%;

  /* Apariencia del campo */
  border: 1px solid ${({ theme }) => theme.colors.primary};
  border-radius: 8px;
  font-size: 16px;

  /* Animación suave al seleccionar el campo */
  transition: border-color 0.3s, box-shadow 0.3s;

  /* Estilos cuando el usuario selecciona el buscador */
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px #E9D5FF;
  }
`;
export const SearchButton = styled.button`
  /* Tamaño y apariencia del botón */
  padding: 12px 20px;
  border: none;
  border-radius: 8px;
  font-size: 15px;
  font-weight: bold;

  /* Conservamos el color principal de nuestro tema */
  background-color: ${({ theme }) => theme.colors.primary};
  color: #FFFFFF;
  cursor: pointer;

  /* Animación suave */
  transition: transform 0.2s, opacity 0.2s;

  /* Efecto cuando pasamos el cursor */
  &:hover {
    opacity: 0.9;
    transform: translateY(-2px);
  }

  /* Efecto cuando presionamos el botón */
  &:active {
    transform: translateY(0);
  }
`;