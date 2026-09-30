import React from "react";
import Song from "../Song/Song";
import { LibraryContainer } from "./Library.styles";

const Library=(props) => {
    return(
        <LibraryContainer className="library">
            <h2>Mi Biblioteca</h2>
            {props.songs.map((song) =>(
                <Song
                key={song.id}
                title={song.title}
                artist={song.artist}
                album={song.album}
                duration={song.duration}
                song={song}
                $inLibrary={true}
                />
            ))}
        </LibraryContainer>
    );
};
export default Library;