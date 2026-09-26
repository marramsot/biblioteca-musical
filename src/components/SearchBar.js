import React, {useState} from "react";
const SearchBar = ({onSearch}) =>{
    const [searchTeam,setSearchTeam]=useState("");//guarda lo escrito en el buscador
    const handleSubmit =(event) =>{
        event.preventDefault();//evita que el formulario recargue la página
        onSearch(searchTeam);
    };
    return(
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={searchTeam}
                onChange={(event) => setSearchTeam(event.target.value)} /* */ 
            />
            <button type="submit">
                Buscar
            </button>
        </form>
    );
};
export default SearchBar;