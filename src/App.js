import React, {useState,useEffect} from "react";
import "./App.css";
import SearchResults from "./components/SearchResults";
import Library from "./components/Library";
import Header from "./components/Header";
import SongDetail from "./components/SongDetail";
import { Routes, Route } from "react-router-dom";//Routes contenedor de rutas, Route- que componente se muestra en cada dirección
import SearchBar from "./components/SearchBar";
import useFetch from "./hooks/useFetch";
const App= () => {
const [library,setLibrary]=useState([]);
const [searchTerm, setSearchTerm]=useState("");
//lugar para guardar las canciones de los albumes
const [apiTracks, setApiTracks] = useState([]);
const url = searchTerm
  ? `https://www.theaudiodb.com/api/v1/json/123/searchalbum.php?s=${encodeURIComponent(searchTerm)}`
  : null;
const {data, loading, error, refetch}=useFetch(url);
console.log("datos de la API: ", data);
console.log("álbumes:",data?.album);
const apiAlbums = data?.album || [];

useEffect(() =>{
  //recorre cada album que llegó de la api
  const formattedAlbums =(data?.album || []).map((album) => ({
    id: album.idAlbum,
    title:album.strAlbum,
    artist:album.strArtist,
    album: album.strAlbum,
  }));
  if(formattedAlbums.length ===0){
    setApiTracks([]);
    return;
  }
  const fetchTracks = async() =>{
    const request = formattedAlbums.map((album)=>
    fetch(`https://www.theaudiodb.com/api/v1/json/123/track.php?m=${album.id}`)
    .then((response) => response.json())
  );
  const results = await Promise.all(request);
  const allTracks=results.flatMap((result) => result.track || []);
  setApiTracks(allTracks);
  };
  fetchTracks();
}, [data]);
/*const albumId = formattedAlbums.length > 0 ? formattedAlbums[0].id : null;
const tracksUrl=albumId
? `https://www.theaudiodb.com/api/v1/json/123/track.php?m=${albumId}`
: null;
const { data: tracksData } = useFetch(tracksUrl);
const apiTracks = tracksData?.track || [];*/
const formattedTracks=apiTracks.map((track) => ({
  id: track.idTrack,
  albumId:track.idAlbum,
  title: track.strTrack,
  artist:track.strArtist,
  album: track.strAlbum,
}));


console.log("apiAlbums:",apiAlbums);
console.log(url);
const addToLibrary=(song) =>{
  const alreadyExists=library.some((item) => item.id=== song.id);//revisa si hay alguna cación en library cuyo id sea igual al que quiero agregar
  if(!alreadyExists){
  setLibrary((prev)=>[...library,song]);
  }
};
useEffect(() => {
  console.log("La biblioteca ha cambiado:",library);
},[library]);
  const handleSearch =(term) => {
    console.log("Artista buscado: ", term);
    setSearchTerm(term);
  }
    return(
      <div className="App">
        <Routes>
          <Route //estructura de route
            path="/"
            element={
              <>
            
                <Header/>
                <SearchBar  onSearch={handleSearch}/>
                {loading && searchTerm && <p>Cargando...</p>}
               {error && (
                  <div>
                    <p>Hubo un problema al cargar los datos. Intenta nuevamente.</p>
                    <button onClick={refetch}>Reintentar</button>
                  </div>
                )}
                {!loading && !error && searchTerm && formattedTracks.length === 0 && (
                  <p>No se encontraron resultados.</p>
                )}
                {!loading && !error && formattedTracks.length > 0 && (
                <SearchResults 
                  songs={formattedTracks}
                  addToLibrary={addToLibrary}
              />)}
                <Library songs={library}/>
              </>
            }
            />
            <Route path="/song/:1d" element={<SongDetail />} />  
        </Routes>
      </div>  
    );
  };
export default App;