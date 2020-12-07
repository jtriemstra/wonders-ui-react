import React, { Component } from "react";
import ReactDOM from "react-dom";
import Tray from "./Tray";
import Hand from "./Hand";
import Board from "./Board2";
import NeighborCards from "./NeighborCards"

class GameContainer extends Component {
    constructor(props) {
        super(props);   
        
        this.handleAction = this.handleAction.bind(this);
    }

    handleAction(newState){
        this.props.handleAction(newState);
    }

    render(){
        //TODO: find a better location for this reference
        if (!this.props.gameState || this.props.gameState.nextActions === "updateGame") {
            return null;
        }

        let canBuild = this.props.gameState.nextActions.indexOf("build") >= 0;
        let board = this.props.gameState.boardName;
        let boardSide = this.props.gameState.boardSide;
        let buildState = this.props.gameState.buildState;
        let cards = this.props.gameState.cards;
        let boardCards = this.props.gameState.cardsOnBoard;
        let coins = this.props.gameState.coins;
        let victories = this.props.gameState.allVictories;
        let defeats = this.props.gameState.allDefeats;
        let actions = this.props.gameState.nextActions;    
        let leftNeighbor = this.props.gameState.leftNeighbor;
        let rightNeighbor = this.props.gameState.rightNeighbor;
        let buildCost = this.props.gameState.buildCost;
        console.log(buildCost);

        return (
            <div>
                <Tray allVictories={victories} allDefeats={defeats} coins={coins} />
                <NeighborCards data={leftNeighbor} right={false} />
                <Board cards={boardCards} board={board} buildState={buildState} boardSide={boardSide} />
                <Hand cards={cards} canBuild={canBuild} handleAction={this.handleAction} actions={actions} buildCost={buildCost} currentAge={this.props.gameState.age} />
                <NeighborCards data={rightNeighbor} right={true} />
            </div>
        );
        
    }
}

export default GameContainer;