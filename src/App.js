import React, {useState,useEffect} from "react";
import "./App.css";
import SearchResults from "./components/SearchResults";
import Library from "./components/Library";
import Header from "./components/Header";
const App= () => {
 const songs=[
  {
    id: 1,
    title:"Todos me miran",
    artist:"Gloria Trevi",
    duration: "3:58",
  },
  {
    id: 2,
    title:"Noviembre sin ti",
    artist:"Reik",
    duration: "3:23", 
  },
  {
     id: 3,
    title:"Sal a caminar",
    artist:"Antidoping",
    duration: "4:12",
  },
];
const [searchResults]=useState(songs);
const [library,setLibrary]=useState([]);
const addToLibrary=(song) =>{
  const alreadyExists=library.some((item) => item.id=== song.id);//revisa si hay alguna cación en library cuyo id sea igual al que quiero agregar
  if(!alreadyExists){
  setLibrary([...library,song]);
  }
};
useEffect(() => {
  console.log("La biblioteca ha cambiado:",library);
},[library]);
    return(
      <div className="App">
        <Header/>
        <SearchResults 
        songs={searchResults}
        addToLibrary={addToLibrary}
         />
        <Library songs={library}/>
      </div>
    );
  };
export default App;