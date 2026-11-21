
import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Header from "../src/components/Header/Header";

// Comprobamos que se muestre el título de la aplicación.
test("Muestra correctamente el título Mi Biblioteca Musical", () => {
  render(<Header />);

  expect(
    screen.getByRole("heading", {
      level: 1,
      name: "Mi Biblioteca Musical",
    })
  ).toBeInTheDocument();
});

// Comprobamos que el encabezado no tenga contenido adicional.
test("El encabezado solo contiene el título", () => {
  const { container } = render(<Header />);

  expect(container.querySelectorAll("h1")).toHaveLength(1);
  expect(container.querySelector("header")?.textContent).toBe(
    "Mi Biblioteca Musical"
  );
});
