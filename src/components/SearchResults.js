import Song from "./Song";
import"./SearchResults.css";
const SearchResults = (props) => {
    return (
        <div className="searchResults">
            <h2>Resultados de búsqueda</h2>
            {props.songs.map((song) => (
               
                    <Song
                
                    title={song.title} 
                    artist={song.artist}
                    album={song.album}
                
                    addToLibrary={props.addToLibrary}
                    song={song}
                    />
              
            ))
            }
        </div>
    );
};export default SearchResults;