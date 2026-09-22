import React from "react";
import Song from "./Song";
import"./SearchResults.css";
const SearchResults = (props) => {
    return (
        <div className="searchResults">
            <h2>Resultados de búsqueda</h2>
            {props.songs.map((song) => (
                <Song
                key={song.id}
                title={song.title}
                artist={song.artist}
                duration={song.duration} 
                addToLibrary={props.addToLibrary}
                song={song}
                />
            ))
            }
        </div>
    );
};export default SearchResults;