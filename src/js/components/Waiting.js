import React, { Component } from "react";
import ReactDOM from "react-dom";

class Waiting extends Component {
    constructor() {
      super();      
      
    }

    render() {
        let message = "";
        //if (this.props.waitFor === "START") message = " for game to start";
        //if (this.props.waitFor === "PLAYERS") message = " for all players to join";

        if (this.props.isWaiting){
            return (
                <>
                <div className="popup-background">
                    <div className="popup-content small">
                        <div className="parchment"></div>
                        <div className="splash-screen-wrapper">
                        	<p>Waiting {message}</p>   
                        </div>
                    </div>
                    
                </div>
                <svg>
                    <filter id="wavy2">
                        <feTurbulence x="0" y="0" baseFrequency="0.02" numOctaves="5" seed="1"></feTurbulence>
                        <feDisplacementMap in="SourceGraphic" scale="20" />
                    </filter>
                </svg>
              </>
            );
        }
        
        return null;
    }
}

export default Waiting;