
import libraryReducer, {
  addSong,
  removeSong,
} from "../src/redux/slices/librarySlice";

// Creamos canciones ficticias para las pruebas.
const mockSong1 = {
  id: 1,
  title: "Canción de prueba 1",
  artist: "Artista 1",
  album: "Álbum 1",
};

const mockSong2 = {
  id: 2,
  title: "Canción de prueba 2",
  artist: "Artista 2",
  album: "Álbum 2",
};

// 1. Comprobamos que la biblioteca comience vacía.
test("La biblioteca tiene un estado inicial vacío", () => {
  const state = libraryReducer(undefined, { type: "@@INIT" });

  expect(state).toEqual([]);
});

// 2. Comprobamos que se pueda agregar una canción.
test("Agrega una canción a la biblioteca", () => {
  const state = libraryReducer([], addSong(mockSong1));

  expect(state).toEqual([mockSong1]);
});

// 3. Comprobamos que se puedan agregar canciones diferentes.
test("Permite agregar varias canciones diferentes", () => {
  let state = libraryReducer([], addSong(mockSong1));

  state = libraryReducer(state, addSong(mockSong2));

  expect(state).toEqual([mockSong1, mockSong2]);
});

// 4. Comprobamos que no se agreguen canciones repetidas.
test("No permite agregar canciones duplicadas", () => {
  let state = libraryReducer([], addSong(mockSong1));

  state = libraryReducer(state, addSong(mockSong1));

  expect(state).toHaveLength(1);
  expect(state).toEqual([mockSong1]);
});

// 5. Comprobamos que se pueda eliminar una canción.
test("Elimina una canción de la biblioteca", () => {
  const state = libraryReducer(
    [mockSong1, mockSong2],
    removeSong(1)
  );

  expect(state).toEqual([mockSong2]);
});

// 6. Comprobamos que eliminar un ID inexistente no afecte la biblioteca.
test("Conserva las canciones si el ID no existe", () => {
  const state = libraryReducer(
    [mockSong1, mockSong2],
    removeSong(99)
  );

  expect(state).toEqual([mockSong1, mockSong2]);
});
