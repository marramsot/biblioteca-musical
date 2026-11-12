import React from "react";
import { Link } from "react-router-dom";
// Importamos los componentes con estilos.
import { SongCard, SongTitle, SongText, AddButton, RemoveButton } from "./Song.styles";
const Song = (props) =>{
   
        return(
            <SongCard $inLibrary={props.$inLibrary}>
                <SongTitle>  <Link
                    to={`/song/${props.song.id}`}
                    state={{ song: props.song }}
                >
                    {props.title}
                </Link></SongTitle>
                <SongText>Artista:{props.artist}</SongText>
                <SongText>Álbum:{props.album}</SongText>
               
                {/* Botón con estilos para agregar canciones a la biblioteca. */}
                {props.addToLibrary && (
                <AddButton onClick={props.addToLibrary}>
                    Agregar a mi biblioteca
                </AddButton>
                )}
                {/* Mostramos Eliminar únicamente si la canción está en la biblioteca. */}
                {props.$inLibrary && props.removeFromLibrary && (
                <RemoveButton onClick={props.removeFromLibrary}>
                    Eliminar
                </RemoveButton>
                )}
            </SongCard>

        );
    
};
export default Song;