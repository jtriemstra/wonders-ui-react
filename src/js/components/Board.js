import React, { Component } from "react";
import ReactDOM from "react-dom";
import CardImage from "../CardImage";
import BoardImage from "../BoardImage";


class Board extends Component {
    constructor() {
      super();
    }

    wrapElement(children) {
        return (<div className="board-element">{children}</div>);
    }

    render() {
        let board = this.props.board || {};
        let boardSide = this.props.boardSide || {};
        let builtStages = [];
        console.log(this.props.buildState);
        if (this.props.buildState){
            for (var i=0; i<this.props.buildState.length; i++){
                if (this.props.buildState[i] > 0){
                    builtStages.push(<img className="board-stage-img" src={"images/age" + this.props.buildState[i] + ".png"} />);
                }
            }
        }

        let resources = <><img className="board-background" src={"images/boards/" + BoardImage.getImage(board, boardSide)} /><div className="board-stages">{builtStages}</div></>;
        let commerce, science, army, victory, guild = null;
        let marginBottom = '0px';

        if (this.props.cards){
            let cardCounts = [0,0,0,0,0,0];
          for (var i=0; i<this.props.cards.length; i++){
            let card = this.props.cards[i];
            if (card.type === "resource"){
                cardCounts[0] = cardCounts[0] + 1;
                resources = <><img className="board-card" src={"images/cards/" + CardImage.getImage(card.name)} />{this.wrapElement(resources)}</>;
            }
            else if (card.type === "commerce") {
                cardCounts[1] = cardCounts[1] + 1;
                commerce = <><img className="board-card" src={"images/cards/" + CardImage.getImage(card.name)} />{this.wrapElement(commerce)}</>;
            }
            else if (card.type === "victory") {
                cardCounts[2] = cardCounts[2] + 1;
                victory = <><img className="board-card" src={"images/cards/" + CardImage.getImage(card.name)} />{this.wrapElement(victory)}</>;
            }
            else if (card.type === "army") {
                cardCounts[3] = cardCounts[3] + 1;
                army = <><img className="board-card" src={"images/cards/" + CardImage.getImage(card.name)} />{this.wrapElement(army)}</>;
            }
            else if (card.type === "science") {
                cardCounts[4] = cardCounts[4] + 1;
                science = <><img className="board-card" src={"images/cards/" + CardImage.getImage(card.name)} />{this.wrapElement(science)}</>;
            }
            else if (card.type === "guild") {
                cardCounts[5] = cardCounts[5] + 1;
                guild = <><img className="board-card" src={"images/cards/" + CardImage.getImage(card.name)} />{this.wrapElement(guild)}</>;
            }
          }

          let maxStackCount = 0;
          for (var i=0; i<cardCounts.length; i++){
            if (cardCounts[i] > maxStackCount){
                maxStackCount = cardCounts[i];
            }
          }

          if (cardCounts[0] < maxStackCount){
            for (var i=0; i<maxStackCount - cardCounts[0]; i++){
                resources = <><img className="board-card" src="images/transparent.png" />{this.wrapElement(resources)}</>;
            }
          }
          if (cardCounts[1] < maxStackCount){
            for (var i=0; i<maxStackCount - cardCounts[1]; i++){
                commerce = <><img className="board-card" src="images/transparent.png" />{this.wrapElement(commerce)}</>;
            }
          }
          if (cardCounts[2] < maxStackCount){
            for (var i=0; i<maxStackCount - cardCounts[2]; i++){
                victory = <><img className="board-card" src="images/transparent.png" />{this.wrapElement(victory)}</>;
            }
          }
          if (cardCounts[3] < maxStackCount){
            for (var i=0; i<maxStackCount - cardCounts[3]; i++){
                army = <><img className="board-card" src="images/transparent.png" />{this.wrapElement(army)}</>;
            }
          }
          if (cardCounts[4] < maxStackCount){
            for (var i=0; i<maxStackCount - cardCounts[4]; i++){
                science = <><img className="board-card" src="images/transparent.png" />{this.wrapElement(science)}</>;
            }
          }
          if (cardCounts[5] < maxStackCount){
            for (var i=0; i<maxStackCount - cardCounts[5]; i++){
                guild = <><img className="board-card" src="images/transparent.png" />{this.wrapElement(guild)}</>;
            }
          }

          marginBottom = '' + (61 * maxStackCount) + 'px';
        }
        
        return (
                <div className="board-container" style={{'margin-bottom':marginBottom}}>
                    <div class="board-stack">{resources}</div>
                    <div class="board-stack">{commerce}</div>
                    <div class="board-stack">{victory}</div>
                    <div class="board-stack">{army}</div>
                    <div class="board-stack">{science}</div>
                    <div class="board-stack">{guild}</div>
                </div>);
    }

    
}

export default Board;