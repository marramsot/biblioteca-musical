
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ThemeProvider } from "styled-components";
import { MemoryRouter } from "react-router";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import App from "../src/App";
import theme from "../src/theme/theme";
import searchReducer from "../src/redux/slices/searchSlice";
import libraryReducer from "../src/redux/slices/librarySlice";

// Creamos una tienda Redux independiente para cada prueba.
const crearStore = () =>
  configureStore({
    reducer: {
      search: searchReducer,
      library: libraryReducer,
    },
  });

// Renderizamos App con Redux, React Router y los estilos.
const renderizarApp = (store = crearStore()) => {
  return render(
    <Provider store={store}>
      <MemoryRouter>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </MemoryRouter>
    </Provider>
  );
};

// Comprobamos que la aplicación muestre sus componentes principales.
test("La aplicación muestra sus componentes principales", () => {
  renderizarApp();

  // Verificamos que aparezca la biblioteca.
  expect(screen.getByText("Mi Biblioteca")).toBeInTheDocument();
  // Verificamos que aparezca el encabezado de la aplicación.
expect(screen.getByRole("heading", {
  name: "Mi Biblioteca Musical",
})).toBeInTheDocument();
// Verificamos que aparezca el campo de búsqueda.
expect(screen.getByRole("textbox")).toBeInTheDocument();
});

// Creamos una canción ficticia para las pruebas de búsqueda.
const mockSong = {
  id: 1,
  title: "Canción de prueba",
  artist: "Artista de prueba",
  album: "Álbum de prueba",
};

// Comprobamos que la aplicación muestre los resultados de búsqueda.
test("La aplicación muestra las canciones encontradas", () => {
  // Creamos una tienda con una canción en los resultados.
  const store = crearStore();

  store.dispatch({
    type: "search/fetchSongs/fulfilled",
    payload: [mockSong],
    meta: {
      arg: "Canción de prueba",
      requestId: "prueba-1",
      requestStatus: "fulfilled",
    },
  });

  // Renderizamos la aplicación con los datos simulados.
  renderizarApp(store);

  // Verificamos que aparezca la canción.
  expect(
    screen.getByText("Canción de prueba")
  ).toBeInTheDocument();
});

// Comprobamos que una canción se agregue a la biblioteca.
test("La aplicación permite agregar una canción a la biblioteca", () => {
  const store = crearStore();

  // Simulamos una búsqueda con una canción.
  store.dispatch({
    type: "search/fetchSongs/fulfilled",
    payload: [mockSong],
    meta: {
      arg: "Canción de prueba",
      requestId: "prueba-2",
      requestStatus: "fulfilled",
    },
  });

  renderizarApp(store);

  // Simulamos un clic en el botón para agregar la canción.
  fireEvent.click(
    screen.getByRole("button", {
      name: "Agregar a mi biblioteca",
    })
  );

  // Comprobamos que la canción esté guardada en Redux.
  expect(store.getState().library).toContainEqual(mockSong);

  // Comprobamos que aparezca en la biblioteca.
  expect(
    screen.getAllByText("Canción de prueba")
  ).toHaveLength(2);
});

// Comprobamos que el usuario pueda escribir en el buscador.
test("El usuario puede escribir una búsqueda", () => {
  renderizarApp();

  // Obtenemos el campo de búsqueda.
  const input = screen.getByRole("textbox");

  // Simulamos que el usuario escribe una canción.
  fireEvent.change(input, {
    target: { value: "Canción de prueba" },
  });

  // Verificamos que el campo contenga el texto escrito.
  expect(input).toHaveValue("Canción de prueba");
});
