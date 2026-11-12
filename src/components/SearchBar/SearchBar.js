import React, {useState} from "react";
import { SearchForm,SearchInput,SearchButton } from "./SearchBar.styles";
// Permite enviar acciones al store de Redux.
import { useDispatch } from "react-redux";

// Importamos la acción asíncrona que busca álbumes en TheAudioDB.
import { fetchSongs } from "../../redux/slices/searchSlice";
const SearchBar = () => {
    const [searchTeam,setSearchTeam]=useState("");//guarda lo escrito en el buscador
    // Permite enviar acciones a Redux Toolkit.
    const dispatch = useDispatch();
    const handleSubmit =(event) =>{
        event.preventDefault();//evita que el formulario recargue la página
        // Enviamos el nombre del artista para buscar sus canciones.
        dispatch(fetchSongs(searchTeam));
    };
    return(
        <SearchForm onSubmit={handleSubmit}>
            <SearchInput
                type="text"
                value={searchTeam}
                onChange={(event) => setSearchTeam(event.target.value)} /* */ 
            />
            <SearchButton type="submit">
                Buscar
            </SearchButton>
        </SearchForm>
    );
};
export default SearchBar;