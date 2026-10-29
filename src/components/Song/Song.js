import React from "react";
import { Link } from "react-router-dom";
import { SongCard, SongTitle,SongText } from "./Song.styles";
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
               
                {props.addToLibrary && (
                <button onClick={props.addToLibrary}>
                    Agregar a mi biblioteca
                </button>)}
                {/* Mostramos Eliminar únicamente si la canción está en la biblioteca. */}
                {props.$inLibrary && props.removeFromLibrary && (
                <button onClick={props.removeFromLibrary}>
                    Eliminar
                </button>
                )}
            </SongCard>

        );
    
};
export default Song;