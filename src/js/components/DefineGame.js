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
        const chooseBoard = form.querySelector("#chooseBoard").checked;
        const boardSide = form.querySelector("#boardSide").value;
        const isLeaders = form.querySelector("#isLeaders").checked;
        
        fetch(Utility.apiServer() + "/updateGame?gameName=" + this.props.gameName + "&playerId=" + this.props.playerName + "&numberOfPlayers=" + numberOfPlayers + "&chooseBoard=" + chooseBoard + "&sideOptions=" + boardSide + "&leaders=" + isLeaders)
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
                        <label className="user-name">Choose your board: <input type="checkbox" id="chooseBoard"></input></label>
                        <label className="user-name">Use sides: <select id="boardSide"><option value="A_OR_B">A_OR_B</option><option value="A_ONLY">A_ONLY</option><option value="B_ONLY">B_ONLY</option></select></label>
                        <label className="user-name">Leaders expansion: <input type="checkbox" id="isLeaders"></input></label>
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