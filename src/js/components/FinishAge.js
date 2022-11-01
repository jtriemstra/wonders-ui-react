import React, { Component } from "react";
import ReactDOM from "react-dom";
import Utility from "../Utility";

class FinishAge extends Component {
    constructor() {
      super();      
      this.startAge = this.startAge.bind(this);
      this.handleEnd = this.handleEnd.bind(this);
    }

    renderVictories() {
        let result = [];
        let points = this.props.age == 1 ? 1 : (this.props.age == 2 ? 3 : 5);
        for (var i=0; i<this.props.victories; i++){
            result.push(<img src={"../../images/icons/victory" + points + ".png"} />);
        }
        return <div >{result}</div>;
    }

    renderDefeats() {
        let result = [];
        for (var i=0; i<this.props.defeats; i++){
            result.push(<img src="../../images/icons/victoryminus1.png" />);
        }
        return <div >{result}</div>;
    }

    startAge(){
        // var myRequest = new Request(Utility.apiServer() + "/startAge?playerId=" + this.props.playerName + "&gameName=" + this.props.gameName);

        // fetch(myRequest, Utility.getRequestInit())
        // .then(res => res.json())
        // .then((result) => {
        //     console.log(result);
        //     this.props.startAge(result);
        // });
        this.props.startAge();
  }

  handleEnd(e) {
        if (e) e.preventDefault();

        fetch(Utility.apiServer() + "/endGame?gameName=" +this.props.gameName)
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

    render() {
            let victories = this.props.victories ? this.props.victories : 0;
            let defeats = this.props.defeats ? this.props.defeats : 0;
            let gameComplete = this.props.allVictoryPoints != undefined;
            let nextAgeButton = gameComplete ? null : <button onClick={this.startAge}>Start Next Age</button>;
            let endGameButton = gameComplete ? <button onClick={this.handleEnd}>End Game</button> : null;
            let popupClass = "popup-content";

            var result = [];
            if (gameComplete) {
                let total = 0;
                for (const [key, value] of Object.entries(this.props.allVictoryPoints)) {
                    if (value < 0) {
                        result.push(<div>{key}: (minus) {value * -1}</div>);
                    }
                    else {
                        result.push(<div>{key}: {value}</div>);
                    }
                    
                    total = total + value
                }
                result.push(<div>Total: {total}</div>);
                popupClass = popupClass + " large";
            }
            else {
				popupClass = popupClass + " small";
			}

            return (
                <div className="popup-background">
                    <div className={popupClass}>
                        <div className="parchment"></div>
                        <div className="splash-screen-wrapper">
                            <h3>Age Complete!</h3>
                            {this.renderVictories()}
                            {this.renderDefeats()}
                            {result}
                            {nextAgeButton}
                            {endGameButton}
                        </div>
                    </div>
                    <svg>
                        <filter id="wavy2">
                            <feTurbulence x="0" y="0" baseFrequency="0.02" numOctaves="5" seed="1"></feTurbulence>
                            <feDisplacementMap in="SourceGraphic" scale="20" />
                        </filter>
                    </svg>
                </div>
            );
        
        
        
    }
}

export default FinishAge;