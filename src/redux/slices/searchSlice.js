import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Creamos una operación asíncrona para buscar álbumes por artista.
// Redux Toolkit generará automáticamente los estados
// pending, fulfilled y rejected.
export const fetchSongs = createAsyncThunk(
  "search/fetchSongs",

  // Recibimos el nombre del artista que queremos buscar.
  async (artist) => {
    // Convertimos el nombre en un valor seguro para la URL.
    const artistName = encodeURIComponent(artist);

    // Realizamos la petición a la API TheAudioDB.
    const response = await fetch(
      `https://www.theaudiodb.com/api/v1/json/123/searchalbum.php?s=${artistName}`
    );

    // Si la petición HTTP falla, generamos un error.
    if (!response.ok) {
      throw new Error("No se pudieron obtener los álbumes.");
    }

    // Convertimos la respuesta de la API a un objeto JavaScript.
    const data = await response.json();

   // Guardamos los álbumes encontrados.
    const albums = data.album || [];

    // Consultamos las canciones de cada álbum.
    const requests = albums.map((album) =>
      fetch(
        `https://www.theaudiodb.com/api/v1/json/123/track.php?m=${album.idAlbum}`
      ).then((response) => {
        if (!response.ok) {
          throw new Error("No se pudieron obtener las canciones.");
        }
        return response.json();
      })
    );

    // Esperamos a que terminen todas las peticiones.
    const results = await Promise.all(requests);

    // Reunimos todas las canciones en un solo arreglo.
    const allTracks = results.flatMap((result) => result.track || []);

    // Adaptamos los datos al formato que utiliza nuestra aplicación.
    return allTracks.map((track) => ({
      id: track.idTrack,
      albumId: track.idAlbum,
      title: track.strTrack,
      artist: track.strArtist,
      album: track.strAlbum,
    }));
  }
);


 // Estado inicial de las búsquedas.
const initialState = {
  // Guarda los resultados obtenidos de TheAudioDB.
  results: [],

  // Indica si estamos esperando la respuesta de la API.
  loading: false,

  // Guarda el mensaje si ocurre un error.
  error: null,
  hasSearched: false, // Indica si ya se realizó una búsqueda.
  lastSearch: "", // Guarda el último artista buscado.
};


 // Creamos el slice que administrará las búsquedas.
const searchSlice = createSlice({
  // Nombre que identifica este slice en Redux.
  name: "search",

  // Estado inicial que definimos anteriormente.
  initialState,

  // Funciones que modifican el estado de búsqueda.
  reducers: {
    // Reinicia los resultados y limpia los errores.
    resetResults: (state) => {
      state.results = [];
      state.loading = false;
      state.error = null;
    },

  },

  // Manejamos los estados de la petición asíncrona.
  extraReducers: (builder) => {
    builder
      // La petición comenzó.
      .addCase(fetchSongs.pending, (state, action) => {
      // Indicamos que comenzó la búsqueda.
      state.loading = true;
      state.error = null;

      // Guardamos el nombre del artista para poder reintentar.
      state.lastSearch = action.meta.arg;
    })

      // La petición terminó correctamente.
      .addCase(fetchSongs.fulfilled, (state, action) => {
        state.loading = false;
        state.results = action.payload;
        state.hasSearched = true;
      })

      // Ocurrió un error durante la petición.
      .addCase(fetchSongs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});
// Exportamos la acción para limpiar los resultados de búsqueda.
export const { resetResults } = searchSlice.actions;

// Exportamos el reducer para conectarlo al store.
export default searchSlice.reducer;
