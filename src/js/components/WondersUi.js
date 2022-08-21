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
import ChooseBoard from "./ChooseBoard";
import LeaderPopup from "./LeaderPopup";

class WondersUi extends Component {
  constructor(props) {
    super();

    this.handleNewState = this.handleNewState.bind(this);
    this.getOptions = this.getOptions.bind(this);
    this.beginPlay = this.beginPlay.bind(this);
    this.wait = this.wait.bind(this);
    this.startAge = this.startAge.bind(this);
    this.startAgeRequest = this.startAgeRequest.bind(this);
    this.finishAge = this.finishAge.bind(this);
    this.showLeaders = this.showLeaders.bind(this);
    this.handleAction = this.handleAction.bind(this);
    this.updateState = this.updateState.bind(this);
    this.listBoards = this.listBoards.bind(this);
    this.closePopup = this.closePopup.bind(this);
    this.listBoardsClearTimeout = this.listBoardsClearTimeout.bind(this);

    if (props && props.gameState){
      console.log("props found");
      this.state = {
        gameState: props.gameState,
        ageFinished: false,
        leaderPopup: props.gameState.leaderPopup
      };      
    }
    else {
      console.log('no props found');
      this.state = {
        gameState: null,
        ageFinished: false,
        boardList: null,
        boardSideAllowed: null,
        listBoardTimeout:null,
        lastAgeFinished: 1
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
    if (newState.boardHelp) mergedState.boardHelp = newState.boardHelp;
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
    if ('age' in newState) mergedState.age = newState.age;
    if (newState.buildCost != undefined) mergedState.buildCost = newState.buildCost;
    if (newState.options) {
      mergedState.options = newState.options;    
    }
    else {
      mergedState.options = null;
    }
    if (newState.allVictoryPoints) mergedState.allVictoryPoints = newState.allVictoryPoints;
    if (newState.newLeaders) mergedState.newLeaders = newState.newLeaders;
    if (newState.discards) mergedState.discards = newState.discards;

    this.setState({gameState: mergedState});
    if (!newState.boards) {
      this.setState({boardList:null});
      this.setState({boardSideAllowed:null});
    }

    console.log(newState.nextActions);
    if (newState.nextActions === "wait"){
      //if (!this.waitingInterval){
        console.log("waiting");
        this.startWaiting();
      //}
    }
    else {
      console.log("done waiting");
      //this.stopWaiting();
      if (newState.nextActions === "options"){
        this.getOptions();
      }
      else if (newState.nextActions === "getEndOfAge"){
        this.finishAge();
      }
      else if (newState.nextActions === "showLeaders"){
        this.showLeaders();
      }
      else if (newState.nextActions === "finishGame"){
        this.finishGame();
      }
      else if (newState.nextActions === "start"){
        this.beginPlay();
      }
      else if (newState.nextActions === "startAge" /*&& !this.state.ageFinished*/){ //TODO: this second condition is pretty fragile, relies on other code to set the finished state before calling updateState()
        this.startAgeRequest();
      }
      else if (newState.nextActions && newState.nextActions.indexOf("listBoards") >= 0 ){
        let t = setTimeout(() => this.listBoards(), 500);
        this.setState({listBoardTimeout:t});
      }      
    }
  }

  startWaiting(){
    setTimeout(() => {
        console.log("calling wait");
        this.wait();            
    }, 1000);
  }

  // stopWaiting(){
  //   clearInterval(this.waitingInterval);
  //   this.waitingInterval = null;
  // }

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

  //TODO: unify this with "options"?
  listBoards(){
        var myRequest = new Request(Utility.apiServer() + "/listBoards?playerId=" + this.getPlayerName() + "&gameName=" + this.getGameName());

        fetch(myRequest, Utility.getRequestInit())
        .then(res => res.json())
        .then((result) => {
            console.log(result);
            this.setState({boardList:result.boards, boardSideAllowed:result.sideAllowed});
            this.updateState(result);
        });
  }

  listBoardsClearTimeout() {
    clearTimeout(this.state.listBoardTimeout);
    this.setState({listBoardTimeout:null});
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
            this.setState({ageFinished:true, lastAgeFinished:result.age});            
            this.updateState(result);
        });
  }
  
  showLeaders(){
    var myRequest = new Request(Utility.apiServer() + "/showLeaders?playerId=" + this.getPlayerName() + "&gameName=" + this.getGameName());

    fetch(myRequest, Utility.getRequestInit())
    .then(res => res.json())
    .then((result) => {
        console.log(result);
        this.updateState(result);
        this.setState({leaderPopup:true});        
    });
}

finishGame(){
    var myRequest = new Request(Utility.apiServer() + "/finishGame?playerId=" + this.getPlayerName() + "&gameName=" + this.getGameName());

    fetch(myRequest, Utility.getRequestInit())
    .then(res => res.json())
    .then((result) => {
        console.log(result);
        this.setState({ageFinished:true, lastAgeFinished:result.age});
        this.updateState(result);
    });
  }

  startAgeRequest(){
    var myRequest = new Request(Utility.apiServer() + "/startAge?playerId=" + this.getPlayerName() + "&gameName=" + this.getGameName());

    fetch(myRequest, Utility.getRequestInit())
    .then(res => res.json())
    .then((result) => {
        console.log(result);
        this.startAge(result);
    });
}

  startAge(result){
    if (!result) {
      this.setState({ageFinished:false});
    }
    if (result) {
      this.updateState(result);
    }
  }

  closePopup() {
    this.setState({leaderPopup:false});
  }

  render() {
    
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

    let ageCompletePopup = this.state.ageFinished ? <FinishAge age={this.state.lastAgeFinished} victories={victories} defeats={defeats} allVictoryPoints={allVictoryPoints} startAge={this.startAge} playerName={this.getPlayerName()} gameName={this.getGameName()} endGame={this.endGame} /> : null;
    let tempDom = this.state.boardList != null ? <ChooseBoard timeoutClear={this.listBoardsClearTimeout} boardUses={this.state.boardList} currentBoard={this.state.gameState.boardName} currentSide={this.state.gameState.boardSide} onGameStart={this.handleNewState} playerName={this.getPlayerName()} gameName={this.getGameName()} boardSideAllowed={this.state.boardSideAllowed} /> : <GameContainer gameState={gameState} handleAction={this.handleAction}/>;
    console.log(this.state);
    let leaderPopup = this.state.leaderPopup ? <LeaderPopup close={this.closePopup} newLeaders={this.state.gameState.newLeaders} /> : null;

    return (    
      <div>
        <Header gameName={this.getGameName()} />
        {splashScreen}
        {defineGame}
        
        {endScreen}

        
        {ageCompletePopup}
        {leaderPopup}
        <Choices options={options} action={actions} updateState={this.updateState} playerName={this.getPlayerName()} gameName={this.getGameName()} />

        {tempDom}        
        <Waiting isWaiting={gameState && gameState.nextActions === "wait"} waitFor={waitFor}></Waiting>

      </div>
    );
  }

}

export default WondersUi;

