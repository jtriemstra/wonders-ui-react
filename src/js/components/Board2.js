import React, { Component } from "react";
import ReactDOM from "react-dom";
import CardImage from "../CardImage";
import BoardImage from "../BoardImage";


class Board2 extends Component {
    constructor() {
      super();
    }

    wrapElement(children) {
        return (<div className="board-element">{children}</div>);
    }

    horizontalOffset(numCards) {
        return -22 + -14 * (numCards - 1);
    }

    render() {
        let board = this.props.board || {};
        let boardSide = this.props.boardSide || {};
        let builtStages = [];
        
        if (this.props.buildState){
            for (var i=0; i<this.props.buildState.length; i++){
                if (this.props.buildState[i] && this.props.buildState[i] != ""){
                    builtStages.push(<img className="board-stage-img" src={"images/age" + this.props.buildState[i] + ".png"} />);
                }
            }
        }

        let resources = <></>;
        let commerce, science, army, victory, guild = null;
        let marginTop = '0px';
        let marginLeft = '0px';
        let specialClass = "";
        if (board === "Rhodes" && boardSide === "B") {
            specialClass = "two-stage-board";
        }
        else if (board === "Giza" && boardSide === "B") {
            specialClass = "four-stage-board";
        }
        if (this.props.faded){
            specialClass = specialClass + " board-container-faded"
        }

        if (this.props.cards){
            let cardCounts = [0,0,0,0,0,0];
          for (var i=0; i<this.props.cards.length; i++){
            let card = this.props.cards[i];
            if (card.type === "resource"){
                cardCounts[0] = cardCounts[0] + 1;
                let marginTop = '' + -31 * cardCounts[0] + '%';
                let marginLeft = '' + this.horizontalOffset(cardCounts[0]) + '%';
                resources = <>{resources}<div className="board-element" style={{'margin-top':marginTop, 'margin-left':marginLeft, 'zIndex':-1 * cardCounts[0]}}><img className="board-card" src={"images/cards/" + CardImage.getImage(card.name)} /></div></>;
            }
            else if (card.type === "commerce") {
                cardCounts[1] = cardCounts[1] + 1;
                let marginTop = '' + -30 * cardCounts[1] + '%';
                let marginLeft = '' + this.horizontalOffset(cardCounts[1]) + '%';
                commerce = <>{commerce}<div className="board-element" style={{'margin-top':marginTop, 'margin-left':marginLeft, 'zIndex':-1 * cardCounts[1]}}><img className="board-card" src={"images/cards/" + CardImage.getImage(card.name)} /></div></>;
            }
            else if (card.type === "victory") {
                cardCounts[2] = cardCounts[2] + 1;
                let marginTop = '' + -30 * cardCounts[2] + '%';
                let marginLeft = '' + this.horizontalOffset(cardCounts[2])  + '%';
                victory = <>{victory}<div className="board-element" style={{'margin-top':marginTop, 'margin-left':marginLeft, 'zIndex':-1 * cardCounts[2]}}><img className="board-card" src={"images/cards/" + CardImage.getImage(card.name)} /></div></>;
            }
            else if (card.type === "army") {
                cardCounts[3] = cardCounts[3] + 1;
                let marginTop = '' + -30 * cardCounts[3] + '%';
                let marginLeft = '' + this.horizontalOffset(cardCounts[3])  + '%';
                army = <>{army}<div className="board-element" style={{'margin-top':marginTop, 'margin-left':marginLeft, 'zIndex':-1 * cardCounts[3]}}><img className="board-card" src={"images/cards/" + CardImage.getImage(card.name)} /></div></>;
            }
            else if (card.type === "science") {
                cardCounts[4] = cardCounts[4] + 1;
                let marginTop = '' + -30 * cardCounts[4] + '%';
                let marginLeft = '' + this.horizontalOffset(cardCounts[4])  + '%';
                science = <>{science}<div className="board-element" style={{'margin-top':marginTop, 'margin-left':marginLeft, 'zIndex':-1 * cardCounts[4]}}><img className="board-card" src={"images/cards/" + CardImage.getImage(card.name)} /></div></>;
            }
          }

          for (var i=0; i<this.props.cards.length; i++){
            let card = this.props.cards[i];
            if (card.type === "guild") {
                cardCounts[3] = cardCounts[3] + 1;
                let marginTop = '' + -30 * cardCounts[3] + '%';
                let marginLeft = '' + this.horizontalOffset(cardCounts[3]) + '%';
                army = <>{army}<div className="board-element" style={{'margin-top':marginTop, 'margin-left':marginLeft, 'zIndex':-1 * cardCounts[3]}}><img className="board-card" src={"images/cards/" + CardImage.getImage(card.name)} /></div></>;
            }
            else if (card.type === "leader") {
                cardCounts[1] = cardCounts[1] + 1;
                let marginTop = '' + -30 * cardCounts[1] + '%';
                let marginLeft = '' + this.horizontalOffset(cardCounts[1]) + '%';
                commerce = <>{commerce}<div className="board-element" style={{'margin-top':marginTop, 'margin-left':marginLeft, 'zIndex':-1 * cardCounts[1]}}><img className="board-card" src={"images/cards/" + CardImage.getImage(card.name)} /></div></>;
            }
          }

          marginTop = '' + (61 * Math.max(...cardCounts)) + 'px';
          marginLeft = '' + (15 + cardCounts[0] - 1) + '%';
        }
        
        return (
                <div className={"board-container " + specialClass} style={{'margin-top':marginTop, 'margin-left':marginLeft}}>
                  <div class="board-stack" style={{'top':'0px','left':'0px'}}>{resources}</div>
                  <div class="board-stack" style={{'top':'0px','left':'20%'}}>{commerce}</div>
                  <div class="board-stack" style={{'top':'0px','left':'40%'}}>{victory}</div>
                  <div class="board-stack" style={{'top':'0px','left':'60%'}}>{science}</div>
                  <div class="board-stack" style={{'top':'0px','left':'80%'}}>{army}</div>
                  <img className="board-background" src={"images/boards/" + BoardImage.getImage(board, boardSide)} />
                  <div className="board-stages"><div className="dummy-stage"></div>{builtStages}</div>                    
                </div>);
    }

    
}

export default Board2;