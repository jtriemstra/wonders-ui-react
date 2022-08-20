import React, { Component } from "react";
import ReactDOM from "react-dom";
import Utility from "../Utility"
import CardImage from "../CardImage";

class HandCard extends Component {
    constructor() {
      super();      
      
      this.handlePlay = this.handlePlay.bind(this);
      this.handlePlayFree = this.handlePlayFree.bind(this);
      this.handleBuild = this.handleBuild.bind(this);
      this.handleDiscard = this.handleDiscard.bind(this);
      this.handleKeepLeader = this.handleKeepLeader.bind(this);
      this.handleTradeCancel = this.handleTradeCancel.bind(this);

      this.state = {cardCostOptions:null, costMode:null};
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

    handlePlay(event, costOptions, costIndex){
        //TODO: allow "undoing" an action if other players are still thinking
        event.preventDefault();

        if (costOptions != null && costOptions.length > 0) {
            this.setState({"cardCostOptions":costOptions, "costMode":"play"});
            this.props.handleCostOptions(this.props.handIndex);
            return;
        }
        
        if (!window.confirm("Do you want to play this card?")) {
			return;
		}

        let costIndexParam = (costIndex != null) ? "&tradingInfo.playableIndex=" + costIndex : "";        
        this.setState({"cardCostOptions":null, "costMode":null});

        fetch(Utility.apiServer() + "/play?playerId=" + this.getPlayerName() + "&gameName=" + this.getGameName() + costIndexParam + "&cardName=" + event.target.dataset.cardname)
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
                this.props.handleAction(result);
            }
        });
    }

    handlePlayFree(event){
        event.preventDefault();

		if (!window.confirm("Do you want to play this card?")) {
			return;
		}
		
        fetch(Utility.apiServer() + "/playFree?playerId=" + this.getPlayerName() + "&gameName=" + this.getGameName() + "&cardName=" + event.target.dataset.cardname)
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
                this.props.handleAction(result);
            }
        });
    }

    handleDiscard(event){
        event.preventDefault();
        
        if (!window.confirm("Do you want to discard this card?")) {
			return;
		}

        fetch(Utility.apiServer() + "/discard?playerId=" + this.getPlayerName() + "&gameName=" + this.getGameName() + "&cardName=" + event.target.dataset.cardname)
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
                this.props.handleAction(result);
            }
        });
    }

    handleKeepLeader(event){
        event.preventDefault();
        
        if (!window.confirm("Do you want to keep this card?")) {
			return;
		}

        fetch(Utility.apiServer() + "/keepLeader?playerId=" + this.getPlayerName() + "&gameName=" + this.getGameName() + "&cardName=" + event.target.dataset.cardname)
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
                this.props.handleAction(result);
            }
        });
    }

    handleBuild(event, costOptions, costIndex){
        event.preventDefault();
        
        if (!window.confirm("Do you want to use this card to build the next stage?")) {
			return;
		}

        if (costOptions != null && costOptions.length > 0) {
            this.setState({"cardCostOptions":costOptions, "costMode":"build"});
            this.props.handleCostOptions(this.props.handIndex);
            return;
        }

        let costIndexParam = (costIndex != null) ? "&tradingInfo.playableIndex=" + costIndex : "";        
        this.setState({"cardCostOptions":null, "costMode":null});

        fetch(Utility.apiServer() + "/build?playerId=" + this.getPlayerName() + "&gameName=" + this.getGameName() + costIndexParam + "&cardName=" + event.target.dataset.cardname)
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
                this.props.handleAction(result);
            }
        });
    }
    
    handleTradeCancel(event) {
		event.preventDefault();
		
		this.setState({"cardCostOptions":null, "costMode":null});
		this.props.handleCostOptions(-1);
	}

    render() {
        var card = this.props.card;
        var buttons = [];
        var actions = this.props.actions;
        
        if (!this.state.cardCostOptions) {
            let cardCostDisplay = "";
            if (card.costOptions && card.costOptions.length > 0) {
                let minCost = 100;
                let maxCost = -1;
                for (var i=0; i<card.costOptions.length; i++) {
                    let thisCost = (card.costOptions[i].knownCostsBySource.Left ? card.costOptions[i].knownCostsBySource.Left : 0) + (card.costOptions[i].knownCostsBySource.Right ? card.costOptions[i].knownCostsBySource.Right : 0);
                    if (thisCost < minCost) minCost = thisCost;
                    if (thisCost > maxCost) maxCost = thisCost;
                }
                if (minCost === maxCost) {
					cardCostDisplay = "" + minCost;
				}
				else {
					cardCostDisplay = "" + minCost + " - " + maxCost;	
				}
            }
            else {
                cardCostDisplay = card.bankCost;
            }

            let buildCostDisplay = "";
            let buildCost=this.props.buildCost;
            if (buildCost) {
                if (buildCost.costOptions && buildCost.costOptions.length > 0) {
                    let minCost = 100;
                    let maxCost = -1;
                    for (var i=0; i<buildCost.costOptions.length; i++) {
                        let thisCost = (buildCost.costOptions[i].knownCostsBySource.Left ? buildCost.costOptions[i].knownCostsBySource.Left : 0) + (buildCost.costOptions[i].knownCostsBySource.Right ? buildCost.costOptions[i].knownCostsBySource.Right : 0);
                        if (thisCost < minCost) minCost = thisCost;
                        if (thisCost > maxCost) maxCost = thisCost;
                    }
                    if (minCost === maxCost) {
						buildCostDisplay = "" + minCost;
					}
					else {
						buildCostDisplay = "" + minCost + " - " + maxCost;	
					}
                }
                else {
                    buildCostDisplay = buildCost.stage.coinCost;
                }
            }
            //TODO: how can I make this more dynamic? make playFree act like play from the FE perspective?
            if (card.status != "ERR_DUPLICATE" && actions.indexOf('playFree') > -1){
                buttons.push(<button onClick={this.handlePlayFree} data-cardname={card.card.name}>Play for Free</button>);
                buttons.push(<br/>);
            }
            if (card.status === "OK" && actions.indexOf('play') > -1 && actions.indexOf('play') != actions.indexOf('playFree')){
                buttons.push(<button onClick={(event) => this.handlePlay(event, card.costOptions)} data-cardname={card.card.name}>Play ({cardCostDisplay})</button>);
                buttons.push(<br/>);
            }
            else if (actions.indexOf('play') > -1 && actions.indexOf('play') != actions.indexOf('playFree')){
                buttons.push(<button className="invalid-action" data-cardname={card.card.name}>())</button>);
                buttons.push(<br/>);
            }
            if (this.props.canBuild && actions.indexOf('build') > -1){
                buttons.push(<button onClick={(event) => this.handleBuild(event, buildCost.costOptions)} data-cardname={card.card.name}>Build ({buildCostDisplay})</button>);
                buttons.push(<br/>);
            }
            else if (actions.indexOf('discard') > -1) {
                buttons.push(<button className="invalid-action" data-cardname={card.card.name}>()</button>);
                buttons.push(<br/>);
            }
            if (actions.indexOf('discard') > -1){
                buttons.push(<button onClick={this.handleDiscard} data-cardname={card.card.name}>Discard</button>);
            }
            if (card.status === "OK" && actions.indexOf('keepLeader') > -1){
                buttons.push(<button onClick={this.handleKeepLeader} data-cardname={card.card.name}>Keep</button>);
            }
        }    
        else if (this.state.costMode === "play") {
            for (var i=0; i<this.state.cardCostOptions.length; i++){
                let leftCost = this.state.cardCostOptions[i].knownCostsBySource.Left ? this.state.cardCostOptions[i].knownCostsBySource.Left : 0;
                let rightCost = this.state.cardCostOptions[i].knownCostsBySource.Right ? this.state.cardCostOptions[i].knownCostsBySource.Right : 0;
                let costDisplay = "<- " + leftCost + " | " + rightCost + " ->";
                let thisIndex = i;
                buttons.push(<button onClick={(event) => this.handlePlay(event, null, thisIndex)} data-cardname={card.card.name}>{costDisplay}</button>);
                buttons.push(<br/>);
            }
            buttons.push(<button onClick={this.handleTradeCancel}>Cancel</button>);
        }   
        else if (this.state.costMode === "build") {
            for (var i=0; i<this.state.cardCostOptions.length; i++){
                let leftCost = this.state.cardCostOptions[i].knownCostsBySource.Left ? this.state.cardCostOptions[i].knownCostsBySource.Left : 0;
                let rightCost = this.state.cardCostOptions[i].knownCostsBySource.Right ? this.state.cardCostOptions[i].knownCostsBySource.Right : 0;
                let costDisplay = "<- " + leftCost + " | " + rightCost + " ->";
                let thisIndex = i;
                buttons.push(<button onClick={(event) => this.handleBuild(event, null, thisIndex)} data-cardname={card.card.name}>{costDisplay}</button>);
                buttons.push(<br/>);
            }
            buttons.push(<button onClick={this.handleTradeCancel}>Cancel</button>);
        }
        var cardClass = card.status === "OK" ? "card-playable" : "card-unplayable";
        return (
            <li className={cardClass + " card"}>
                <div class="button-container">{this.props.enableButtons ? buttons : ""}</div>
                <img src={"images/cards/" + CardImage.getImage(card.card.name)} />   
                <p class="card-help">
                	{card.card.help}
                </p>             
            </li>
        )
    }
}

export default HandCard;