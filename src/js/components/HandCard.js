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

        if (costOptions != null && costOptions.length > 0) {
            this.setState({"cardCostOptions":costOptions, "costMode":"build"});
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
                    if (card.costOptions[i].left + card.costOptions[i].right < minCost) minCost = card.costOptions[i].left + card.costOptions[i].right;
                    if (card.costOptions[i].left + card.costOptions[i].right > maxCost) maxCost = card.costOptions[i].left + card.costOptions[i].right;
                }
                cardCostDisplay = "" + minCost + " - " + maxCost;
            }
            else {
                cardCostDisplay = card.cost;
            }

            let buildCostDisplay = "";
            let buildCost=this.props.buildCost;
            if (buildCost) {
                if (buildCost.costOptions && buildCost.costOptions.length > 0) {
                    let minCost = 100;
                    let maxCost = -1;
                    for (var i=0; i<buildCost.costOptions.length; i++) {
                        if (buildCost.costOptions[i].left + buildCost.costOptions[i].right < minCost) minCost = buildCost.costOptions[i].left + buildCost.costOptions[i].right;
                        if (buildCost.costOptions[i].left + buildCost.costOptions[i].right > maxCost) maxCost = buildCost.costOptions[i].left + buildCost.costOptions[i].right;
                    }
                    buildCostDisplay = "" + minCost + " - " + maxCost;
                }
                else {
                    buildCostDisplay = buildCost.cost;
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
            if (this.props.canBuild && actions.indexOf('build') > -1){
                buttons.push(<button onClick={(event) => this.handleBuild(event, buildCost.costOptions)} data-cardname={card.card.name}>Build ({buildCostDisplay})</button>);
                buttons.push(<br/>);
            }
            if (actions.indexOf('discard') > -1){
                buttons.push(<button onClick={this.handleDiscard} data-cardname={card.card.name}>Discard</button>);
            }
            if (actions.indexOf('keepLeader') > -1){
                buttons.push(<button onClick={this.handleKeepLeader} data-cardname={card.card.name}>Keep</button>);
            }
        }    
        else if (this.state.costMode === "play") {
            for (var i=0; i<this.state.cardCostOptions.length; i++){
                let costDisplay = "<- " + this.state.cardCostOptions[i].left + " | " + this.state.cardCostOptions[i].right + " ->";
                let thisIndex = i;
                buttons.push(<button onClick={(event) => this.handlePlay(event, null, thisIndex)} data-cardname={card.card.name}>{costDisplay}</button>);
                buttons.push(<br/>);
            }
        }   
        else if (this.state.costMode === "build") {
            for (var i=0; i<this.state.cardCostOptions.length; i++){
                let costDisplay = "<- " + this.state.cardCostOptions[i].left + " | " + this.state.cardCostOptions[i].right + " ->";
                let thisIndex = i;
                buttons.push(<button onClick={(event) => this.handleBuild(event, null, thisIndex)} data-cardname={card.card.name}>{costDisplay}</button>);
                buttons.push(<br/>);
            }
        }
        var cardClass = card.status === "OK" ? "card-playable" : "card-unplayable";
        return (
            <li className={cardClass + " card"}>
                <div class="button-container">{buttons}</div>
                <img src={"images/cards/" + CardImage.getImage(card.card.name)} />                
            </li>
        )
    }
}

export default HandCard;