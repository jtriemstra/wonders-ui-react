import React, { Component } from "react";
import ReactDOM from "react-dom";
import Header from "./Header";
import SplashScreen from "./SplashScreen";
import GameContainer from "./GameContainer";
import Utility from "../Utility";
import Hand from "./Hand";
import Board from "./Board";
import Waiting from "./Waiting";
import FinishAge from "./FinishAge";
import Choices from "./Choices";

class WondersUi extends Component {
  constructor() {
    super();

    this.state = {
      gameState: null,
      ageFinished: false
    };

    this.handleNewState = this.handleNewState.bind(this);
    this.getOptions = this.getOptions.bind(this);
    this.beginPlay = this.beginPlay.bind(this);
    this.wait = this.wait.bind(this);
    this.startAge = this.startAge.bind(this);
    this.finishAge = this.finishAge.bind(this);
    this.handleAction = this.handleAction.bind(this);
  }

  getPlayerName() {
    //TODO: consolidate this and the same method in GameContainer
    if (document.cookie) {
        const cookies = document.cookie.split(";");
        for (var i=0; i<cookies.length; i++){
            if (cookies[i].trim().startsWith("playerName=")){
                return cookies[i].trim().substring(11);                    
            }
        }
    }
  }

  getGameName() {
    //TODO: consolidate this and the same method in GameContainer
    if (document.cookie) {
        const cookies = document.cookie.split(";");
        for (var i=0; i<cookies.length; i++){
            if (cookies[i].trim().startsWith("gameName=")){
                return cookies[i].trim().substring(9);                    
            }
        }
    }
  }

  componentDidMount() {
    console.log("mount");
    //TODO: consolidate this and the same method in GameContainer
    if(this.getPlayerName()){
        this.handleRefresh();
    }
  }

  handleRefresh(e) {
    //TODO: consolidate this and the same method in GameContainer
    if (e) e.preventDefault();

    if (!this.getPlayerName()) return;

    fetch(Utility.apiServer() + "/refresh?playerId=" + this.getPlayerName() + "&gameName=" + this.getGameName())
    .then(res => {
        if (res.ok) { return res.json(); }
        else { res.text().then(text => {
            console.error(text);
          });               
        }
    })
    .then((result) => {
        if (result){
          console.log(result);
          if (result.playerFound){
            this.handleNewState(result);
          }
          else {
            document.cookie = "playerName=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            window.location.reload();
          }
        }
    });
  }

  handleNewState(newState, playerName){
    this.updateState(newState);
  }

  handleAction(newState){
    this.updateState(newState);
  }

  updateState(newState){
    let mergedState = this.state.gameState || {};
    if (newState.boardName) mergedState.boardName = newState.boardName;
    if (newState.boardSide) mergedState.boardSide = newState.boardSide;
    if (newState.cards) mergedState.cards = newState.cards;
    if (newState.cardsOnBoard) mergedState.cardsOnBoard = newState.cardsOnBoard;
    if (newState.coins != undefined) mergedState.coins = newState.coins;
    if (newState.defeats) mergedState.defeats = newState.defeats;
    if (newState.victories) mergedState.victories = newState.victories;
    if (newState.nextActions) mergedState.nextActions = newState.nextActions;
    if (newState.buildState) mergedState.buildState = newState.buildState;    
    if (newState.options) {
      mergedState.options = newState.options;    
    }
    else {
      mergedState.options = null;
    }

    this.setState({gameState: mergedState});

    console.log(newState.nextActions);
    if (newState.nextActions === "wait"){
      if (!this.waitingInterval){
        console.log("waiting");
        this.startWaiting();
      }
    }
    else {
      console.log("done waiting");
      this.stopWaiting();
      if (newState.nextActions === "options"){
        this.getOptions();
      }
      else if (newState.nextActions === "finishAge"){
        this.finishAge();
      }
    }
  }

  startWaiting(){
    this.waitingInterval = setInterval(() => {
        console.log("calling wait");
        this.wait();            
    }, 2000);
  }

  stopWaiting(){
    clearInterval(this.waitingInterval);
    this.waitingInterval = null;
  }

  getOptions(){
         var myRequest = new Request(Utility.apiServer() + "/options?playerId=" + this.getPlayerName() + "&gameName=" + this.getGameName());

        fetch(myRequest, Utility.getRequestInit())
        .then(res => res.json())
        .then((result) => {
            console.log(result);
            this.updateState(result);
        });
  }

  beginPlay(){
        var myRequest = new Request(Utility.apiServer() + "/start?playerId=" + this.getPlayerName() + "&gameName=" + this.getGameName());

        fetch(myRequest, Utility.getRequestInit())
        .then(res => res.json())
        .then((result) => {
            console.log(result);
            this.updateState(result);
        });
  }

  wait(){
        var myRequest = new Request(Utility.apiServer() + "/wait?playerId=" + this.getPlayerName() + "&gameName=" + this.getGameName());

        fetch(myRequest, Utility.getRequestInit())
        .then(res => res.json())
        .then((result) => {
            console.log(result);
            this.updateState(result);
        });
  }

  finishAge(){
        var myRequest = new Request(Utility.apiServer() + "/getEndOfAge?playerId=" + this.getPlayerName() + "&gameName=" + this.getGameName());

        fetch(myRequest, Utility.getRequestInit())
        .then(res => res.json())
        .then((result) => {
            console.log(result);
            this.updateState(result);
            this.setState({ageFinished:true});
        });
  }

  startAge(result){
    this.updateState(result);
    this.setState({ageFinished:false});
  }

  render() {
    console.log("render");
    const gameState = this.state.gameState;

    let splashScreen = null;
    //if (!gameState){
      splashScreen = <SplashScreen onGameStart={this.handleNewState} isGameActive={this.getPlayerName() ? true : false} />;
    //}

    let endScreen = null;
    //if (gameState && gameState.isGameOver) {
    //  endScreen = <EndScreen gameState={gameState} />;
    //}

    let gameContainer = null;
    //if (gameState){
    //  gameContainer = <GameContainer gameState={gameState} onGameUpdate={this.handleNewState} />;
    //}

    //TODO: this looks terrible. probably can refactor out to another component so the whole thing doesn't try to render if gameState is null
    let cards = this.state.gameState ? this.state.gameState.cards : null;
    let boardCards = this.state.gameState ? this.state.gameState.cardsOnBoard : null;
    let coins = this.state.gameState ? this.state.gameState.coins : null;
    let victories = this.state.gameState ? this.state.gameState.victories : null;
    let defeats = this.state.gameState ? this.state.gameState.defeats : null;
    let canBuild = this.state.gameState && this.state.gameState.nextActions.indexOf("build") >= 0;
    let board = this.state.gameState ? this.state.gameState.boardName : null;
    let boardSide = this.state.gameState ? this.state.gameState.boardSide : null;
    let buildState = this.state.gameState ? this.state.gameState.buildState : null;
    let actions = this.state.gameState ? this.state.gameState.nextActions : null;
    let options = this.state.gameState ? this.state.gameState.options : null;

    let ageCompletePopup = this.state.ageFinished ? <FinishAge victories={victories} defeats={defeats} startAge={this.startAge} playerName={this.getPlayerName()} gameName={this.getGameName()} /> : null;

    return (    
      <div>
        <Header />
        {splashScreen}
        {gameContainer}
        {endScreen}
        <button onClick={this.beginPlay}>Begin Play</button>
        <button onClick={this.getOptions}>Get Options</button>
        <button onClick={this.wait}>Wait</button>
        <button onClick={this.finishAge}>Finish Age</button>
        
        <div class="tray">
          <h2>Coins</h2>{coins}
          <h2>Victories</h2>{victories}
          <h2>Defeats</h2>{defeats}
        </div>
        <Waiting isWaiting={this.waitingInterval != null}></Waiting>
        {ageCompletePopup}
        <Board cards={boardCards} board={board} buildState={buildState} boardSide={boardSide} />
        <Hand cards={cards} canBuild={canBuild} handleAction={this.handleAction} actions={actions} />
        <Choices options={options} action={actions} updateState={this.updateState} />
      </div>
    );
  }

}

export default WondersUi;

