import React, { Component } from "react";
import ReactDOM from "react-dom";
import Tray from "./Tray";
import Hand from "./Hand";
import Board from "./Board2";
import NeighborCards from "./NeighborCards"
import Notifications from "./Notifications"
import GameControls from "./GameControls"

class GameContainer extends Component {
    constructor(props) {
        super(props);   
        
        this.handleAction = this.handleAction.bind(this);
        this.handleNeighborUpdate = this.handleNeighborUpdate.bind(this);
        this.state = {neighborOpen:[false,false],
                    faded:false};
    }

    handleAction(newState){
        this.props.handleAction(newState);
    }
    
    handleNeighborUpdate(isOpen, isRight){
        let oldState = this.state.neighborOpen;
        oldState[(isRight ? 1 : 0)] = isOpen;
        this.setState({
            faded:(oldState[0] || oldState[1]),
            neighborOpen:oldState 
        });
    }

    render(){
        //TODO: find a better location for this reference
        if (!this.props.gameState || this.props.gameState.nextActions === "updateGame") {
            return null;
        }

        let canBuild = this.props.gameState.nextActions && this.props.gameState.nextActions.indexOf("build") >= 0;
        let board = this.props.gameState.boardName;
        let boardSide = this.props.gameState.boardSide;
        let buildState = this.props.gameState.buildState;
        let cards = this.props.gameState.cards;
        let boardCards = this.props.gameState.cardsOnBoard;
        let actions = this.props.gameState.nextActions;    
        let leftNeighbor = this.props.gameState.leftNeighbor;
        let rightNeighbor = this.props.gameState.rightNeighbor;
        let buildCost = this.props.gameState.buildCost;
        console.log(buildCost);

        return (
            <div id="game-container">
                <NeighborCards data={leftNeighbor} right={false} updateNeighbor={this.handleNeighborUpdate} />
                <NeighborCards data={rightNeighbor} right={true} updateNeighbor={this.handleNeighborUpdate} />
                <Board cards={boardCards} board={board} buildState={buildState} boardSide={boardSide} faded={this.state.faded} gameState={this.props.gameState} />
                <Hand cards={cards} canBuild={canBuild} handleAction={this.handleAction} actions={actions} buildCost={buildCost} currentAge={this.props.gameState.age} />
                <GameControls discards={this.props.gameState.discards} />
                <Notifications />
            </div>
        );
        
    }
}

export default GameContainer;