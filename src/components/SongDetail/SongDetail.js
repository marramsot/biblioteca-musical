
import { useLocation, } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { DetailContainer, DetailTitle, DetailText, BackLink } from "./SongDetail.styles";
const SongDetail = () => {
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
        <DetailContainer>
            <DetailTitle>Detalle de la canción</DetailTitle>
            <DetailText>Título: {song?.title}</DetailText>
            <DetailText>Artista: {album?.strArtist}</DetailText>
            <DetailText>Año de lanzamiento: {album?.intYearReleased}</DetailText>
            <BackLink to="/">← Volver a buscar</BackLink>
        </DetailContainer>
    );
};
export default SongDetail; //para poder utlizar un elemento de este archivo en otro archivo