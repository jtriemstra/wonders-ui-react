import React, { Component } from "react";
import ReactDOM from "react-dom";
import Utility from "../Utility";
import HandCard from "./HandCard";

class Hand extends Component {
    constructor() {
      super();      
      this.handleAction = this.handleAction.bind(this);
    }

    handleAction(result){
        this.props.handleAction(result);
    }

    render() {
        var result = [];
        

        if (this.props.cards){
          for (var i=0; i<this.props.cards.length; i++){
            var card = this.props.cards[i];
            result.push(<HandCard card={card} canBuild={this.props.canBuild} handleAction={this.handleAction} actions={this.props.actions} />);
          }
        }
        return (<div className="card-set-container1">
                   
                    <div className="card-set">
                        <ul className="card-set-active">{result}</ul>
                        <h2>Hand</h2>
                    </div>
                </div>);
    }
}

export default Hand;