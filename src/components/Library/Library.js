import React from "react";
import Song from "../Song/Song";
// Importamos el contenedor y el título con estilos.
import { LibraryContainer, LibraryTitle } from "./Library.styles";
// useDispatch permite enviar acciones para modificar ese estado.
import { useSelector, useDispatch } from "react-redux";

// Importamos la acción generada automáticamente por librarySlice.
import { removeSong } from "../../redux/slices/librarySlice";
const Library=(props) => {
    // Obtenemos las canciones del slice library en el estado global.
    const songs = useSelector((state) => state.library);
    // Obtenemos dispatch para enviar acciones a Redux.
    const dispatch = useDispatch();
    return(
        <LibraryContainer className="library">
            <LibraryTitle>Mi Biblioteca</LibraryTitle>
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