import React from "react";
import Song from "./Song";
import "./Library.css";
const Library=(props) => {
    return(
        <div className="library">
            <h2>Mi Biblioteca</h2>
            {props.songs.map((song) =>(
                <Song
                key={song.id}
                title={song.title}
                artist={song.artist}
                duration={song.duration}
                />
            ))}
        </div>
    );
};
export default Library;