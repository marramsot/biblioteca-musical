
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import SearchBar from "../src/components/SearchBar/SearchBar";
import { useDispatch } from "react-redux";
import { fetchSongs } from "../src/redux/slices/searchSlice";
import { ThemeProvider } from "styled-components";
import theme from "../src/theme/theme";

// Simulamos las funciones de Redux para realizar las pruebas.
jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
}));

jest.mock("../src/redux/slices/searchSlice", () => ({
  fetchSongs: jest.fn(),
}));

// Creamos una función simulada para comprobar las búsquedas.
const mockDispatch = jest.fn();

beforeEach(() => {
  jest.clearAllMocks();
  useDispatch.mockReturnValue(mockDispatch);
});

// Comprobamos que se muestre el campo de búsqueda.
test("El input de búsqueda se renderiza correctamente", () => {
  render(
  <ThemeProvider theme={theme}>
    <SearchBar />
  </ThemeProvider>
);

  // Verificamos que exista un campo para escribir.
  const input = screen.getByRole("textbox");

  expect(input).toBeInTheDocument();
});

// Comprobamos que el usuario pueda escribir en el campo de búsqueda.
test("El valor del input cambia cuando el usuario escribe", () => {
  render(
    <ThemeProvider theme={theme}>
      <SearchBar />
    </ThemeProvider>
  );

  // Buscamos el campo de texto.
  const input = screen.getByRole("textbox");

  // Simulamos que el usuario escribe el nombre de un artista.
  fireEvent.change(input, { target: { value: "Reik" } });

  // Comprobamos que el campo tenga el texto escrito.
  expect(input).toHaveValue("Reik");
});

// Comprobamos que se ejecute la búsqueda al hacer clic en el botón.
test("Ejecuta la búsqueda al hacer clic en Buscar", () => {
  render(
    <ThemeProvider theme={theme}>
      <SearchBar />
    </ThemeProvider>
  );

  // Buscamos el campo de texto y escribimos un artista.
  const input = screen.getByRole("textbox");
  fireEvent.change(input, { target: { value: "Reik" } });

  // Simulamos un clic en el botón Buscar.
  const boton = screen.getByRole("button", { name: /buscar/i });
  fireEvent.click(boton);

  // Comprobamos que se haya solicitado la búsqueda.
  expect(fetchSongs).toHaveBeenCalledWith("Reik");
  expect(mockDispatch).toHaveBeenCalledTimes(1);
});

// Comprobamos que se ejecute la búsqueda al presionar Enter.
test("Ejecuta la búsqueda al presionar Enter", () => {
  render(
    <ThemeProvider theme={theme}>
      <SearchBar />
    </ThemeProvider>
  );

  // Escribimos el nombre de un artista.
  const input = screen.getByRole("textbox");
  fireEvent.change(input, { target: { value: "Gloria Trevi" } });

  // Simulamos el envío del formulario al presionar Enter.
  fireEvent.submit(input.closest("form"));

  // Comprobamos que se haya solicitado la búsqueda.
  expect(fetchSongs).toHaveBeenCalledWith("Gloria Trevi");
  expect(mockDispatch).toHaveBeenCalledTimes(1);
});
