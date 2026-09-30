import Song from "../Song/Song";
import { ResultsContainer, ResultsTitle} from "./SearchResults.styles";
const SearchResults = (props) => {
    return (
        <ResultsContainer className="searchResults">
            <ResultsTitle>Resultados de búsqueda</ResultsTitle>
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
        </ResultsContainer>
    );
};export default SearchResults;