
 // Importamos configureStore desde Redux Toolkit.
// Nos permite configurar el almacén global de nuestra aplicación.
import { configureStore } from "@reduxjs/toolkit";

// Importamos el reducer que administra nuestra biblioteca.
import libraryReducer from "./slices/librarySlice";

// Importamos el reducer que administra las búsquedas.
import searchReducer from "./slices/searchSlice";

// Creamos el store y combinamos nuestros dos reducers.
const store = configureStore({
  reducer: {
    // Almacena las canciones guardadas por el usuario.
    library: libraryReducer,

    // Almacena los resultados, la carga y los errores de búsqueda.
    search: searchReducer,
  },
});

// Exportamos el store para utilizarlo en nuestra aplicación.
export default store;
