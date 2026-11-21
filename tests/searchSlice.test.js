
import { configureStore } from "@reduxjs/toolkit";
import searchReducer, {
  fetchSongs,
  resetResults,
} from "../src/redux/slices/searchSlice";

// Creamos una tienda Redux independiente para cada prueba.
const crearStore = () =>
  configureStore({
    reducer: {
      search: searchReducer,
    },
  });

// Simulamos una respuesta correcta de la API.
const crearRespuesta = (data, ok = true) => ({
  ok,
  json: jest.fn().mockResolvedValue(data),
});

// Preparamos las pruebas.
beforeEach(() => {
  jest.clearAllMocks();
  global.fetch = jest.fn();
});

// Limpiamos la simulación de fetch al terminar.
afterAll(() => {
  jest.restoreAllMocks();
  delete global.fetch;
});

// 1. Comprobamos el estado inicial.
test("El estado inicial de búsqueda es correcto", () => {
  const store = crearStore();

  expect(store.getState().search).toEqual({
    results: [],
    loading: false,
    error: null,
    hasSearched: false,
    lastSearch: "",
  });
});

// 2. Comprobamos que se puedan limpiar los resultados.
test("resetResults limpia los resultados y errores", () => {
  const store = crearStore();

  store.dispatch({
    type: fetchSongs.fulfilled.type,
    payload: [{ id: "1", title: "Canción de prueba" }],
  });

  store.dispatch(resetResults());

  expect(store.getState().search.results).toEqual([]);
  expect(store.getState().search.loading).toBe(false);
  expect(store.getState().search.error).toBeNull();
});

// 3. Comprobamos el estado de una búsqueda pendiente.
test("Una búsqueda pendiente activa la carga", () => {
  const store = crearStore();

  store.dispatch(fetchSongs.pending("solicitud-1", "Reik"));

  expect(store.getState().search.loading).toBe(true);
  expect(store.getState().search.lastSearch).toBe("Reik");
  expect(store.getState().search.error).toBeNull();
});

// 4. Comprobamos una búsqueda exitosa con canciones.
test("Una búsqueda exitosa guarda las canciones", async () => {
  const store = crearStore();

  global.fetch
    .mockResolvedValueOnce(
      crearRespuesta({
        album: [{ idAlbum: "100" }],
      })
    )
    .mockResolvedValueOnce(
      crearRespuesta({
        track: [
          {
            idTrack: "1",
            idAlbum: "100",
            strTrack: "Canción de prueba",
            strArtist: "Reik",
            strAlbum: "Álbum de prueba",
          },
        ],
      })
    );

  await store.dispatch(fetchSongs("Reik"));

  expect(store.getState().search.results).toEqual([
    {
      id: "1",
      albumId: "100",
      title: "Canción de prueba",
      artist: "Reik",
      album: "Álbum de prueba",
    },
  ]);

  expect(store.getState().search.loading).toBe(false);
  expect(store.getState().search.hasSearched).toBe(true);
  expect(global.fetch).toHaveBeenCalledTimes(2);
});

// 5. Comprobamos una búsqueda sin álbumes.
test("Una búsqueda sin álbumes devuelve una lista vacía", async () => {
  const store = crearStore();

  global.fetch.mockResolvedValueOnce(
    crearRespuesta({ album: null })
  );

  await store.dispatch(fetchSongs("Artista inexistente"));

  expect(store.getState().search.results).toEqual([]);
  expect(store.getState().search.hasSearched).toBe(true);
  expect(global.fetch).toHaveBeenCalledTimes(1);
});

// 6. Comprobamos un error al buscar álbumes.
test("Muestra un error cuando falla la consulta de álbumes", async () => {
  const store = crearStore();

  global.fetch.mockResolvedValueOnce(
    crearRespuesta({}, false)
  );

  await store.dispatch(fetchSongs("Reik"));

  expect(store.getState().search.loading).toBe(false);
  expect(store.getState().search.error).toBe(
    "No se pudieron obtener los álbumes."
  );
});

// 7. Comprobamos un error al consultar canciones.
test("Muestra un error cuando falla la consulta de canciones", async () => {
  const store = crearStore();

  global.fetch
    .mockResolvedValueOnce(
      crearRespuesta({
        album: [{ idAlbum: "100" }],
      })
    )
    .mockResolvedValueOnce(
      crearRespuesta({}, false)
    );

  await store.dispatch(fetchSongs("Reik"));

  expect(store.getState().search.loading).toBe(false);
  expect(store.getState().search.error).toBe(
    "No se pudieron obtener las canciones."
  );
});
