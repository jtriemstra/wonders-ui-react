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
import DefineGame from "./DefineGame";
import Tray from "./Tray";

class WondersUi extends Component {
  constructor(props) {
    super();

    

    this.handleNewState = this.handleNewState.bind(this);
    this.getOptions = this.getOptions.bind(this);
    this.beginPlay = this.beginPlay.bind(this);
    this.wait = this.wait.bind(this);
    this.startAge = this.startAge.bind(this);
    this.finishAge = this.finishAge.bind(this);
    this.handleAction = this.handleAction.bind(this);
    this.updateState = this.updateState.bind(this);

    if (props && props.gameState){
      console.log("props found");
      this.state = {
        gameState: props.gameState,
        ageFinished: false
      };      
    }
    else {
      console.log('no props found');
      this.state = {
        gameState: null,
        ageFinished: false
      };
    }
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
    })
    .catch(error => {console.log(error);});
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
    if (newState.defeats != undefined) mergedState.defeats = newState.defeats;
    if (newState.victories != undefined) mergedState.victories = newState.victories;
    if (newState.allDefeats != undefined) mergedState.allDefeats = newState.allDefeats;
    if (newState.allVictories) mergedState.allVictories = newState.allVictories;
    if (newState.nextActions) mergedState.nextActions = newState.nextActions;
    if (newState.buildState) mergedState.buildState = newState.buildState;    
    if (newState.waitFor) mergedState.waitFor = newState.waitFor;
    if (newState.leftNeighbor) mergedState.leftNeighbor = newState.leftNeighbor;
    if (newState.rightNeighbor) mergedState.rightNeighbor = newState.rightNeighbor;
    if (newState.age) mergedState.age = newState.age;
    if (newState.buildCost != undefined) mergedState.buildCost = newState.buildCost;
    if (newState.options) {
      mergedState.options = newState.options;    
    }
    else {
      mergedState.options = null;
    }
    if (newState.allVictoryPoints) mergedState.allVictoryPoints = newState.allVictoryPoints;

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
      else if (newState.nextActions === "getEndOfAge"){
        this.finishAge();
      }
      else if (newState.nextActions === "finishGame"){
        this.finishGame();
      }
      else if (newState.nextActions === "start"){
        this.beginPlay();
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
    console.log("in wait");
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
  
  finishGame(){
    var myRequest = new Request(Utility.apiServer() + "/finishGame?playerId=" + this.getPlayerName() + "&gameName=" + this.getGameName());

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
    if (!gameState){
      splashScreen = <SplashScreen onGameStart={this.handleNewState} isGameActive={false} />;
    }

    let endScreen = null;
    //if (gameState && gameState.isGameOver) {
    //  endScreen = <EndScreen gameState={gameState} />;
    //}

    let defineGame = null;
    if (gameState && gameState.nextActions === "updateGame"){
      defineGame = <DefineGame gameName={this.getGameName()} playerName={this.getPlayerName()} onGameStart={this.handleNewState} />;
    }
    
    let victories = this.state.gameState ? this.state.gameState.victories : null;
    let defeats = this.state.gameState ? this.state.gameState.defeats : null;
    let actions = this.state.gameState ? this.state.gameState.nextActions : null;
    let options = this.state.gameState ? this.state.gameState.options : null;
    let waitFor = this.state.gameState ? this.state.gameState.waitFor : null;
    let allVictoryPoints = this.state.gameState ? this.state.gameState.allVictoryPoints : null;

    let ageCompletePopup = this.state.ageFinished ? <FinishAge age={this.state.gameState.age} victories={victories} defeats={defeats} allVictoryPoints={allVictoryPoints} startAge={this.startAge} playerName={this.getPlayerName()} gameName={this.getGameName()} endGame={this.endGame} /> : null;


    return (    
      <div>
        <Header />
        {splashScreen}
        {defineGame}
        {endScreen}
        
        <Waiting isWaiting={this.waitingInterval != null} waitFor={waitFor}></Waiting>
        {ageCompletePopup}
        <Choices options={options} action={actions} updateState={this.updateState} playerName={this.getPlayerName()} gameName={this.getGameName()} />

        <GameContainer gameState={gameState} handleAction={this.handleAction}/>
                
      </div>
    );
  }

}

export default WondersUi;

