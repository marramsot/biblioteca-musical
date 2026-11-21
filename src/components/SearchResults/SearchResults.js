import React from "react";
import Song from "../Song/Song";
import { ResultsContainer, ResultsTitle} from "./SearchResults.styles";
// useDispatch envía acciones y useSelector consulta el estado de Redux.
import { useDispatch, useSelector } from "react-redux";

// Importamos la acción generada automáticamente por Redux Toolkit.
import { addSong } from "../../redux/slices/librarySlice";
const SearchResults = (props) => {
      // Obtenemos la función dispatch de Redux.
    const dispatch = useDispatch();
    // Obtenemos las canciones encontradas desde searchSlice.
    const songs = useSelector((state) => state.search.results);
    return (
        <ResultsContainer className="searchResults">
            <ResultsTitle>Resultados de búsqueda</ResultsTitle>
            {songs.map((song) => (
               
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