import React, { Component } from "react";
import Utility from "../Utility"

class DefineGame extends Component {
    constructor(props) {
        super(props);

        this.state = {activeGame:false};

        this.handleSave = this.handleSave.bind(this);        
    }

    componentDidMount(){
                
    }

    componentWillUnmount(){
        
    }

    handleSave(e) {
        if (e) e.preventDefault();

        const form = event.target.closest("form");
        const numberOfPlayers = form.querySelector("#numberOfPlayers").value;

        fetch(Utility.apiServer() + "/updateGame?gameName=" + this.props.gameName + "&playerId=" + this.props.playerName + "&numberOfPlayers=" + numberOfPlayers)
        .then(res => res.json())
        .then((result) => {
            if (result){
                this.props.onGameStart(result);
            }
        });
    }

    render() {
        return (
            <div>
                <form className="popup-content">
                    <div className="parchment"></div>
                    <div className="splash-screen-column">
                        <label className="user-name">Number of players: <input type="text" id="numberOfPlayers"></input></label>
                        <button onClick={this.handleSave}>Save</button>
                    </div>
                </form>
                <svg>
                    <filter id="wavy2">
                        <feTurbulence x="0" y="0" baseFrequency="0.02" numOctaves="5" seed="1"></feTurbulence>
                        <feDisplacementMap in="SourceGraphic" scale="20" />
                    </filter>
                </svg>
            </div>
        );
    }
}

export default DefineGame;