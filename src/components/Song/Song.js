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
                <button onClick={() => props.addToLibrary(props.song)}>
                    Agregar a mi biblioteca
                </button>)}
            </SongCard>
        );
    
};
export default Song;