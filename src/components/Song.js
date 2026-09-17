import React,{Component} from "react";
class Song extends Component{
    render(){
        return(
            <div className="songCard">
                <h2>{this.props.title}</h2>
                <p>Artista:{this.props.artist}</p>
                <p>Duración:{this.props.duration}</p>
            </div>
        );
    }
}
export default Song;