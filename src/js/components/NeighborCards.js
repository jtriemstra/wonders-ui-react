import React, { Component } from "react";
import ReactDOM from "react-dom";
import CardImage from "../CardImage";
import BoardImage from "../BoardImage";

class NeighborCards extends Component {
    constructor() {
      super();      
      
      this.state = {
          expandNeighbor:false
      }

      this.toggleExpanded = this.toggleExpanded.bind(this);
    }

    toggleExpanded() {
        let oldState = this.state.expandNeighbor;
        this.setState({expandNeighbor:!oldState});
        this.props.updateNeighbor(!oldState, this.props.right);
    }

    render() {
        if (!this.props.data) return null;

        let cards = <></>;
        for (var i=0; i<this.props.data.cardsOnBoard.length; i++){
            cards = <div class="card-wrapper"><img src={"images/cards/" + CardImage.getImage(this.props.data.cardsOnBoard[i])}  />{cards}</div>;
        }
        cards = <div class="card-wrapper">
                    <img className="board-resource" src={"images/resources/" + BoardImage.getResourceImage(this.props.data.boardResource, this.props.data.boardName, this.props.data.boardSide)} />
                    <img className="board-resource" src={"images/icons/pyramid-stage" + this.props.data.stagesBuilt + ".png"} />
                    {cards}                        
                </div>;
        return (
            <div className={"neighbor " + (this.props.right ? " neighbor-right " : "") + (this.state.expandNeighbor ? " neighbor-expand " : "") }>
                <div class="neighbor-name">
                    <a onClick={this.toggleExpanded}>{this.props.data.name}</a>
                    <img className="neighbor-board" src={"images/boards/" + BoardImage.getImage(this.props.data.boardName, this.props.data.boardSide)} /> 
                </div>
                 
                {cards}
                          
            </div>
        );
    }
}

export default NeighborCards;