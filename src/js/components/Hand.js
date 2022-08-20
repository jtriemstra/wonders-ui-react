import React, { Component } from "react";
import ReactDOM from "react-dom";
import Utility from "../Utility";
import HandCard from "./HandCard";

class Hand extends Component {
    constructor() {
      super();      
      this.handleAction = this.handleAction.bind(this);
      this.handleToggle = this.handleToggle.bind(this);
      this.disableOtherCards = this.disableOtherCards.bind(this);
      this.state = {visible:true, enabledCardIndex:-1};
    }

    handleAction(result){
        this.props.handleAction(result);
        this.setState({enabledCardIndex:-1});
    }

    handleToggle(){
      this.setState({visible:!this.state.visible});
    }
    
    disableOtherCards(enabledCardIndex) {
		this.setState({enabledCardIndex:enabledCardIndex});			
	}

    render() {
        var result = [];
        let handPassDirection = this.props.currentAge % 2 == 0 ? "<== Pass Cards" : "Pass Cards ==>";
        let toggleHandText = this.state.visible ? <>Hide<br></br> Hand</> : <>Show<br></br>Hand</>;

        if (this.props.cards){
          console.log(this.state.enabledCardIndex);
          for (var i=0; i<this.props.cards.length; i++){
            var card = this.props.cards[i];
            result.push(<HandCard card={card} canBuild={this.props.canBuild} handleAction={this.handleAction} actions={this.props.actions} buildCost={this.props.buildCost} handIndex={i} handleCostOptions={this.disableOtherCards} enableButtons={this.state.enabledCardIndex == -1 || this.state.enabledCardIndex == i} />);
          }
        }
        // toggle hidden for now, current styles for hand make it pointless
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