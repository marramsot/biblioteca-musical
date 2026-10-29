// Recibe como parámetro la canción que queremos guardar.
export const addSong = (song) => {
  return {
    // Indica al reducer que debe agregar una canción.
    type: "ADD_SONG",

    // Contiene los datos de la canción.
    payload: song,
  };
};
// Recibe el ID de la canción que queremos eliminar.
export const removeSong = (songId) => {
  return {
    // Indica al reducer que debe eliminar una canción.
    type: "REMOVE_SONG",

    // Contiene el ID de la canción que queremos eliminar.
    payload: songId,
  };
};