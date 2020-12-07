import React, { Component } from "react";
import ReactDOM from "react-dom";
import CardImage from "../CardImage";
import BoardImage from "../BoardImage";

class NeighborCards extends Component {
    constructor() {
      super();      
      //TODO: add neighbor name
    }

    render() {
        if (!this.props.data) return null;

        let cards = <></>;
        for (var i=0; i<this.props.data.cardsOnBoard.length; i++){
            cards = <div class="card-wrapper"><img src={"images/cards/" + CardImage.getImage(this.props.data.cardsOnBoard[i])}  />{cards}</div>;
        }
        cards = <div class="card-wrapper">
                    <img className="board-resource" src={"images/resources/" + BoardImage.getResourceImage(this.props.data.boardResource)} />
                    <img className="board-resource" src={"images/icons/pyramid-stage" + this.props.data.stagesBuilt + ".png"} />
                    {cards}
                </div>;
        return (
            <div class={this.props.right ? "neighbor neighbor-right" : "neighbor"}>
                <div class="neighbor-name">
                    {this.props.data.name}
                </div>
                {cards}                
            </div>
        );
    }
}

export default NeighborCards;