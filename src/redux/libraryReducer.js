
// Comienza como un arreglo vacío porque todavía no hay canciones agregadas.
const initialState = [];

// El reducer recibe dos parámetros:
// state: las canciones que tenemos actualmente en la biblioteca.
// action: la instrucción que indica qué queremos hacer.
function libraryReducer(state = initialState, action) {

  // Revisamos qué tipo de acción recibimos.
  switch (action.type) {

    // Si la acción es agregar una canción...
    case "ADD_SONG":
    // Comprobamos si la canción ya está en la biblioteca.
    const songExists = state.some(
        (song) => song.id === action.payload.id
    );

    // Si ya existe, conservamos el estado sin agregarla otra vez.
    if (songExists) {
        return state;
    }

    // Si no existe, creamos un nuevo arreglo con la canción agregada.
    return [...state, action.payload];

    // Si la acción es eliminar una canción...
    case "REMOVE_SONG":
      // filter() crea un nuevo arreglo.
      // Conservamos las canciones cuyo ID sea diferente
      // del ID de la canción que queremos eliminar.
      return state.filter((song) => song.id !== action.payload);

    // Si recibimos una acción que no reconocemos...
    default:
      // Devolvemos el estado sin modificarlo.
      return state;
  }
}

// Exportamos el reducer para poder utilizarlo en store.js.
export default libraryReducer;