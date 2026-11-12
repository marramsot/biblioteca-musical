
// Importamos createSlice para administrar nuestra biblioteca.
import { createSlice } from "@reduxjs/toolkit";



// Estado inicial de nuestra biblioteca.
// Comenzamos con un arreglo vacío de canciones.
const initialState = [];

// Creamos un slice para administrar las canciones guardadas.
const librarySlice = createSlice({
  // Nombre que identifica este slice dentro de Redux.
  name: "library",

  // Estado inicial de la biblioteca.
  initialState,

  // Funciones que modifican el estado.
  reducers: {
    // Agrega una canción si todavía no está guardada.
    addSong: (state, action) => {
      const songExists = state.some(
        (song) => song.id === action.payload.id
      );

      if (!songExists) {
        state.push(action.payload);
      }
    },

    // Elimina la canción que tenga el ID recibido.
    removeSong: (state, action) => {
      return state.filter(
        (song) => song.id !== action.payload
      );
    },
  },
});

// Exportamos las acciones que Redux Toolkit genera automáticamente.
export const { addSong, removeSong } = librarySlice.actions;

// Exportamos el reducer para conectarlo después al store.
export default librarySlice.reducer;
