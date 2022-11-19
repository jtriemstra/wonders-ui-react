import React, { Component } from "react";
import ReactDOM from "react-dom";
import Utility from "../Utility";

class FinishAge extends Component {
    constructor() {
      super();      
      this.startAge = this.startAge.bind(this);
      this.handleEnd = this.handleEnd.bind(this);
      this.renderIcons = this.renderIcons.bind(this);
    }
    
    renderIcons() {
		let left = [], right = [];
		let points = this.props.age == 1 ? 1 : (this.props.age == 2 ? 3 : 5);
		
		if (this.props.victories) {
			for (var i=0; i<this.props.victories.length; i++){
					
				if (this.props.victories[i].left) {
					left.push(<div className="end-age-left"><div>{this.props.victories[i].neighborName}</div> <img src={"../../images/icons/victory" + points + ".png"} /></div>);
				} else {
					right.push(<div className="end-age-right"><div>{this.props.victories[i].neighborName}</div> <img src={"../../images/icons/victory" + points + ".png"} /></div>);
				}
			}
		}
		
		if (this.props.defeats) {
			for (var i=0; i<this.props.defeats.length; i++){
				if (this.props.defeats[i].left) {
					left.push(<div className="end-age-left"><div>{this.props.defeats[i].neighborName}</div> <img src="../../images/icons/victoryminus1.png" /></div>);
				} else {
					right.push(<div className="end-age-right"><div>{this.props.defeats[i].neighborName}</div> <img src="../../images/icons/victoryminus1.png" /></div>);
				}
			}
		}
		
		return <div>{left} {right}</div>;
	}

   /* renderVictories() {
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
    }*/

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
            let gameComplete = this.props.allVictoryPoints != undefined;
            let nextAgeButton = gameComplete ? null : <button onClick={this.startAge}>Start Next Age</button>;
            let endGameButton = gameComplete ? <button onClick={this.handleEnd}>End Game</button> : null;
            let popupClass = "popup-content";
            let tieContent = <h6>you tied both neighbors</h6>;

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
			
			if ((this.props.victories && this.props.victories.length > 0) || (this.props.defeats && this.props.defeats.length > 0)) {
				tieContent = "";
			}

            return (
                <div className="popup-background">
                    <div className={popupClass}>
                        <div className="parchment"></div>
                        <div className="splash-screen-wrapper">
                            <h3>Age Complete!</h3>
                            <h5 className="end-age">Result of military conflicts:</h5>
                            {tieContent}
                            {this.renderIcons()}
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