
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ThemeProvider } from "styled-components";
import { MemoryRouter } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import SearchResults from "../src/components/SearchResults/SearchResults";
import theme from "../src/theme/theme";
import { addSong } from "../src/redux/slices/librarySlice";

// Simulamos las funciones de Redux.
jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

// Simulamos la acción de agregar canciones.
jest.mock("../src/redux/slices/librarySlice", () => ({
  addSong: jest.fn(),
}));

// Creamos una función simulada para dispatch.
const mockDispatch = jest.fn();

// Creamos canciones de ejemplo para las pruebas.
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
  jest.clearAllMocks();
  useDispatch.mockReturnValue(mockDispatch);
  useSelector.mockImplementation((selector) =>
    selector({ search: { results: mockSongs } })
  );
});

// Comprobamos que se muestren las canciones de los datos simulados.
test("La lista de canciones se renderiza correctamente", () => {
  render(
    <MemoryRouter>
      <ThemeProvider theme={theme}>
        <SearchResults />
      </ThemeProvider>
    </MemoryRouter>
  );

  // Verificamos que aparezcan las dos canciones.
  expect(screen.getByText("Canción de prueba 1")).toBeInTheDocument();
  expect(screen.getByText("Canción de prueba 2")).toBeInTheDocument();
});
// Comprobamos que cada canción muestre su título, artista y álbum.
test("Cada canción muestra su título, artista y álbum", () => {
  render(
    <MemoryRouter>
      <ThemeProvider theme={theme}>
        <SearchResults />
      </ThemeProvider>
    </MemoryRouter>
  );

  // Verificamos los datos de la primera canción.
  expect(screen.getByText("Canción de prueba 1")).toBeInTheDocument();
  expect(screen.getByText("Artista:Artista 1")).toBeInTheDocument();
  expect(screen.getByText("Álbum:Álbum 1")).toBeInTheDocument();

  // Verificamos los datos de la segunda canción.
  expect(screen.getByText("Canción de prueba 2")).toBeInTheDocument();
  expect(screen.getByText("Artista:Artista 2")).toBeInTheDocument();
  expect(screen.getByText("Álbum:Álbum 2")).toBeInTheDocument();
});
// Comprobamos que el botón permita agregar una canción a la biblioteca.
test("El botón Agregar a mi biblioteca ejecuta la función al hacer clic", () => {
  // Simulamos la acción que devuelve Redux.
  addSong.mockReturnValue({ type: "library/addSong" });

  render(
    <MemoryRouter>
      <ThemeProvider theme={theme}>
        <SearchResults />
      </ThemeProvider>
    </MemoryRouter>
  );

  // Buscamos los botones para agregar canciones.
  const botones = screen.getAllByRole("button", {
    name: "Agregar a mi biblioteca",
  });

  // Simulamos un clic en el primer botón.
  fireEvent.click(botones[0]);

  // Verificamos que se haya ejecutado la acción de agregar.
  expect(addSong).toHaveBeenCalledTimes(1);
  expect(mockDispatch).toHaveBeenCalledTimes(1);
});
