import React, { Component } from "react";
import ReactDOM from "react-dom";
import Utility from "../Utility";
import CardImage from "../CardImage";

class LeaderPopup extends Component {
    constructor() {
      super();     
      this.handleClose = this.handleClose.bind(this); 
    }

    handleClose(event){
        event.preventDefault();
        this.props.close();        
    }

    render() {
        
        let heading = "New leaders being added to your leader hand";
        return (
            <div className="popup-background">
                <div className="popup-content">
                    <div className="parchment"></div>
                    <div className="splash-screen-wrapper">
                        <h2>{heading}</h2>
                        <div class="card-set">
                            <ul class="card-set-active">
                            {
                                this.props.newLeaders.map((option) => {
                                    let cardName = option.name;
                                    let cardImage = <li class="card"><img src={"images/cards/" + CardImage.getImage(cardName)} /></li>;
                                    return cardImage;
                                })
                            }
                            </ul>
                        </div>
                        <button onClick={this.handleClose}>Close</button>
                    </div>
                    <svg>
                        <filter id="wavy2">
                            <feTurbulence x="0" y="0" baseFrequency="0.02" numOctaves="5" seed="1"></feTurbulence>
                            <feDisplacementMap in="SourceGraphic" scale="20" />
                        </filter>
                    </svg>
                </div>
            </div>
        );
    
    }
}

export default LeaderPopup;