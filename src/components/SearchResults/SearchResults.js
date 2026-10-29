import Song from "../Song/Song";
import { ResultsContainer, ResultsTitle} from "./SearchResults.styles";
// Importamos useDispatch para enviar acciones a Redux.
import { useDispatch } from "react-redux";

// Importamos la acción que agrega canciones a la biblioteca.
import { addSong } from "../../redux/libraryActions";
const SearchResults = (props) => {
      // Obtenemos la función dispatch de Redux.
    const dispatch = useDispatch();
    return (
        <ResultsContainer className="searchResults">
            <ResultsTitle>Resultados de búsqueda</ResultsTitle>
            {props.songs.map((song) => (
               
                    <Song
                    key={song.id}
                    title={song.title} 
                    artist={song.artist}
                    album={song.album}
                
                      // Cuando el usuario agrega una canción,
                     // enviamos la acción ADD_SONG a Redux.
                    addToLibrary={() => dispatch(addSong(song))}
                    song={song}
                    />
              
            ))
            }
        </ResultsContainer>
    );
};export default SearchResults;