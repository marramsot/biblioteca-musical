import React,{Component} from "react";
import "./App.css";
import Header from "./components/Header";
import Song from "./components/Song";
class App extends Component{
  componentDidMount(){
    console.log("La aplicación se cargó correctamente");
  }
  render(){
    return(
      <div className="App">
        <Header/>
        <Song
        title="Todos me miran"
        artist="Gloria Tevi"
        duration="3:58"
        />
        <Song
        title="Noviembre sin ti"
        artist="Reik"
        duration="3:23"
        />
        <Song
        title="Sal a caminar"
        artist="Antidoping"
        duration="4:12"
        />
      </div>
    );
  }
}
export default App;