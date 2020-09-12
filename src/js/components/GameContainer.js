import React, { Component } from "react";
import ReactDOM from "react-dom";
import CardSet from "./CardSet"
import ActionChoices from "./ActionChoices"
import PlayerList from "./PlayerList"
import TurnDashboard from "./TurnDashboard"
import Bank from "./Bank"
import Utility from "../Utility"

class GameContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {bank: null};
        
        this.handlePlayCard = this.handlePlayCard.bind(this);
        this.handleBuyCard = this.handleBuyCard.bind(this);
        this.handleCleanup = this.handleCleanup.bind(this);
        this.handleAction = this.handleAction.bind(this);
        this.handleRefresh = this.handleRefresh.bind(this);
        this.handleEndGame = this.handleEndGame.bind(this);
        this.handActiveTest = this.handActiveTest.bind(this);
        this.bankActiveTest = this.bankActiveTest.bind(this);
    }

    getPlayerName() {
        if (document.cookie) {
            const cookies = document.cookie.split(";");
            for (var i=0; i<cookies.length; i++){
                if (cookies[i].startsWith("playerName=")){
                    return cookies[i].substring(11);                    
                }
            }
        }
    }

    componentDidMount() {
        if (this.props.gameState){
            this.loadBank();
        }

        if(this.getPlayerName()){
            this.handleRefresh();
        }

        setInterval(() => {
            if (this.props.gameState && !this.props.gameState.isCurrentPlayer){
                this.handleRefresh();
            }
        }, 5000);
    }

    loadBank() {
        console.log("loading bank");
        var myHeaders = new Headers();
        myHeaders.append('pragma', 'no-cache');
        myHeaders.append('cache-control', 'no-cache');

        var myInit = {
            method: 'GET',
            headers: myHeaders,
        };

        var myRequest = new Request(Utility.apiServer() + "/bank?nocache=" + Date.now());

        fetch(myRequest, myInit)
        .then(res => res.json())
        .then((result) => {
            this.setState({bank: result});
            console.log(result);
        });

    }

    handlePlayCard(cardName){
        fetch(Utility.apiServer() + "/play?card=" + cardName + "&playerName=" + this.getPlayerName())
        .then(res => {
            if (res.ok) { return res.json(); }
            else { res.text().then(text => {
                console.error(text);
              });               
            }
        })
        .then((result) => {
            if (result){
                this.props.onGameUpdate(result);
                //TODO: only do this if there's a trigger for it
                this.loadBank();
            }
        });
    }

    handleBuyCard(cardName){
        fetch(Utility.apiServer() + "/buy?card=" + cardName + "&playerName=" + this.getPlayerName())
        .then(res => {
            if (res.ok) { return res.json(); }
            else { res.text().then(text => {
                console.error(text);
              });               
            }
        })
        .then((result) => {
            if (result){
                this.props.onGameUpdate(result);
            }            
        });

        this.loadBank();
    }

    handleCleanup(e){
        e.preventDefault();
        fetch(Utility.apiServer() + "/cleanup?playerName=" + this.getPlayerName())
        .then(res => {
            if (res.ok) { return res.json(); }
            else { res.text().then(text => {
                console.error(text);
              });               
            }
        })
        .then((result) => {
            if (result){
                this.props.onGameUpdate(result);
            }
        });
    }

    handleAction(optionNames){
        let url = Utility.apiServer() + "/action?playerName=" + this.getPlayerName();
        optionNames.map((name, index) => url += "&options=" + name);

        fetch(url)
        .then(res => {
            if (res.ok) { return res.json(); }
            else { res.text().then(text => {
                console.error(text);
              });               
            }
        })
        .then((result) => {
            if (result){
                this.props.onGameUpdate(result);
            }
        });
    }

    handleRefresh(e) {
        if (e) e.preventDefault();

        if (!this.getPlayerName()) return;

        fetch(Utility.apiServer() + "/refresh?playerName=" + this.getPlayerName())
        .then(res => {
            if (res.ok) { return res.json(); }
            else { res.text().then(text => {
                console.error(text);
              });               
            }
        })
        .then((result) => {
            if (result){
                this.props.onGameUpdate(result);
            }
        });
    }

    handleEndGame(e) {
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

    handActiveTest(card) {
        return this.props.gameState.thisPlayer.currentChoice == null &&
            (this.props.gameState.thisPlayer.hasActions || card.type != "ACTION") &&
            card.type != "VICTORY";
    }

    bankActiveTest(card) {
        return this.props.gameState.thisPlayer.currentChoice == null &&
            this.props.gameState.thisPlayer.hasBuys &&
            this.props.gameState.thisPlayer.treasureAvailable >= card.cost;
    }

    render() {
        if (!this.props.gameState) {
            return null;
        }
        
        const gameState = this.props.gameState;
        const playerState = gameState.thisPlayer;
        const bank = this.state.bank;

        if (gameState){
            return (        
            <div className="game-container">
                <PlayerList currentPlayerIndex={gameState.currentPlayerIndex} playerNames={gameState.playerNames} />
                <div className="end-game-container">
                    <button onClick={this.handleEndGame}>End Game</button>
                </div>
                <TurnDashboard playerState={playerState} isCurrentPlayer={gameState.isCurrentPlayer} />
                <div style={{clear:"both"}}><Bank cards={bank} faceUp={true} active={playerState.hasBuys && playerState.currentChoice == null && gameState.isCurrentPlayer} activeTest={this.bankActiveTest} name="Bank" onCardClick={this.handleBuyCard} /></div>
                <div className="card-set-container1">
                    <CardSet className="card-set-hand" cards={playerState.hand} faceUp={true} active={gameState.isCurrentPlayer && playerState.currentChoice == null} activeTest={this.handActiveTest} name="Hand" onCardClick={this.handlePlayCard}/>
                    <CardSet className="card-set-played" cards={playerState.played} faceUp={true} active={false} name="Played"/>                    
                </div>
                <div className="card-set-container2">
                    <CardSet className="card-set-deck" cards={playerState.deck} faceUp={false} active={false} name="Deck" />
                    <CardSet className="card-set-bought" cards={playerState.bought} faceUp={true} active={false} name="Bought"/>
                    <CardSet className="card-set-discard" cards={playerState.discard} faceUp={false} active={false} name="Discard"/>
                </div>
                
                <div style={{ clear:'both'}} />
                <ActionChoices currentChoice={playerState.currentChoice} onOptionClick={this.handleAction}/>                
                <button onClick={this.handleCleanup}>Clean Up</button>
            </div>
            );
        }
        else {
            return (<div></div>);
        }
      }
}

export default GameContainer;