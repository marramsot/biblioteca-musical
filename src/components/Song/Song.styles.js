import styled from "styled-components";
export const SongCard =styled.div `
    padding: 20px;
    margin-bottom: 20px;
    border: 1px solid #dddd;
    border-radius: 12px;
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
