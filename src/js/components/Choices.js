import React, { Component } from "react";
import ReactDOM from "react-dom";
import Utility from "../Utility";
import CardImage from "../CardImage";

class Choices extends Component {
    constructor() {
      super();      
      this.handleOption = this.handleOption.bind(this);
    }

    handleOption(optionName, event){
        event.preventDefault();

        let actionName = this.props.action;
        
        //TODO: is passing "global" information down to components like this a good approach"?
        var myRequest = new Request(Utility.apiServer() + "/" + actionName + "?playerId=" + this.props.playerName + "&gameName=" + this.props.gameName + "&optionName=" + optionName);

        fetch(myRequest, Utility.getRequestInit())
        .then(res => res.json())
        .then((result) => {
            console.log(result);
            this.props.updateState(result);
        });
    }

    render() {
        if (this.props.options){
            let heading = this.props.action === "chooseScience" ? "Choose a scientific symbol" : (this.props.action === "chooseGuild" ? "Choose a guild card to copy" :"");
            return (
                <div className="popup-background">
                    <div className="popup-content">
                        <div className="parchment"></div>
                        <div className="splash-screen-wrapper">
                            <h2>{heading}</h2>
                            <div className="options-container">
                            {
                                this.props.options.map((option) => {
                                    let optionName = option.name ? option.name : option;
                                    let clickable = optionName;
                                    let helpText = option.help ? option.help : "";
                                    if (this.props.action === "chooseGuild") {
                                        clickable = <img src={"images/cards/" + CardImage.getImage(optionName)} />;
                                    }
                                    else if (this.props.action === "chooseScience"){
                                        clickable = <img src={"images/icons/" + optionName + ".png"} />;
                                    }
                                    return <div className="option">
                                    	<a onClick={(event) => this.handleOption(optionName, event)}>{clickable}</a><p>{helpText}</p>
                                	</div>;
                                })
                            }                
                            </div>            
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
        
        return null;
    }
}

export default Choices;