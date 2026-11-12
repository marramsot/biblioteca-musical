import styled from "styled-components";
export const SongCard =styled.div `
    padding: 20px;
    margin-bottom: 20px;
    border: 1px solid #dddd;
    border-radius: 12px;
    /* Sombra suave para dar profundidad a las tarjetas */
    box-shadow: 0 4px 12px #00000012;

    /* Animación suave al interactuar con la tarjeta */
    transition: transform 0.2s, box-shadow 0.2s;

    /* Efecto cuando pasamos el cursor sobre la tarjeta */
    &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 20px #0000001A;
    }
    /* cambia el color  dependiendo si la canción está en la biblioteca o en búsqueda */
    background-color: ${({ $inLibrary }) =>
    $inLibrary ? "#f3e8ff" : "#ffffff"};  

    @media (max-width: 600px) {
    padding: 15px;
}
`;
export const SongTitle=styled.h2`
     margin-top: 0;
    margin-bottom: 10px;
`;
export const SongText=styled.p`
     margin: 5px 0;
`;
// Botón para agregar canciones a la biblioteca.
export const AddButton = styled.button`
  /* Tamaño y apariencia */
  padding: 10px 16px;
  margin-top: 12px;
  border: none;
  border-radius: 8px;

  /* Colores */
  background-color: ${({ theme }) => theme.colors.primary};
  color: #FFFFFF;

  /* Texto */
  font-size: 14px;
  font-weight: bold;

  /* Interacción */
  cursor: pointer;
  transition: transform 0.2s, opacity 0.2s;

  /* Efecto al pasar el cursor */
  &:hover {
    opacity: 0.9;
    transform: translateY(-2px);
  }

  /* Efecto al presionar */
  &:active {
    transform: translateY(0);
  }
`;
// Botón para eliminar canciones de la biblioteca.
export const RemoveButton = styled.button`
  /* Tamaño y apariencia */
  padding: 10px 16px;
  margin-top: 12px;
  border: none;
  border-radius: 8px;

  /* Colores */
 background-color: #7C3AED;
color: #FFFFFF;

  /* Texto */
  font-size: 14px;
  font-weight: bold;

  /* Interacción */
  cursor: pointer;
  transition: transform 0.2s, background-color 0.2s;

  /* Efecto al pasar el cursor */
  &:hover {
    background-color: #6D28D9;
    transform: translateY(-2px);
  }

  /* Efecto al presionar */
  &:active {
    transform: translateY(0);
  }
`;