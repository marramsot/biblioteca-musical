// Permite consultar las canciones almacenadas en Redux.
import { useSelector } from "react-redux";
// useParams obtiene el ID de la canción desde la URL.
// useLocation permite conservar los datos enviados al navegar.
import { useLocation, useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { DetailContainer, DetailTitle, DetailText, BackLink } from "./SongDetail.styles";
const SongDetail = () => {
    // Obtenemos el ID de la canción desde la URL.
    const { id } = useParams();
    // Construimos la URL para consultar una canción por su ID.
    const songUrl = id
    ? `https://www.theaudiodb.com/api/v1/json/123/track.php?h=${id}`
    : null;
    // Consultamos la canción y obtenemos su estado de carga y error.
    const {
    data: songData,
    loading: songLoading,
    error: songError,
    refetch: refetchSong,
    } = useFetch(songUrl);

    // Obtenemos la primera canción de la respuesta de la API.
    const fetchedSong = songData?.track?.[0];
    const location=useLocation();
    const song=location.state?.song;
    // Buscamos la canción por su ID en los resultados de Redux.
    const songs = useSelector((state) => state.search.results);

    const selectedSong = songs.find(
    (item) => String(item.id) === id
    );

    // Usamos los datos de Redux, los recibidos al navegar
    // o los obtenidos directamente desde la API.
    const currentSong = selectedSong || song || (
    fetchedSong
        ? {
            id: fetchedSong.idTrack,
            albumId: fetchedSong.idAlbum,
            title: fetchedSong.strTrack,
            artist: fetchedSong.strArtist,
            album: fetchedSong.strAlbum,
        }
        : null
    );
    // Consultamos el álbum de la canción seleccionada.
    const url = currentSong?.albumId
  ? `https://www.theaudiodb.com/api/v1/json/123/album.php?m=${currentSong.albumId}`
  : null;
    const {data,loading,error,refetch}=useFetch(url);
    const album = data?.album?.[0];
    // Esperamos a que termine la consulta de la canción o del álbum.
    if (songLoading || loading) {
    return <p>Cargando detalles...</p>;
    }
    // Comprobamos si falló la consulta de la canción o del álbum.
    if (songError || error) {
    return (
        <div>
        <p>Hubo un problema al cargar los datos. Intenta nuevamente.</p>
        <button
            onClick={() => {
            // Reintentamos únicamente las consultas que fallaron.
            if (songError) refetchSong();
            if (error) refetch();
            }}
        >
            Reintentar
        </button>
        </div>
    );
    }
        return(
        <DetailContainer>
            {/* Encabezado de la sección de detalles. */}
            <DetailTitle>Detalle de la canción</DetailTitle>
            {/* Mostramos los detalles de la canción y su álbum. */}
            <DetailText>Título: {currentSong?.title}</DetailText>
            <DetailText>Artista: {album?.strArtist}</DetailText>
            <DetailText>Álbum: {album?.strAlbum}</DetailText>
            <DetailText>Año de lanzamiento: {album?.intYearReleased}</DetailText>
            <BackLink to="/">← Volver a buscar</BackLink>
        </DetailContainer>
        
    );
};
export default SongDetail; //para poder utlizar un elemento de este archivo en otro archivo