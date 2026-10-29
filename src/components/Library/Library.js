import React from "react";
import Song from "../Song/Song";
import { LibraryContainer } from "./Library.styles";
// useDispatch permite enviar acciones para modificar ese estado.
import { useSelector, useDispatch } from "react-redux";

// Importamos la acción que elimina canciones de la biblioteca.
import { removeSong } from "../../redux/libraryActions";
const Library=(props) => {
    // Obtenemos las canciones almacenadas en el estado global.
    const songs = useSelector((state) => state);
    // Obtenemos dispatch para enviar acciones a Redux.
    const dispatch = useDispatch();
    return(
        <LibraryContainer className="library">
            <h2>Mi Biblioteca</h2>
            {songs.map((song) => (
            <React.Fragment key={song.id}>
                <Song
                title={song.title}
                artist={song.artist}
                album={song.album}
                duration={song.duration}
                song={song}
                $inLibrary={true}
                // Esta función permite eliminar la canción desde su propia ficha.
                removeFromLibrary={() => dispatch(removeSong(song.id))}
                />

            </React.Fragment>
            ))}
        </LibraryContainer>
    );
};
export default Library;