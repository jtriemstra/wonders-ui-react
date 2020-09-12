import React, { Component } from "react";
import Utility from "../Utility";

class EndScreen extends Component {
    constructor(props) {
        super(props);
        
        this.handleEndGame = this.handleEndGame.bind(this);
        
    }

    handleEndGame(e) {
        if (e) e.preventDefault();

        fetch(Utility.apiServer() + "/end")
        .then(res => {
            if (res.ok) { return true; }
            else { res.text().then(text => {
                console.error(text);
              });               
            }
        })
        .then((result) => {
            if (result){
                document.cookie = "playerName=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                window.location.reload();
            }
        });
    }

    renderCards(cards){
        let result = "";
        for(var cardName in cards){
            result = result + cardName + ":" + cards[cardName] + "; ";
        }
        return result;
    }

    render() {
        return (
            <div className="end-screen">
                <div className="end-screen-content">
                    <h2>Game Over</h2>
                    <p>You have {this.props.gameState.points} points</p>
                    <p>{this.renderCards(this.props.gameState.cards)}</p>
                    <button onClick={this.handleEndGame}>End Game</button>
                </div>
            </div>
        );
    }
}

export default EndScreen;