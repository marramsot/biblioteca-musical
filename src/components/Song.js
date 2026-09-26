import React from "react";
import "./Song.css";
import { Link } from "react-router-dom";
const Song = (props) =>{
   
        return(
            <div className="songCard">
                <h2>  <Link
                    to={`/song/${props.song.id}`}
                    state={{ song: props.song }}
                >
                    {props.title}
                </Link></h2>
                <p>Artista:{props.artist}</p>
                <p>Álbum:{props.album}</p>
               
                {props.addToLibrary && (
                <button onClick={() => props.addToLibrary(props.song)}>
                    Agregar a mi biblioteca
                </button>)}
            </div>
        );
    
};
export default Song;