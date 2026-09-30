import React, {useState} from "react";
import { SearchForm,SearchInput,SearchButton } from "./SearchBar.styles";
const SearchBar = ({onSearch}) =>{
    const [searchTeam,setSearchTeam]=useState("");//guarda lo escrito en el buscador
    const handleSubmit =(event) =>{
        event.preventDefault();//evita que el formulario recargue la página
        onSearch(searchTeam);
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