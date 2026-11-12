import styled from "styled-components";
import { Link } from "react-router-dom";
// Contenedor principal del detalle de la canción.
export const DetailContainer = styled.div`
  /* Espaciado */
  padding: 25px;
  margin-top: 20px;
  margin-bottom: 20px;

  /* Apariencia */
  border: 1px solid #E9D5FF;
  border-radius: 12px;
  background-color: #F3E8FF;

  /* Sombra suave */
  box-shadow: 0 4px 12px #00000012;

  /* Adaptación a pantallas pequeñas */
  @media (max-width: 600px) {
    padding: 15px;
  }
`;
// Título de la pantalla de detalle.
export const DetailTitle = styled.h2`
  margin-top: 0;
  margin-bottom: 20px;
  padding-bottom: 10px;

  /* Apariencia del título */
  font-size: 24px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary};

  /* Línea decorativa */
  border-bottom: 2px solid #D8B4FE;
`;
// Estilos para la información de la canción.
export const DetailText = styled.p`
  /* Espaciado entre los datos */
  margin: 10px 0;

  /* Apariencia del texto */
  font-size: 16px;
  line-height: 1.6;
  color: #374151;
`;
// Enlace con apariencia de botón para regresar a la búsqueda.
export const BackLink = styled(Link)`
  /* Tamaño y apariencia */
  display: inline-block;
  padding: 12px 20px;
  margin-top: 20px;
  border-radius: 8px;

  /* Colores */
  background-color: #7C3AED;
  color: #FFFFFF;

  /* Texto */
  font-size: 14px;
  font-weight: bold;
  text-decoration: none;

  /* Interacción */
  transition: background-color 0.2s, transform 0.2s;

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