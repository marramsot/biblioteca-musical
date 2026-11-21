import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ThemeProvider } from "styled-components";
import { MemoryRouter } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import Library from "../src/components/Library/Library";
import theme from "../src/theme/theme";
import { removeSong } from "../src/redux/slices/librarySlice";
// Simulamos las funciones de Redux.
jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

// Simulamos la acción de eliminar canciones.
jest.mock("../src/redux/slices/librarySlice", () => ({
  removeSong: jest.fn(),
}));
// Creamos una función simulada para dispatch.
const mockDispatch = jest.fn();

// Creamos canciones de ejemplo para las pruebas de la biblioteca.
const mockSongs = [
  {
    id: 1,
    title: "Canción de prueba 1",
    artist: "Artista 1",
    album: "Álbum 1",
  },
  {
    id: 2,
    title: "Canción de prueba 2",
    artist: "Artista 2",
    album: "Álbum 2",
  },
];

// Preparamos los mocks antes de cada prueba.
beforeEach(() => {
  // Limpiamos las llamadas anteriores.
  jest.clearAllMocks();

  // Simulamos la función dispatch de Redux.
  useDispatch.mockReturnValue(mockDispatch);

  // Simulamos las canciones guardadas en la biblioteca.
  useSelector.mockImplementation((selector) =>
    selector({ library: mockSongs })
  );
});

// Comprobamos que se muestren las canciones guardadas en la biblioteca.
test("La lista de canciones de la biblioteca se muestra correctamente", () => {
  render(
    <MemoryRouter>
      <ThemeProvider theme={theme}>
        <Library />
      </ThemeProvider>
    </MemoryRouter>
  );

  // Verificamos que aparezcan las dos canciones simuladas.
  expect(screen.getByText("Canción de prueba 1")).toBeInTheDocument();
  expect(screen.getByText("Canción de prueba 2")).toBeInTheDocument();
});

 // Comprobamos que el botón Eliminar envíe la acción correspondiente.
test("El botón Eliminar ejecuta la acción al hacer clic", () => {
  render(
    <MemoryRouter>
      <ThemeProvider theme={theme}>
        <Library />
      </ThemeProvider>
    </MemoryRouter>
  );

  // Obtenemos los botones Eliminar de las canciones.
  const botonesEliminar = screen.getAllByRole("button", {
    name: "Eliminar",
  });

  // Verificamos que cada canción tenga su botón.
  expect(botonesEliminar).toHaveLength(2);

  // Simulamos un clic en el primer botón.
  fireEvent.click(botonesEliminar[0]);

  // Comprobamos que se haya llamado a la acción con el ID correcto.
  expect(removeSong).toHaveBeenCalledWith(1);
  expect(mockDispatch).toHaveBeenCalledTimes(1);
});

 // Comprobamos que aparezca un mensaje cuando la biblioteca esté vacía.
test("La biblioteca vacía muestra el mensaje correspondiente", () => {
  // Simulamos una biblioteca sin canciones.
  useSelector.mockImplementation((selector) =>
    selector({ library: [] })
  );

  render(
    <MemoryRouter>
      <ThemeProvider theme={theme}>
        <Library />
      </ThemeProvider>
    </MemoryRouter>
  );

  // Verificamos que aparezca el mensaje de biblioteca vacía.
  expect(
    screen.getByText("No hay canciones en tu biblioteca")
  ).toBeInTheDocument();
});
