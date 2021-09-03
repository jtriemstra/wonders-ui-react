import React, { Component } from "react";
import ReactDOM from "react-dom";
import Utility from "../Utility";
import HandCard from "./HandCard";

class Hand extends Component {
    constructor() {
      super();      
      this.handleAction = this.handleAction.bind(this);
      this.handleToggle = this.handleToggle.bind(this);
      this.state = {visible:true};
    }

    handleAction(result){
        this.props.handleAction(result);
    }

    handleToggle(){
      this.setState({visible:!this.state.visible});
    }

    render() {
        var result = [];
        let handPassDirection = this.props.currentAge % 2 == 0 ? "<==" : "==>";
        let toggleHandText = this.state.visible ? "Hide Hand" : "Show Hand";

        if (this.props.cards){
          
          for (var i=0; i<this.props.cards.length; i++){
            var card = this.props.cards[i];
            result.push(<HandCard card={card} canBuild={this.props.canBuild} handleAction={this.handleAction} actions={this.props.actions} buildCost={this.props.buildCost} />);
          }
        }
        return (<div className={"card-set-container1 " + (this.state.visible ? "" : " hand-hidden")}>
                   
                    <div className="card-set">
                        <ul className="card-set-active">{result}</ul>
                    </div>
                    <a onClick={this.handleToggle} className="hand-toggle">{toggleHandText}</a>
                    <h2 class="hand-pass-direction">{handPassDirection}</h2>
                </div>);
    }
}

export default Hand;