import React, { Component } from "react";
import Utility from "../Utility"

class SplashScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {activeGame:false};

        this.handleStart = this.handleStart.bind(this);
        this.handleJoin = this.handleJoin.bind(this);
        this.handleEnd = this.handleEnd.bind(this);        
        this.handleList = this.handleList.bind(this);        
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

    handleEnd(e) {
        if (e) e.preventDefault();

        fetch(Utility.apiServer() + "/end")
        .then(res => {
            if (res.ok) { return true; }
            else { res.text().then(text => {
                console.error(text);
              });               
            }
        })
        .then((result) => {
            if (result){
                document.cookie = "playerName=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                window.location.reload();
            }
        });
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

    handleList(event) {
        event.preventDefault();

        this.checkGameStatus();
    }

    checkGameStatus(){
        var myRequest = new Request(Utility.apiServer() + "/listGames");

        fetch(myRequest, Utility.getRequestInit())
        .then(res => res.json())
        .then((result) => {
            for (var i=0; i<result.games.games.length; i++){
                document.querySelector("#gameName").add(new Option(result.games.games[i]));
            }
        });
    }

    renderButtons(){
        return (
            <div>
                <button onClick={this.handleStart}>Create New Game</button><br/>                    
                <button onClick={this.handleList}>List Games</button>
                <button onClick={this.handleJoin}>Join Game</button>
                <button onClick={this.handleEnd}>End Game</button>
            </div>
        );

        if (!this.state.activeGame){
            return (
                <div>
                    <button onClick={this.handleStart}>Start Game</button><br/>                    
                </div>
            );
        }
        else {
            return (
                <div>
                    <button onClick={this.handleJoin}>Join Game</button>
                    <button onClick={this.handleEnd}>End Game</button>
                </div>
            );
        }
        
    }

    render() {
        return (
            <form>
                <label className="user-name">Enter your name: <input type="text" id="playerName"></input></label>
                <label className="user-name">Select game name: <select id="gameName" /></label>
                {this.renderButtons()}                
            </form>
            
        );
    }
}

export default SplashScreen;