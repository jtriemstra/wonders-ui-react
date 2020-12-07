import React, { Component } from "react";
import Utility from "../Utility"

class SplashScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {activeGame:false};

        this.handleStart = this.handleStart.bind(this);
        this.handleJoin = this.handleJoin.bind(this);
        
        //this.handleList = this.handleList.bind(this);        
    }

    componentDidMount(){
        if (!this.props.isGameActive){
            this.checkGameStatus();

            this.statusInterval = setInterval(() => {
                this.checkGameStatus();            
            }, 5000);
        }        
    }

    componentWillUnmount(){
        clearInterval(this.statusInterval);
    }

    handleStart(event){
        event.preventDefault();
        
        this.loadGame(this.getName(), "create");
        clearInterval(this.statusInterval);
    }
    
    handleJoin(event) {
        event.preventDefault();
        this.loadGame(this.getName(), "join", this.getGameName());
        clearInterval(this.statusInterval);
    }

    getName(){
        const splashForm = event.target.closest("form");
        return splashForm.querySelector("#playerName").value;
    }

    getGameName(){
        const splashForm = event.target.closest("form");
        return splashForm.querySelector("#gameName").value;
    }
    
    loadGame(playerName, action, gameName) {

        var myRequest = new Request(Utility.apiServer() + "/" + action + "?playerName=" + playerName + (gameName ? "&gameName=" + gameName : ""));

        fetch(myRequest, Utility.getRequestInit())
        .then(res => res.json())
        .then((result) => {
            document.cookie = "playerName=" + playerName;
            document.cookie = "gameName=" + (gameName ? gameName : playerName);
            this.props.onGameStart(result, playerName);
        });
    }

    /*handleList(event) {
        event.preventDefault();

        this.checkGameStatus();
    }*/

    checkGameStatus(){
        var myRequest = new Request(Utility.apiServer() + "/listGames");

        fetch(myRequest, Utility.getRequestInit())
        .then(res => res.json())
        .then((result) => {
            document.querySelector("#gameName").length = 0;
            for (var i=0; i<result.games.games.length; i++){
                document.querySelector("#gameName").add(new Option(result.games.games[i]));
            }
        })
        .catch(error => {console.log(error);});
    }

    render() {
        return (
            <div>
            <form className="popup-content">
                <div className="parchment"></div>
                <div className="splash-screen-wrapper">
                    <div className="splash-screen-column">
                        <label className="user-name">Enter your name: <input type="text" id="playerName"></input></label><br/>
                        <button onClick={this.handleStart}>Create New Game</button>
                    </div>
                    <div className="splash-screen-column">
                        <label className="user-name">Select game name to join: <select id="gameName" /></label><br/>
                        <button onClick={this.handleJoin}>Join Game</button>
                    </div>                
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

export default SplashScreen;