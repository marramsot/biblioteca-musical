import React from "react";
// useSelector consulta el estado y useDispatch envía acciones a Redux.
import { useSelector, useDispatch } from "react-redux";
import SearchResults from "./components/SearchResults/SearchResults";
import Library from "./components/Library/Library";
import Header from "./components/Header/Header";
import SongDetail from "./components/SongDetail/SongDetail";
import { Routes, Route } from "react-router-dom";//Routes contenedor de rutas, Route- que componente se muestra en cada dirección
import SearchBar from "./components/SearchBar/SearchBar";
// Importamos el contenedor y los mensajes con estilos.
import { AppContainer, EmptyMessage, LoadingMessage, ErrorMessage, RetryButton,} from "./App.styles";
// Acción asíncrona para buscar canciones.
import { fetchSongs } from "./redux/slices/searchSlice";
const App= () => {
  // Permite enviar acciones a Redux Toolkit.
const dispatch = useDispatch();
// Consultamos el estado de la búsqueda en Redux Toolkit.
const {
  results: searchResults,
  loading: searchLoading,
  error: searchError,
  hasSearched,
  lastSearch,
} = useSelector((state) => state.search);

    return(
      <AppContainer className="App">
        <Routes>
          <Route //estructura de route
            path="/"
            element={
              <>
            
                <Header/>
                {/* SearchBar ahora realiza la búsqueda directamente con Redux Toolkit. */}
                <SearchBar />
                {/* Mostramos un mensaje con estilos mientras se buscan canciones. */}
                {searchLoading && (
                  <LoadingMessage>Cargando canciones...</LoadingMessage>
                )}
                {/* Mostramos el error y permitimos repetir la última búsqueda. */}
                {searchError && (
                  <ErrorMessage>
                    <p>Hubo un problema al cargar los datos. Intenta nuevamente.</p>

                    <RetryButton onClick={() => dispatch(fetchSongs(lastSearch))}>
                      Reintentar
                    </RetryButton>
                  </ErrorMessage>
                )}
              
                {/* Mostramos un mensaje con estilos cuando no hay resultados. */}
                {hasSearched && !searchLoading && !searchError && searchResults.length === 0 && (
                  <EmptyMessage>No se encontraron resultados.</EmptyMessage>
                )}
                {/* Mostramos las canciones almacenadas en Redux Toolkit. */}
                {!searchLoading && !searchError && searchResults.length > 0 && (
                  <SearchResults />
                )}
                <Library/>
              </>
            }
            />
            {/* El parámetro id identifica la canción que queremos consultar. */}
            <Route path="/song/:id" element={<SongDetail />} />
        </Routes>
      </AppContainer>  
    );
  };
export default App;