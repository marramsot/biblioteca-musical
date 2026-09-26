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
                album={song.album}
                duration={song.duration}
                song={song}
                />
            ))}
        </div>
    );
};
export default Library;