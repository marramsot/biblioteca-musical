import React from "react";
import "./Song.css";
const Song = (props) =>{
   
        return(
            <div className="songCard">
                <h2>{props.title}</h2>
                <p>Artista:{props.artist}</p>
                <p>Duración:{props.duration}</p>
                {props.addToLibrary && (
                <button onClick={() => props.addToLibrary(props.song)}>
                    Agregar a mi biblioteca
                </button>)}
            </div>
        );
    
};
export default Song;