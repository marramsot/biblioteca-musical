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
// Mensaje que aparece cuando la búsqueda no encuentra canciones.
export const EmptyMessage = styled.p`
  /* Espaciado */
  padding: 15px 20px;
  margin-top: 20px;

  /* Apariencia */
  background-color: #F3E8FF;
  color: #6B21A8;
  border: 1px solid #E9D5FF;
  border-radius: 8px;

  /* Texto */
  font-size: 15px;
  text-align: center;
`;
// Mensaje que aparece mientras se buscan canciones.
export const LoadingMessage = styled.p`
  /* Espaciado */
  padding: 15px 20px;
  margin-top: 20px;

  /* Apariencia */
  background-color: #EDE9FE;
  color: #5B21B6;
  border-left: 4px solid #8B5CF6;
  border-radius: 8px;

  /* Texto */
  font-size: 15px;
  font-weight: bold;
  text-align: center;
`;
// Mensaje que aparece cuando ocurre un error en la búsqueda.
export const ErrorMessage = styled.div`
  /* Espaciado */
  padding: 20px;
  margin-top: 20px;

  /* Apariencia */
  background-color: #FEF2F2;
  color: #991B1B;
  border-left: 4px solid #DC2626;
  border-radius: 8px;

  /* Texto */
  font-size: 15px;
  text-align: center;

  p {
    margin-top: 0;
    margin-bottom: 15px;
  }
`;

// Botón para repetir una búsqueda cuando ocurre un error.
export const RetryButton = styled.button`
  /* Tamaño y apariencia */
  padding: 10px 20px;
  border: none;
  border-radius: 8px;

  /* Colores */
  background-color: #DC2626;
  color: #FFFFFF;

  /* Texto */
  font-size: 14px;
  font-weight: bold;

  /* Interacción */
  cursor: pointer;
  transition: background-color 0.2s, transform 0.2s;

  /* Efecto al pasar el cursor */
  &:hover {
    background-color: #B91C1C;
    transform: translateY(-2px);
  }

  /* Efecto al presionar */
  &:active {
    transform: translateY(0);
  }
`;