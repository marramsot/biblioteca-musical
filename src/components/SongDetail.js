
import { useParams, useLocation, Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";
const SongDetail = () => {
    const{id}=useParams();
    const location=useLocation();
    const song=location.state?.song;
    const url = `https://www.theaudiodb.com/api/v1/json/123/album.php?m=${song?.albumId}`;
    const {data,loading,error,refetch}=useFetch(url);
    const album = data?.album?.[0];
    if (loading) {
        return <p>Cargando...</p>;
    }
    if (error) {
        return (
            <div>
                <p>Hubo un problema al cargar los datos. Intenta nuevamente.</p>
                <button onClick={refetch}>Reintentar</button>
            </div>
        );
    }
        return(
        <div>
            <h2>Detalle de la canción</h2>
            <p>Título: {song?.title}</p>
            <p>Artista: {album?.strArtist}</p>
            <p>Año de lanzamiento: {album?.intYearReleased}</p>
            <Link to="/">← Volver a buscar</Link>
        </div>
    );
};
export default SongDetail; //para poder utlizar un elemento de este archivo en otro archivo