
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ThemeProvider } from "styled-components";
import { MemoryRouter, Routes, Route } from "react-router";
import { useSelector } from "react-redux";
import SongDetail from "../src/components/SongDetail/SongDetail";
import useFetch from "../src/hooks/useFetch";
import theme from "../src/theme/theme";

// Simulamos useSelector para controlar los datos de Redux.
jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
}));

// Simulamos useFetch para evitar consultas reales a la API.
jest.mock("../src/hooks/useFetch", () => jest.fn());

// Creamos una canción ficticia para las pruebas.
const mockSong = {
  id: 1,
  albumId: 100,
  title: "Canción de prueba",
  artist: "Artista de prueba",
  album: "Álbum de prueba",
};

// Simulamos la información del álbum que devuelve la API.
const mockAlbumData = {
  album: [
    {
      strArtist: "Artista de prueba",
      strAlbum: "Álbum de prueba",
      intYearReleased: "2020",
    },
  ],
};

// Creamos funciones simuladas para comprobar los reintentos.
const mockRefetchSong = jest.fn();
const mockRefetchAlbum = jest.fn();

// Preparamos los datos simulados antes de cada prueba.
beforeEach(() => {
  // Limpiamos las llamadas anteriores.
  jest.clearAllMocks();

  // Simulamos la canción almacenada en Redux.
  useSelector.mockImplementation((selector) =>
    selector({
      search: {
        results: [mockSong],
      },
    })
  );

  // Simulamos las dos consultas que realiza SongDetail.
  useFetch.mockImplementation((url) => {
    // Primera consulta: información de la canción.
    if (url?.includes("track.php")) {
      return {
        data: null,
        loading: false,
        error: null,
        refetch: mockRefetchSong,
      };
    }

    // Segunda consulta: información del álbum.
    return {
      data: mockAlbumData,
      loading: false,
      error: null,
      refetch: mockRefetchAlbum,
    };
  });
});

// Comprobamos que se muestren los detalles de la canción.
test("Muestra correctamente los detalles de la canción", () => {
  render(
    <MemoryRouter initialEntries={["/song/1"]}>
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path="/song/:id" element={<SongDetail />} />
        </Routes>
      </ThemeProvider>
    </MemoryRouter>
  );

  // Verificamos que aparezca el encabezado.
  expect(
    screen.getByText("Detalle de la canción")
  ).toBeInTheDocument();

  // Verificamos la información de la canción y su álbum.
  expect(
    screen.getByText("Título: Canción de prueba")
  ).toBeInTheDocument();

  expect(
    screen.getByText("Artista: Artista de prueba")
  ).toBeInTheDocument();

  expect(
    screen.getByText("Álbum: Álbum de prueba")
  ).toBeInTheDocument();

  expect(
    screen.getByText("Año de lanzamiento: 2020")
  ).toBeInTheDocument();
});

// Comprobamos que aparezca el mensaje mientras se cargan los datos.
test("Muestra un mensaje mientras se cargan los detalles", () => {
  // Simulamos que la consulta de la canción está cargando.
  useFetch.mockImplementation((url) => {
    if (url?.includes("track.php")) {
      return {
        data: null,
        loading: true,
        error: null,
        refetch: mockRefetchSong,
      };
    }

    return {
      data: mockAlbumData,
      loading: false,
      error: null,
      refetch: mockRefetchAlbum,
    };
  });

  render(
    <MemoryRouter initialEntries={["/song/1"]}>
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path="/song/:id" element={<SongDetail />} />
        </Routes>
      </ThemeProvider>
    </MemoryRouter>
  );

  // Verificamos que aparezca el mensaje de carga.
  expect(
    screen.getByText("Cargando detalles...")
  ).toBeInTheDocument();
});

// Comprobamos que el botón Reintentar funcione cuando falla la consulta.
test("Permite reintentar cuando ocurre un error", () => {
  // Simulamos un error al consultar la canción.
  useFetch.mockImplementation((url) => {
    if (url?.includes("track.php")) {
      return {
        data: null,
        loading: false,
        error: "Error al cargar la canción",
        refetch: mockRefetchSong,
      };
    }

    return {
      data: mockAlbumData,
      loading: false,
      error: null,
      refetch: mockRefetchAlbum,
    };
  });

  render(
    <MemoryRouter initialEntries={["/song/1"]}>
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path="/song/:id" element={<SongDetail />} />
        </Routes>
      </ThemeProvider>
    </MemoryRouter>
  );

  // Verificamos que aparezca el mensaje de error.
  expect(
    screen.getByText(
      "Hubo un problema al cargar los datos. Intenta nuevamente."
    )
  ).toBeInTheDocument();

  // Simulamos un clic en el botón Reintentar.
  fireEvent.click(
    screen.getByRole("button", { name: "Reintentar" })
  );

  // Comprobamos que se vuelva a intentar la consulta.
  expect(mockRefetchSong).toHaveBeenCalledTimes(1);
  expect(mockRefetchAlbum).not.toHaveBeenCalled();
});

// Comprobamos que se pueda reintentar la consulta del álbum.
test("Permite reintentar cuando falla la consulta del álbum", () => {
  // Simulamos que la canción se consulta correctamente,
  // pero ocurre un error al consultar el álbum.
  useFetch.mockImplementation((url) => {
    if (url?.includes("track.php")) {
      return {
        data: null,
        loading: false,
        error: null,
        refetch: mockRefetchSong,
      };
    }

    return {
      data: null,
      loading: false,
      error: "Error al cargar el álbum",
      refetch: mockRefetchAlbum,
    };
  });

  render(
    <MemoryRouter initialEntries={["/song/1"]}>
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path="/song/:id" element={<SongDetail />} />
        </Routes>
      </ThemeProvider>
    </MemoryRouter>
  );

  // Verificamos que aparezca el mensaje de error.
  expect(
    screen.getByText(
      "Hubo un problema al cargar los datos. Intenta nuevamente."
    )
  ).toBeInTheDocument();

  // Simulamos un clic en Reintentar.
  fireEvent.click(
    screen.getByRole("button", { name: "Reintentar" })
  );

  // Comprobamos que se reintente únicamente la consulta del álbum.
  expect(mockRefetchAlbum).toHaveBeenCalledTimes(1);
  expect(mockRefetchSong).not.toHaveBeenCalled();
});
