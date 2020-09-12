import React, { Component } from "react";
import ReactDOM from "react-dom";
import CardSet from './CardSet'

class Bank extends CardSet {
    //TODO: look into a way to pass a "renderer" to CardSet instead of inheriting?
    constructor(props) {
        super(props);
    }

    renderInactiveCards(){
        return this.props.cards.map((bankcard) => <li><img width="160px" src={this.getCardImageByName(bankcard.card.name)} /><span className="bank-quantity">{bankcard.quantity} left</span></li>);
    }

    renderActiveCards(){
        if (this.props.activeTest){
            return this.props.cards.map((bankcard) => {
                if (this.props.activeTest(bankcard.card) && bankcard.quantity > 0){
                    return <li className="card-active"><a href="#" data-cardname={bankcard.card.name} onClick={this.handleCardClick}><img width="160px" src={this.getCardImageByName(bankcard.card.name)} /></a><span className="bank-quantity">{bankcard.quantity} left</span></li>
                }
                else {
                    return <li className="card-inactive"><img width="160px" src={this.getCardImageByName(bankcard.card.name)} /><span className="bank-quantity">{bankcard.quantity} left</span></li>
                }
            }
                
            );    
        }

        return this.props.cards.map((bankcard) => 
            <li><a href="#" data-cardname={bankcard.card.name} onClick={this.handleCardClick}><img width="160px" src={this.getCardImageByName(bankcard.card.name)} /></a></li>
        );
    }
}

export default Bank;