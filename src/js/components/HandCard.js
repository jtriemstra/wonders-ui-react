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

    handlePlay(event){
        event.preventDefault();

        fetch(Utility.apiServer() + "/play?playerId=" + this.getPlayerName() + "&gameName=" + this.getGameName() + "&cardName=" + event.target.dataset.cardname)
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

    handleBuild(event){
        event.preventDefault();

        fetch(Utility.apiServer() + "/build?playerId=" + this.getPlayerName() + "&gameName=" + this.getGameName() + "&cardName=" + event.target.dataset.cardname)
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

        //TODO: how can I make this more dynamic? make playFree act like play from the FE perspective?
        if (card.status != "ERR_DUPLICATE" && actions.indexOf('playFree') > -1){
            buttons.push(<button onClick={this.handlePlayFree} data-cardname={card.card.name}>Play for Free</button>);
            buttons.push(<br/>);
        }
        if (card.status === "OK" && actions.indexOf('play') > -1 && actions.indexOf('play') != actions.indexOf('playFree')){
            buttons.push(<button onClick={this.handlePlay} data-cardname={card.card.name}>Play ({card.cost})</button>);
            buttons.push(<br/>);
        }
        if (this.props.canBuild && actions.indexOf('build') > -1){
            buttons.push(<button onClick={this.handleBuild} data-cardname={card.card.name}>Use to Build</button>);
            buttons.push(<br/>);
        }
        if (actions.indexOf('discard') > -1){
            buttons.push(<button onClick={this.handleDiscard} data-cardname={card.card.name}>Discard</button>);
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