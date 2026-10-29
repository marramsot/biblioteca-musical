// Importamos createStore desde Redux.
// Nos permite crear el almacén global de nuestra aplicación.
import { createStore } from "redux";

// Importamos el reducer 
// Este decidirá cómo se actualizan las canciones.
import libraryReducer from "./libraryReducer";

// Creamos el store utilizando nuestro reducer.
// Aquí se almacenará el estado global de la biblioteca.
const store = createStore(libraryReducer);

// Exportamos el store para utilizarlo en index.js.
export default store;